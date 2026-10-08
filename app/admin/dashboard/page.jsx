'use client';
import Link from 'next/link';

export default function DashboardHome() {
  const modules = [
    { name: 'Events Management', path: '/admin/dashboard/events', desc: 'Create, update, or remove institutional events and programs.', id: 'MOD-01' },
    { name: 'Team & Execom', path: '/admin/dashboard/team', desc: 'Manage executive committee members and faculty profiles.', id: 'MOD-02' },
    { name: 'Official Announcements', path: '/admin/dashboard/announcements', desc: 'Broadcast public notices and circulars to the portal.', id: 'MOD-03' },
    { name: 'Achievements', path: '/admin/dashboard/achievements', desc: 'Record and display student and institutional milestones.', id: 'MOD-04' },
    { name: 'Media Gallery', path: '/admin/dashboard/gallery', desc: 'Upload and categorize official photographs and media assets.', id: 'MOD-05' },
    { name: 'Institutional Info', path: '/admin/dashboard/about', desc: 'Update mission, vision, and core administrative details.', id: 'MOD-06' },
    { name: 'Public Communications', path: '/admin/dashboard/messages', desc: 'Review and manage inbound queries from the public portal.', id: 'MOD-07' },
  ];

  // Get current date for the dashboard header
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="w-full max-w-7xl mx-auto font-sans">
      
      {/* Official Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">System Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Innovation and Entrepreneurship Development Centre • GPC Pala</p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded border border-gray-200">
          {today}
        </div>
      </div>

      {/* System Status Bar */}
      <div className="bg-white border border-gray-300 shadow-sm mb-8">
        <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">System Overview</span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 uppercase">
            <span className="h-2 w-2 bg-green-600 rounded-full"></span>
            Online
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-sm">
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-xs font-semibold uppercase mb-1">Environment</span>
            <span className="text-gray-900 font-medium">Production (v1.0.0)</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-xs font-semibold uppercase mb-1">Database Status</span>
            <span className="text-gray-900 font-medium">Connected & Active</span>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-gray-500 text-xs font-semibold uppercase mb-1">Security Protocol</span>
            <span className="text-gray-900 font-medium">Firebase Auth Enforced</span>
          </div>
        </div>
      </div>

      {/* Content Management Modules (Table Layout) */}
      <div className="bg-white border border-gray-300 shadow-sm mb-8">
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-3">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Administrative Modules</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {modules.map((module) => (
            <div key={module.id} className="p-4 hover:bg-blue-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 border border-gray-300 text-gray-500 text-xs font-mono px-2 py-1 rounded">
                  {module.id}
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-900">{module.name}</h3>
                  <p className="text-sm text-gray-600 mt-0.5">{module.desc}</p>
                </div>
              </div>
              
              <Link 
                href={module.path}
                className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-50 hover:text-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none whitespace-nowrap"
              >
                Access Module
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
        <p>Proprietary software licensed to Government Polytechnic College, Pala.</p>
        <p className="mt-1">Developed and maintained by <span className="font-semibold text-gray-700">Lumina Web Solutions</span>.</p>
      </div>

    </div>
  );
}
