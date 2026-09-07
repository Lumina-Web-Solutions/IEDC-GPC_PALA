'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'EVENTS', href: '#events' },
    { name: 'ANNOUNCEMENTS', href: '#announcements' },
    { name: 'ACHIEVEMENTS', href: '#achievements' },
    { name: 'TEAM', href: '#team' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Replace src with your actual logo path later */}
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold tracking-wider">
            IEDC
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-xs font-semibold tracking-[0.15em] text-gray-600 hover:text-black transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button Placeholder */}
        <button className="md:hidden text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}