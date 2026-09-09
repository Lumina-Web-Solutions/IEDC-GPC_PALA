'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
<Link href="/" className="flex items-center space-x-3 group">
  <div className="relative w-12 h-12 md:w-14 md:h-14">
    <Image 
      src="/LogoN.png" 
      alt="IEDC GPC Pala Logo" 
      fill
      className="object-contain transition-transform duration-300 group-hover:scale-105"
      priority
    />
  </div>
  <div className="flex items-center ml-2 md:ml-3">
  {/* The Serif Font for IEDC */}
  <span className="font-serif text-xl md:text-2xl text-gray-900 leading-none">
    IEDC
  </span>
  
  {/* The Vertical Divider Line (Hidden on Mobile) */}
  <span className="hidden md:inline-block mx-3 md:mx-4 w-px h-6 bg-gray-300"></span>
  
  {/* The Tiny, Spaced-Out Sans-Serif Font for GPC PALA (Hidden on Mobile) */}
  <span className="hidden md:inline-block font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] text-gray-500 uppercase leading-none mt-1">
    GPC PALA
  </span>
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

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-900 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold tracking-[0.15em] text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
