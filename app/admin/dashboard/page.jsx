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
        second: '2-digit',
        hour12: true
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const modules = [
    { id: 'Events', path: '/admin/dashboard/events', desc: 'Manage institutional events, workshops, and programs.' },
    { id: 'Team', path: '/admin/dashboard/team', desc: 'Update the executive committee and faculty profiles.' },
    { id: 'Notices', path: '/admin/dashboard/announcements', desc: 'Broadcast official announcements to the public portal.' },
    { id: 'Achievements', path: '/admin/dashboard/achievements', desc: 'Showcase student milestones and institutional awards.' },
    { id: 'Gallery', path: '/admin/dashboard/gallery', desc: 'Upload and organize official photographs.' },
    { id: 'About', path: '/admin/dashboard/about', desc: 'Edit the mission, vision, and core IEDC details.' },
    { id: 'Messages', path: '/admin/dashboard/messages', desc: 'Review incoming queries from the contact form.' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto font-sans animate-fade-in">
      
      {/* Page Header with Live Clock */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Manage content for the IEDC GPC Pala portal.</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {mounted ? currentTime : 'Loading time...'}
        </div>
      </div>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500">System Status</span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
          </div>
          <div className="text-lg font-bold text-gray-900">All Systems Operational</div>
          <div className="text-xs text-gray-400 mt-1">Production Environment</div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500">Database</span>
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
          </div>
          <div className="text-lg font-bold text-gray-900">Connected</div>
          <div className="text-xs text-gray-400 mt-1">Ready for IT Migration</div>
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-500">Security</span>
            <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="text-lg font-bold text-gray-900">Secured</div>
          <div className="text-xs text-gray-400 mt-1">Firebase Authentication Active</div>
        </div>
      </div>

      {/* Modules List */}
      <h2 className="text-lg font-bold text-gray-900 mb-4">Content Modules</h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="divide-y divide-gray-100">
          {modules.map((module) => (
            <Link 
              key={module.id} 
              href={module.path}
              className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {module.id}
                </h3>
                <p className="text-sm text-gray-500">{module.desc}</p>
              </div>
              <div className="text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 border-t border-gray-200 pt-6">
        <p>Licensed to Government Polytechnic College, Pala.</p>
        <p className="mt-2 md:mt-0 flex items-center gap-1">
          Developed by <span className="font-semibold text-gray-600">Lumina Web Solutions</span>
        </p>
      </div>

    </div>
  );
}
