'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('Loading user...');
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

  // Fetch the logged-in user's email from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('Not logged in');
      }
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard' },
    { name: 'Events Management', path: '/admin/dashboard/events' },
    { name: 'Team & Execom', path: '/admin/dashboard/team' },
    { name: 'Official Announcements', path: '/admin/dashboard/announcements' },
    { name: 'Achievements', path: '/admin/dashboard/achievements' },
    { name: 'Media Gallery', path: '/admin/dashboard/gallery' },
    { name: 'Institutional Info', path: '/admin/dashboard/about' },
    { name: 'Public Communications', path: '/admin/dashboard/messages' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header (Modern e-Gov Style) */}
      <div className="md:hidden bg-[#003366] text-white p-3 flex justify-between items-center z-50 sticky top-0 border-b-[3px] border-orange-500 shadow-md">
        <div className="flex items-center gap-3">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-8 w-auto brightness-0 invert" />
          <div className="font-bold text-sm tracking-wide">PORTAL ADMIN</div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-1.5 bg-white/10 rounded border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#002244] z-40 overflow-y-auto">
          <nav className="divide-y divide-white/10">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-5 py-4 text-sm font-medium transition-colors ${
                  pathname === item.path || (item.path === '/admin/dashboard' && pathname === '/admin/dashboard')
                    ? 'bg-white/10 text-white border-l-4 border-orange-500 font-bold' 
                    : 'text-blue-100 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="p-5 mt-4 bg-black/20 border-t border-white/10">
              <div className="mb-4">
                <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-0.5">Logged In As</span>
                <span className="block text-sm text-white font-bold truncate">{userEmail}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold bg-red-600 text-white rounded hover:bg-red-700 transition-colors border border-red-700"
              >
                Secure Logout
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar (Modern e-Gov Style) */}
      <div className="hidden md:flex w-72 bg-[#003366] text-white flex-shrink-0 fixed h-screen z-10 flex-col shadow-xl">
        
        {/* Official Sidebar Header */}
        <div className="p-6 border-b-[3px] border-orange-500 bg-black/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <img src="/LogoN.png" alt="IEDC Logo" className="h-14 w-auto mb-4 brightness-0 invert drop-shadow-sm" />
            <h2 className="text-lg font-bold text-white tracking-wide m-0">IEDC GPC PALA</h2>
            <p className="text-[10px] text-orange-400 font-bold mt-1 tracking-[0.2em] uppercase">Administrative Portal</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className={`block px-6 py-3 text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white/10 text-white border-l-4 border-orange-500 shadow-inner' 
                        : 'text-blue-100 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer / User Profile & Logout */}
        <div className="p-5 border-t border-white/10 bg-black/20">
          <div className="mb-4">
            <span className="block text-[10px] text-blue-300 font-bold uppercase tracking-wider mb-1">Active Session</span>
            {/* User Email displayed here */}
            <span className="block text-sm text-white font-bold truncate" title={userEmail}>
              {userEmail}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded hover:bg-red-700 border border-red-700 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 md:ml-72 w-full min-h-screen">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </div>
      
    </div>
  );
}
