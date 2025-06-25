'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const isLoginPage = pathname === '/login';

    if (isLoggedIn === 'true' || isLoginPage) {
      setAllowed(true); // Show content
    } else {
      router.replace('/login'); // Redirect
    }
  }, [pathname, router]);

  if (!allowed) {
    return <div className="text-center mt-20">Checking login status...</div>;
  }

  return <>{children}</>;
}
