'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // npm install lucide-react

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateHash = () => setHash(window.location.hash);
      updateHash();
      window.addEventListener('hashchange', updateHash);
      return () => window.removeEventListener('hashchange', updateHash);
    }
  }, []);

  const isAtTransactionAnchor = pathname === '/' && hash === '#add-transaction';
  const isAtReportsAnchor = pathname === '/' && hash === '#reports';

  const navLinks = [
    { href: '/', label: 'Overview', active: pathname === '/' && !isAtTransactionAnchor && !isAtReportsAnchor },
    { href: '/budget', label: 'Budget', active: pathname === '/budget' },
    { href: '/transactions', label: 'Transactions', active: pathname === '/transactions' },
    { href: '/reports', label: 'Report', active: pathname === '/reports' },
    { href: '/settings', label: 'Settings', active: pathname === '/settings' },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Nav */}
      <nav
        className={`fixed top-0 left-0 h-full w-56 bg-black shadow-md flex flex-col py-8 px-4 text-white z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-10 text-center">My PFV App</h1>
        <ul className="flex flex-col space-y-4">
          {navLinks.map(({ href, label, active }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                  active ? 'bg-white text-black' : 'hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)} // Close on mobile
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
