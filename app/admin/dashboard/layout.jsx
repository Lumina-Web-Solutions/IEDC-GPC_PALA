'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Home', path: '/admin/dashboard' },
    { name: 'Events', path: '/admin/dashboard/events' },
    { name: 'Team', path: '/admin/dashboard/team' },
    { name: 'Announcements', path: '/admin/dashboard/announcements' },
    { name: 'Achievements', path: '/admin/dashboard/achievements' },
    { name: 'Gallery', path: '/admin/dashboard/gallery' },
    { name: 'About IEDC', path: '/admin/dashboard/about' },
    { name: 'Messages', path: '/admin/dashboard/messages' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center z-50 sticky top-0 shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-8 w-auto brightness-0 invert" />
          <div className="font-serif text-lg tracking-wider">Admin</div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 focus:outline-none bg-gray-800 rounded-lg"
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

      {/* Mobile Menu Dropdown (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-[72px] bg-gray-900 z-40 overflow-y-auto pb-8"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-5 py-4 rounded-xl text-sm font-bold tracking-wide transition-colors ${
                    pathname === item.path || (item.path === '/admin/dashboard' && pathname === '/admin/dashboard')
                      ? 'bg-white text-gray-900' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 mt-6 border-t border-gray-800 px-4">
                <button 
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-4 rounded-xl text-sm font-bold tracking-widest uppercase bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Secure Log Out
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-72 bg-gray-900 text-white flex-shrink-0 fixed h-screen z-10 flex-col shadow-2xl">
        {/* Sidebar Header */}
        <div className="p-8 pb-6">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-10 w-auto mb-6 brightness-0 invert" />
          <h2 className="text-2xl font-serif mb-1">IEDC Admin</h2>
          <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold">GPC Pala Portal</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto pb-6 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`block px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-gray-800 text-white shadow-inner translate-x-1' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white hover:translate-x-1'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-6 border-t border-gray-800 bg-gray-900">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-5 py-3.5 rounded-xl text-sm font-bold tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-12 md:ml-72 w-full min-h-screen">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
