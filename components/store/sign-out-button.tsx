'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        router.push('/');
        router.refresh();
      }}
      className="text-sm text-gray-500 underline hover:text-gray-800"
    >
      Sign out
    </button>
  );
}
