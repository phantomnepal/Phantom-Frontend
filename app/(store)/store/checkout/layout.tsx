// Passthrough layout so this client-component route can carry noindex metadata.
export const metadata = { title: 'Checkout', robots: { index: false } };

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
