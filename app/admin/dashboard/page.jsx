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
      const timeString = now.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(timeString.toUpperCase());
    };
    
    updateTime(); // Initial call
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'MOD-01', name: 'EVENTS MANAGEMENT', path: '/admin/dashboard/events', desc: 'Create, update, or remove institutional events and programs.' },
    { id: 'MOD-02', name: 'TEAM & EXECOM', path: '/admin/dashboard/team', desc: 'Manage executive committee members and faculty profiles.' },
    { id: 'MOD-03', name: 'OFFICIAL ANNOUNCEMENTS', path: '/admin/dashboard/announcements', desc: 'Broadcast public notices and circulars to the portal.' },
    { id: 'MOD-04', name: 'ACHIEVEMENTS', path: '/admin/dashboard/achievements', desc: 'Record and display student and institutional milestones.' },
    { id: 'MOD-05', name: 'MEDIA GALLERY', path: '/admin/dashboard/gallery', desc: 'Upload and categorize official photographs and media assets.' },
    { id: 'MOD-06', name: 'INSTITUTIONAL INFO', path: '/admin/dashboard/about', desc: 'Update mission, vision, and core administrative details.' },
    { id: 'MOD-07', name: 'PUBLIC COMMUNICATIONS', path: '/admin/dashboard/messages', desc: 'Review and manage inbound queries from the public portal.' },
  ];

  return (
    <div className="w-full text-[#333333]">
      
      {/* Official Status Bar / Time */}
      <div className="w-full mb-4 bg-[#F8F9FA] border border-[#CCCCCC] p-2 px-4 flex flex-col md:flex-row justify-between items-center text-[11px] font-bold text-[#555555]">
        <span>GOVERNMENT POLYTECHNIC COLLEGE, PALA</span>
        <span>{mounted ? currentTime : 'LOADING SYSTEM TIME...'}</span>
      </div>

      {/* Official Page Header */}
      <div className="border-b-2 border-[#003366] pb-2 mb-4">
        <h1 className="text-xl font-bold text-[#003366] uppercase m-0">System Dashboard & Module Access</h1>
      </div>

      {/* Official Security Notice */}
      <div className="bg-[#FFF4E5] border border-[#FF9933] p-3 mb-6 flex items-start gap-3">
        <div className="bg-[#FF9933] text-white px-2 py-0.5 text-xs font-bold mt-0.5">NOTICE</div>
        <p className="text-xs text-[#555555] leading-relaxed m-0 font-bold">
          UNAUTHORIZED ACCESS TO THIS PORTAL IS STRICTLY PROHIBITED. ALL ACTIVITIES ARE LOGGED AND MONITORED. ENSURE TO LOGOUT AFTER COMPLETING ADMINISTRATIVE TASKS.
        </p>
      </div>

      {/* System Overview Panel */}
      <div className="border border-[#CCCCCC] mb-8 shadow-sm">
        <div className="bg-[#003366] text-white px-3 py-2 text-sm font-bold uppercase tracking-wider flex justify-between items-center">
          <span>System Overview</span>
          <span className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 bg-[#00FF00] rounded-full"></span>
            SERVER ONLINE
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#CCCCCC] bg-[#F8F9FA] text-xs">
          <div className="p-3">
            <span className="block text-[#777777] font-bold uppercase mb-1">Environment</span>
            <span className="block font-bold text-[#003366]">PRODUCTION (v1.0.0)</span>
          </div>
          <div className="p-3">
            <span className="block text-[#777777] font-bold uppercase mb-1">Database Status</span>
            <span className="block font-bold text-[#008000]">CONNECTED & ACTIVE</span>
          </div>
          <div className="p-3">
            <span className="block text-[#777777] font-bold uppercase mb-1">Security Protocol</span>
            <span className="block font-bold text-[#003366]">FIREBASE AUTH</span>
          </div>
          <div className="p-3">
            <span className="block text-[#777777] font-bold uppercase mb-1">Last System Audit</span>
            <span className="block font-bold text-[#003366]">CLEARED</span>
          </div>
        </div>
      </div>

      {/* Data Table for Modules */}
      <div className="border border-[#CCCCCC] shadow-sm mb-8 overflow-x-auto">
        <div className="bg-[#E5E7EB] border-b border-[#CCCCCC] px-3 py-2 text-sm font-bold text-[#003366] uppercase">
          Available Administrative Modules
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F8F9FA] border-b-2 border-[#CCCCCC]">
            <tr>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC] w-16 text-center">S.NO.</th>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC] w-24 text-center">ID</th>
              <th className="p-3 text-xs font-bold text-[#555555] border-r border-[#CCCCCC]">MODULE NAME & DESCRIPTION</th>
              <th className="p-3 text-xs font-bold text-[#555555] w-32 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#CCCCCC]">
            {modules.map((module, index) => (
              <tr key={module.id} className="hover:bg-[#F0F5FA] transition-none bg-white">
                <td className="p-3 text-xs font-bold text-[#777777] border-r border-[#CCCCCC] text-center">
                  {String(index + 1).padStart(2, '0')}
                </td>
                <td className="p-3 text-xs font-bold text-[#003366] border-r border-[#CCCCCC] text-center">
                  {module.id}
                </td>
                <td className="p-3 border-r border-[#CCCCCC]">
                  <div className="font-bold text-sm text-[#003366] mb-1">{module.name}</div>
                  <div className="text-xs text-[#555555]">{module.desc}</div>
                </td>
                <td className="p-3 text-center align-middle">
                  <Link 
                    href={module.path}
                    className="inline-block bg-[#003366] text-white text-xs font-bold px-3 py-1.5 border border-[#002244] hover:bg-[#FF9933] hover:border-[#CC7A00] transition-none whitespace-nowrap"
                  >
                    ACCESS
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Meta */}
      <div className="text-center text-[11px] text-[#777777] border-t border-[#CCCCCC] pt-4 mt-8 font-bold">
        <p className="mb-1">PROPRIETARY SOFTWARE LICENSED TO GOVERNMENT POLYTECHNIC COLLEGE, PALA.</p>
        <p>DESIGNED AND DEVELOPED BY <span className="text-[#003366]">LUMINA WEB SOLUTIONS</span>.</p>
      </div>

    </div>
  );
}
