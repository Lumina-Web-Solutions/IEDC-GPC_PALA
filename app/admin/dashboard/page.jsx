'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DashboardHome() {
  const [currentTime, setCurrentTime] = useState('');
  const [mounted, setMounted] = useState(false);

  // Handle live clock
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { id: 'Events', path: '/admin/dashboard/events', desc: 'Manage institutional events, schedules, and program details.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'Team & Execom', path: '/admin/dashboard/team', desc: 'Update faculty nodal officers and executive committee profiles.', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'Announcements', path: '/admin/dashboard/announcements', desc: 'Publish official circulars, notices, and public updates.', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { id: 'Achievements', path: '/admin/dashboard/achievements', desc: 'Log verified student milestones and institutional awards.', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { id: 'Media Gallery', path: '/admin/dashboard/gallery', desc: 'Maintain the repository of official event photographs.', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'Institutional Info', path: '/admin/dashboard/about', desc: 'Configure mission, vision, and core portal settings.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'Public Queries', path: '/admin/dashboard/messages', desc: 'Process and respond to inbound communications.', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <div className="w-full text-slate-800 font-sans pb-8">
      
      {/* Official Top Banner (e-Governance Style) */}
      <div className="bg-[#003366] rounded-t-lg shadow-sm border-b-4 border-orange-500 overflow-hidden mb-6">
        <div className="px-6 py-8 relative">
          {/* Subtle background pattern common in gov sites */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide mb-1">Unified Administrative Portal</h1>
              <p className="text-blue-200 text-sm font-medium">Innovation and Entrepreneurship Development Centre • GPC Pala</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {mounted ? currentTime : 'Syncing Time...'}
            </div>
          </div>
        </div>
        
        {/* System Health Ribbon */}
        <div className="bg-slate-900/40 px-6 py-2.5 flex flex-wrap items-center gap-6 text-xs text-blue-100 font-medium">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Portal: Active
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
            Database: Connected
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Authentication: Secured
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 border-l-4 border-[#003366] pl-3">Administrative Services</h2>
      </div>

      {/* Modern Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col h-full">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 group-hover:bg-[#003366] transition-colors"></div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start gap-4 mb-3">
                <div className="bg-blue-50 text-[#003366] p-2.5 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight mb-1">{service.id}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Service Module</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4 flex-1">{service.desc}</p>
            </div>
            
            <div className="bg-slate-50 border-t border-slate-100 p-3 px-5">
              <Link 
                href={service.path}
                className="flex items-center justify-between w-full text-sm font-bold text-[#003366] hover:text-blue-700 group-hover:translate-x-1 transition-transform"
              >
                Proceed to Module
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Official Footer */}
      <div className="bg-white border border-slate-200 rounded p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-slate-100 rounded flex items-center justify-center border border-slate-200">
             <img src="/LogoN.png" alt="Emblem" className="h-6 w-auto opacity-80" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Content Management System v1.0</p>
            <p className="text-xs text-slate-500">Government Polytechnic College, Pala</p>
          </div>
        </div>
        <div className="text-xs text-slate-500 text-center md:text-right font-medium">
          <p>Designed, Developed and Hosted by</p>
          <p className="font-bold text-slate-700 mt-0.5">Lumina Web Solutions</p>
        </div>
      </div>

    </div>
  );
}
