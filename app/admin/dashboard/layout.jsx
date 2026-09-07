'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Protect the route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-sm font-bold tracking-widest uppercase text-gray-500 animate-pulse">
          Authenticating...
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Overview', path: '/admin/dashboard' },
    { name: 'About Content', path: '/admin/dashboard/about' },
    { name: 'Events', path: '/admin/dashboard/events' },
    { name: 'Announcements', path: '/admin/dashboard/announcements' },
    { name: 'Achievements', path: '/admin/dashboard/achievements' },
    { name: 'Gallery', path: '/admin/dashboard/gallery' },
    { name: 'Team & Faculty', path: '/admin/dashboard/team' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-xl font-serif text-gray-900">Admin Portal</h2>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mt-1">IEDC GPC Pala</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span className={`block px-4 py-3 rounded-xl text-sm transition-colors ${
                pathname === item.path 
                  ? 'bg-gray-900 text-white font-semibold' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 md:p-12">
          {children}
        </div>
      </main>
    </div>
  );
}