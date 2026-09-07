'use client';
import Link from 'next/link';
import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Events', path: '/admin/dashboard/events' },
    { name: 'Team', path: '/admin/dashboard/team' },
    { name: 'Announcements', path: '/admin/dashboard/announcements' },
    { name: 'Achievements', path: '/admin/dashboard/achievements' },
    { name: 'Gallery', path: '/admin/dashboard/gallery' },
    { name: 'About IEDC', path: '/admin/dashboard/about' },
    { name: 'Messages', path: '/admin/dashboard/messages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center z-20 shadow-md">
        <div className="font-serif text-xl tracking-wider">Admin Portal</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar (Hidden on mobile unless toggled open) */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-gray-900 text-white flex-shrink-0 relative md:fixed h-auto md:h-full z-10`}>
        <div className="p-6 hidden md:block">
          <h2 className="text-2xl font-serif mb-1">IEDC Admin</h2>
          <p className="text-xs text-gray-400 tracking-widest uppercase">GPC Pala</p>
        </div>
        
        <nav className="mt-2 md:mt-6 px-4 space-y-2 pb-6 md:pb-0">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full text-left mt-8 px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            Log Out
          </button>
        </nav>
      </div>

      {/* Main Content Area (Pushed right on desktop) */}
      <div className="flex-1 p-4 md:p-10 md:ml-64 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}