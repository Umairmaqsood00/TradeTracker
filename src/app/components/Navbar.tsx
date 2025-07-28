"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="nav-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            href="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover-lift"
          >
            TradeVault
          </Link>
          
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className={`nav-link ${pathname === '/' ? 'text-white after:w-full' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/add-trade" 
              className={`nav-link ${pathname === '/add-trade' ? 'text-white after:w-full' : ''}`}
            >
              Add Trade
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}