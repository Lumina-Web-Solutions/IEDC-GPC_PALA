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
    <div 
      className="min-h-screen bg-[#E5E7EB] flex flex-col md:flex-row" 
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
    >
      {/* Mobile Header (NIC Style) */}
      <div className="md:hidden bg-[#003366] text-white p-3 flex justify-between items-center z-50 sticky top-0 border-b-4 border-[#FF9933] shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-8 w-auto brightness-0 invert" />
          <div className="font-bold text-sm">PORTAL ADMIN</div>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-1 border border-[#004b93] bg-[#002244] focus:outline-none focus:ring-1 focus:ring-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[#003366] z-40 overflow-y-auto border-t border-[#002244]">
          <nav className="divide-y divide-[#002244]">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-5 py-3 text-sm transition-none ${
                  pathname === item.path || (item.path === '/admin/dashboard' && pathname === '/admin/dashboard')
                    ? 'bg-[#004b93] text-white border-l-4 border-[#FF9933] font-bold' 
                    : 'text-[#E0E0E0] hover:bg-[#002244] hover:text-white border-l-4 border-transparent font-normal'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="p-4 bg-[#002244] mt-2 border-t border-[#001a33]">
              <button 
                onClick={handleLogout}
                className="w-full text-center px-4 py-2 text-sm font-bold bg-[#CC0000] text-white hover:bg-[#990000] border border-[#660000] transition-none"
              >
                Logout Session
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar (Institutional Theme) */}
      <div className="hidden md:flex w-64 bg-[#003366] text-white flex-shrink-0 fixed h-screen z-10 flex-col border-r border-[#002244]">
        
        {/* Official Sidebar Header */}
        <div className="p-5 border-b-4 border-[#FF9933] bg-[#002244] flex flex-col items-center text-center">
          <img src="/LogoN.png" alt="IEDC Logo" className="h-12 w-auto mb-3 brightness-0 invert" />
          <h2 className="text-lg font-bold text-white m-0">IEDC GPC PALA</h2>
          <p className="text-[11px] text-[#FF9933] font-bold mt-1">ADMINISTRATIVE PORTAL</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3 custom-scrollbar">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className={`block px-5 py-2.5 text-sm transition-none ${
                      isActive 
                        ? 'bg-[#004b93] text-white border-l-4 border-[#FF9933] font-bold' 
                        : 'text-[#D0D0D0] hover:bg-[#002244] hover:text-white border-l-4 border-transparent font-normal'
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
        <div className="p-4 border-t border-[#002244] bg-[#001a33]">
          <div className="mb-3">
            <span className="block text-[10px] text-[#A0A0A0] font-bold uppercase">Logged In As</span>
            <span className="block text-sm text-white font-bold">System Administrator</span>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#CC0000] hover:bg-[#990000] border border-[#800000] transition-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout Session
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 md:ml-64 w-full min-h-screen text-[#333333]">
        {/* Official Document Wrapper Container */}
        <div className="w-full max-w-7xl mx-auto bg-white border border-[#CCCCCC] p-5 md:p-8 shadow-sm min-h-[85vh]">
          {children}
        </div>
      </div>
      
    </div>
  );
}
