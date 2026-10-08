'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardHome() {
  // Staggered animation setup
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Maps perfectly to your actual folder structure
  const quickLinks = [
    { name: 'Events', path: '/admin/dashboard/events', desc: 'Manage upcoming and past events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Team', path: '/admin/dashboard/team', desc: 'Update execom and members', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Announcements', path: '/admin/dashboard/announcements', desc: 'Post important notices', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { name: 'Achievements', path: '/admin/dashboard/achievements', desc: 'Showcase student success', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Gallery', path: '/admin/dashboard/gallery', desc: 'Upload and organize photos', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'About IEDC', path: '/admin/dashboard/about', desc: 'Edit the mission and vision', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Messages', path: '/admin/dashboard/messages', desc: 'Read contact form submissions', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-serif text-gray-900 mb-2">Command Center</h1>
          <p className="text-gray-500 font-sans text-lg">Select a module below to manage the portal content.</p>
        </div>
        
        {/* System Status Indicator */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100 w-fit">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-gray-600 uppercase">System Online</span>
        </div>
      </motion.div>

      {/* Quick Access Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {quickLinks.map((link) => (
          <motion.div key={link.name} variants={item}>
            <Link 
              href={link.path}
              className="block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all group h-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gray-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              
              <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                </svg>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{link.name}</h3>
              <p className="text-sm text-gray-500">{link.desc}</p>
              
              <div className="mt-4 flex items-center text-xs font-bold tracking-widest text-gray-400 uppercase group-hover:text-gray-900 transition-colors">
                Manage 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}

        {/* Informational / Branding Card */}
        <motion.div variants={item} className="bg-gray-900 p-6 rounded-3xl border border-gray-800 shadow-lg relative overflow-hidden group text-white flex flex-col justify-between md:col-span-2 lg:col-span-1 xl:col-span-1">
          <div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Architecture</h3>
            <p className="font-serif text-lg mb-2">Proprietary CMS v1.0</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Custom-built and securely locked down for exclusive institutional use by IEDC GPC Pala.
            </p>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase border-t border-gray-800 pt-4 mt-auto">
            Developed by Lumina Web Solutions
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
