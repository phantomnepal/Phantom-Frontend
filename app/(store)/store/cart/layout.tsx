// Passthrough layout so this client-component route can carry noindex metadata.
export const metadata = { title: 'Cart', robots: { index: false } };

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
