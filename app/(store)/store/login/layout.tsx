// Passthrough layout so this client-component route can carry noindex metadata.
export const metadata = { title: 'Sign in', robots: { index: false } };

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
