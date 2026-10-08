'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

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
    { name: 'System Dashboard', path: '/admin/dashboard' },
    { name: 'Events Management', path: '/admin/dashboard/events' },
    { name: 'Team & Execom', path: '/admin/dashboard/team' },
    { name: 'Official Announcements', path: '/admin/dashboard/announcements' },
    { name: 'Achievements', path: '/admin/dashboard/achievements' },
    { name: 'Media Gallery', path: '/admin/dashboard/gallery' },
    { name: 'Institutional Info', path: '/admin/dashboard/about' },
    { name: 'Public Communications', path: '/admin/dashboard/messages' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header (Strict/Flat) */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-50 sticky top-0 border-b-4 border-blue-600 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-8 w-auto brightness-0 invert" />
          <div className="font-bold text-sm tracking-wider uppercase">Portal Admin</div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-1 focus:outline-none focus:ring-2 focus:ring-white border border-slate-700 bg-slate-800"
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

      {/* Mobile Menu Dropdown (Standard Toggle, No Animation) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[68px] bg-slate-900 z-40 overflow-y-auto border-t border-slate-800">
          <nav className="divide-y divide-slate-800">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-6 py-4 text-sm font-semibold tracking-wide uppercase transition-none ${
                  pathname === item.path || (item.path === '/admin/dashboard' && pathname === '/admin/dashboard')
                    ? 'bg-blue-600 text-white border-l-4 border-blue-400' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border-l-4 border-transparent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="p-4 bg-slate-900 mt-4 border-t-2 border-slate-700">
              <button 
                onClick={handleLogout}
                className="w-full text-center px-4 py-3 text-sm font-bold tracking-widest uppercase bg-red-700 text-white hover:bg-red-800 focus:ring-2 focus:ring-red-500 transition-none"
              >
                Terminate Session
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar (Institutional Theme) */}
      <div className="hidden md:flex w-72 bg-slate-900 text-slate-100 flex-shrink-0 fixed h-screen z-10 flex-col border-r border-slate-700 shadow-xl">
        
        {/* Official Sidebar Header */}
        <div className="p-6 border-b-4 border-blue-600 bg-slate-950">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-10 w-auto mb-4 brightness-0 invert" />
          <h2 className="text-xl font-bold uppercase tracking-wide text-white">IEDC CMS Portal</h2>
          <p className="text-xs text-slate-400 font-semibold tracking-widest uppercase mt-1">GPC Pala • Admin</p>
        </div>
        
        {/* Navigation Links (Table-like List) */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className={`block px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-none ${
                      isActive 
                        ? 'bg-slate-800 text-white border-l-4 border-blue-500 shadow-inner' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-l-4 border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer / System Actions */}
        <div className="p-4 border-t border-slate-700 bg-slate-950">
          <div className="mb-4 px-2">
            <span className="block text-[10px] uppercase text-slate-500 font-bold tracking-widest mb-1">Current User</span>
            <span className="block text-sm text-slate-300 font-medium">System Administrator</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold tracking-wider uppercase bg-red-700 hover:bg-red-800 text-white border border-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Terminate Session
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-10 md:ml-72 w-full min-h-screen">
        <div className="w-full max-w-7xl mx-auto">
          {children}
        </div>
      </div>
      
    </div>
  );
}
