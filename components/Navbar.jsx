'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  ['About', '#about'], ['Events', '#events'], ['Updates', '#announcements'],
  ['Impact', '#achievements'], ['Team', '#team'], ['Contact', '#contact'],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }} className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
      <nav className="nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Image src="/LogoN.png" alt="" fill priority sizes="48px" className="object-contain" /></span>
          <span className="brand-copy"><strong>IEDC</strong><span>GPC PALA</span></span>
        </Link>
        <div className="nav-links">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a href="#contact" className="nav-cta">Let’s connect <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <span /><span />
        </button>
      </nav>
      <AnimatePresence>
        {open && <motion.div className="mobile-nav" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
          {links.map(([label, href], i) => <motion.a key={href} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * .035 }}>{label}<span>↗</span></motion.a>)}
        </motion.div>}
      </AnimatePresence>
    </motion.header>
  );
}
