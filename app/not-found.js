'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

const destinations = [
  { label: 'About IEDC', href: '/#about', code: '01' },
  { label: 'Upcoming events', href: '/#events', code: '02' },
  { label: 'Our team', href: '/#team', code: '03' },
];

export default function NotFound() {
  const reduceMotion = useReducedMotion();
  const [showClue, setShowClue] = useState(false);

  return (
    <main className="not-found-page relative isolate min-h-screen overflow-hidden bg-[#f8fafc] px-5 py-10 text-slate-950 sm:px-8">
      {/* Quiet engineering blueprint background */}
      <div className="nf-blueprint pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="nf-orbit nf-orbit-one pointer-events-none absolute -right-24 -top-24 -z-10" aria-hidden="true" />
      <div className="nf-orbit nf-orbit-two pointer-events-none absolute -bottom-40 -left-32 -z-10" aria-hidden="true" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          <span className="nf-brand-mark relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-white p-1.5"><img src="/Logo.png" alt="IEDC GPC Pala logo" className="h-full w-full object-contain" /></span>
          <span className="text-sm font-bold tracking-[0.16em]">IEDC <span className="font-normal text-slate-500">GPC PALA</span></span>
        </Link>
        <span className="hidden items-center gap-2 text-xs font-medium tracking-[0.14em] text-slate-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> SYSTEM ONLINE
        </span>
      </header>

      <section className="mx-auto grid min-h-[76vh] w-full max-w-6xl items-center gap-12 py-14 md:grid-cols-[1.05fr_.95fr] md:gap-8 md:py-20">
        <div className="relative z-10">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-blue-700 shadow-sm"
          >
            <span className="nf-pulse-dot h-2 w-2 rounded-full bg-blue-500" />
            NAVIGATION ERROR · 404
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="nf-number text-[clamp(7rem,22vw,14rem)] font-black leading-[.78] tracking-[-.1em] text-slate-950"
          >
            4<span className="nf-zero relative inline-block text-blue-600">0</span>4
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 max-w-xl"
          >
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Looks like this idea took a wrong turn.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              The page you’re looking for isn’t here. Let’s get you back to the ideas, people, and projects at IEDC GPC Pala.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/" className="nf-primary-button inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
              Back to homepage <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              onClick={() => setShowClue((current) => !current)}
              aria-expanded={showClue}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-400 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              {showClue ? 'Hide navigation clues' : 'Find your way'}
            </button>
          </motion.div>

          {showClue && (
            <motion.nav
              initial={reduceMotion ? false : { opacity: 0, height: 0, y: 8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className="mt-5 grid max-w-lg gap-2 overflow-hidden sm:grid-cols-3"
              aria-label="Helpful site links"
            >
              {destinations.map((item) => (
                <Link key={item.code} href={item.href} className="group rounded-xl border border-slate-200 bg-white/90 p-3 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                  <span className="block text-[10px] font-bold tracking-[0.16em] text-blue-600">{item.code}</span>
                  <span className="mt-2 block text-sm font-semibold">{item.label}</span>
                  <span className="mt-2 block text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" aria-hidden="true">→</span>
                </Link>
              ))}
            </motion.nav>
          )}
        </div>

        {/* A small interactive engineering schematic — decorative, not a heavy 3D scene */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="nf-schematic relative mx-auto aspect-square w-full max-w-[470px]"
          aria-label="Decorative animated engineering schematic"
        >
          <div className="nf-schematic-grid absolute inset-0 rounded-[2rem]" aria-hidden="true" />
          <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full" role="img" aria-label="Circuit diagram with a missing connection">
            <defs>
              <linearGradient id="nfBlue" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="#b7c8df" strokeWidth="1.5">
              <path d="M28 98 H110 V145 H145" />
              <path d="M292 72 H350 V126 H382" />
              <path d="M25 270 H84 V230 H124" />
              <path d="M298 300 H352 V342 H390" />
              <path d="M210 24 V82 M210 338 V395 M24 210 H70 M350 210 H398" />
            </g>
            <g fill="#f8fafc" stroke="#7c9bc2" strokeWidth="2">
              <circle cx="110" cy="98" r="5" /><circle cx="145" cy="145" r="5" />
              <circle cx="350" cy="126" r="5" /><circle cx="84" cy="230" r="5" />
              <circle cx="352" cy="300" r="5" /><circle cx="210" cy="82" r="5" />
            </g>
            <motion.g
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
              style={{ transformOrigin: '210px 210px' }}
            >
              <circle cx="210" cy="210" r="116" fill="none" stroke="#c8d7eb" strokeDasharray="3 9" strokeWidth="1.5" />
              <circle cx="210" cy="210" r="88" fill="none" stroke="#d9e5f3" strokeWidth="1.5" />
            </motion.g>
            <circle cx="210" cy="210" r="64" fill="#fff" stroke="url(#nfBlue)" strokeWidth="2" />
            <circle cx="210" cy="210" r="49" fill="#eff6ff" />
            <text x="210" y="207" textAnchor="middle" fontSize="27" fontWeight="800" fill="#1d4ed8">404</text>
            <text x="210" y="229" textAnchor="middle" fontSize="8" fontWeight="700" letterSpacing="2" fill="#64748b">NO SIGNAL</text>
            <path d="M210 146 V120 H274 V145" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M274 145 l-7 -8 M274 145 l7 -8" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="274" cy="145" r="5" fill="#fff" stroke="#2563eb" strokeWidth="2" />
            <motion.circle
              cx="210" cy="94" r="4" fill="#2563eb"
              animate={reduceMotion ? undefined : { cy: [94, 104, 94], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <text x="28" y="75" fontSize="9" fontFamily="monospace" fill="#8297b3">TRACE_04</text>
            <text x="300" y="365" fontSize="9" fontFamily="monospace" fill="#8297b3">CONNECTION LOST</text>
          </svg>
          <div className="nf-floating-label absolute -right-1 top-[18%] rounded-xl border border-blue-100 bg-white/95 px-3 py-2 text-[10px] font-bold tracking-[0.14em] text-blue-700 shadow-lg sm:-right-3">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-blue-500" /> PATH NOT FOUND
          </div>
          <div className="absolute -bottom-1 left-2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 font-mono text-[10px] text-slate-500 shadow-md">
            X: 404&nbsp; / &nbsp;Y: ∅
          </div>
        </motion.div>
      </section>

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-slate-200/80 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>IEDC GPC PALA <span className="text-slate-300">/</span> INNOVATION IN MOTION</span>
        <Link href="/" className="font-semibold text-blue-700 underline decoration-blue-400 underline-offset-4 transition hover:text-blue-900">Return to base</Link>
      </footer>

      <style jsx global>{`
        .nf-blueprint {
          background-image: linear-gradient(rgba(37,99,235,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.035) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .nf-orbit {
          width: 22rem; height: 22rem; border: 1px solid rgba(37,99,235,.08); border-radius: 50%;
        }
        .nf-orbit::before, .nf-orbit::after {
          content: ""; position: absolute; inset: 1.6rem; border: 1px solid rgba(37,99,235,.06); border-radius: 50%;
        }
        .nf-orbit::after { inset: 3.2rem; }
        .nf-number { font-variant-numeric: tabular-nums; }
        .nf-zero { text-shadow: 0 10px 40px rgba(37,99,235,.12); }
        .nf-zero::after {
          content: ""; position: absolute; left: 15%; right: 8%; top: 48%; height: 2px;
          background: #93c5fd; transform: rotate(-34deg); opacity: .75;
        }
        .nf-schematic-grid {
          background-image: radial-gradient(rgba(37,99,235,.18) .8px, transparent .8px);
          background-size: 18px 18px;
          mask-image: radial-gradient(ellipse at center, black 10%, transparent 72%);
        }
        .nf-floating-label { animation: nfFloat 5s ease-in-out infinite; }
        .nf-pulse-dot { animation: nfPulse 2s ease-in-out infinite; }
        .nf-brand-mark { box-shadow: 0 7px 20px rgba(37,99,235,.2); }
        .nf-primary-button { box-shadow: 0 12px 28px rgba(15,23,42,.14); }
        @keyframes nfFloat { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        @keyframes nfPulse { 0%,100% { opacity: .45 } 50% { opacity: 1 } }
        @media (prefers-reduced-motion: reduce) {
          .nf-floating-label, .nf-pulse-dot { animation: none !important; }
        }
      `}</style>
    </main>
  );
}
