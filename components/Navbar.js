'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateHash = () => setHash(window.location.hash);
      updateHash(); // initial

      window.addEventListener('hashchange', updateHash);
      return () => window.removeEventListener('hashchange', updateHash);
    }
  }, []);

  const isAtTransactionAnchor = pathname === '/' && hash === '#add-transaction';
  const isAtReportsAnchor = pathname === '/' && hash === '#reports';

  return (
    <nav className="fixed top-0 left-0 h-full w-56 bg-black shadow-md flex flex-col py-8 px-4 text-white">
      <h1 className="text-2xl font-bold mb-10 text-center">My PFV App</h1>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link
            href="/"
            className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              pathname === '/' && !isAtTransactionAnchor && !isAtReportsAnchor
                ? 'bg-white text-black'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            Overview
          </Link>
        </li>

        <li>
          <Link
            href="/budget"
            className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              pathname === '/budget'
                ? 'bg-white text-black'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            Budget
          </Link>
        </li>

        <li>
          <Link
            href="/transactions"
            className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              pathname === '/transactions'
                ? 'bg-white text-black'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            Transactions
          </Link>
        </li>

        <li>
          <Link
  href="/reports"
  className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
    pathname === '/reports'
      ? 'bg-white text-black'
      : 'hover:bg-gray-700 hover:text-white'
  }`}
>
  Report
</Link>
        </li>

        <li>
          <Link
            href="/settings"
            className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
              pathname === '/settings'
                ? 'bg-white text-black'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  );
}
