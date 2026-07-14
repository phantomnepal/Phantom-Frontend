'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';
import { MAX_QTY_PER_LINE } from '@/lib/cart-limits';

export interface CartLine {
  productId: number;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
}

type CartAction =
  | { type: 'hydrate'; lines: CartLine[] }
  | { type: 'add'; productId: number; qty?: number }
  | { type: 'setQty'; productId: number; qty: number }
  | { type: 'remove'; productId: number }
  | { type: 'clear' };

const STORAGE_KEY = 'phantom_cart_v1';

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return { lines: action.lines, hydrated: true };
    case 'add': {
      const qty = action.qty ?? 1;
      const existing = state.lines.find((l) => l.productId === action.productId);
      const lines = existing
        ? state.lines.map((l) =>
            l.productId === action.productId
              ? { ...l, qty: Math.min(MAX_QTY_PER_LINE, l.qty + qty) }
              : l,
          )
        : [
            ...state.lines,
            { productId: action.productId, qty: Math.min(MAX_QTY_PER_LINE, qty) },
          ];
      return { ...state, lines };
    }
    case 'setQty': {
      if (action.qty <= 0) {
        return {
          ...state,
          lines: state.lines.filter((l) => l.productId !== action.productId),
        };
      }
      const qty = Math.min(MAX_QTY_PER_LINE, action.qty);
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.productId === action.productId ? { ...l, qty } : l,
        ),
      };
    }
    case 'remove':
      return {
        ...state,
        lines: state.lines.filter((l) => l.productId !== action.productId),
      };
    case 'clear':
      return { ...state, lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  hydrated: boolean;
  add: (productId: number, qty?: number) => void;
  setQty: (productId: number, qty: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], hydrated: false });

  // Hydrate from localStorage once on mount. Validate shape so a corrupt or
  // outdated payload can't inject malformed lines into the cart.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const lines: CartLine[] = Array.isArray(parsed)
        ? parsed
            .filter(
              (l): l is CartLine =>
                typeof l === 'object' &&
                l !== null &&
                Number.isInteger((l as CartLine).productId) &&
                Number.isInteger((l as CartLine).qty) &&
                (l as CartLine).qty > 0,
            )
            .map((l) => ({
              productId: l.productId,
              qty: Math.min(MAX_QTY_PER_LINE, l.qty),
            }))
        : [];
      dispatch({ type: 'hydrate', lines });
    } catch {
      dispatch({ type: 'hydrate', lines: [] });
    }
  }, []);

  // Persist after hydration.
  useEffect(() => {
    if (!state.hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  }, [state.lines, state.hydrated]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      count: state.lines.reduce((n, l) => n + l.qty, 0),
      hydrated: state.hydrated,
      add: (productId, qty) => dispatch({ type: 'add', productId, qty }),
      setQty: (productId, qty) => dispatch({ type: 'setQty', productId, qty }),
      remove: (productId) => dispatch({ type: 'remove', productId }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state.lines, state.hydrated],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
