'use client';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />
      <div className="hero-scanline" aria-hidden="true" />
      <div className="hero-coordinate" aria-hidden="true">9°43&apos; N&nbsp; · &nbsp;76°41&apos; E</div>
      <div className="hero-inner">
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [.22, 1, .36, 1] }}>
          <div className="eyebrow eyebrow--light"><span className="status-dot" /> Innovation starts here <span className="eyebrow-line" /></div>
          <h1 id="hero-title" className="hero-title-reveal">
            <span className="hero-title-line">Ideas become</span>
            <span className="hero-title-line hero-title-line--accent"><span className="hero-gradient">impact.</span><span className="hero-title-spark" aria-hidden="true">✳</span></span>
          </h1>
          <p className="hero-description">A campus for curious minds, bold experiments, and the next generation of makers at Government Polytechnic College, Pala.</p>
          <div className="hero-actions"><a className="button button--primary" href="#about">Discover IEDC <span aria-hidden="true">↗</span></a><a className="button button--ghost" href="#events"><span className="play-icon">▶</span> Explore what we do</a></div>
          <div className="hero-meta"><span>01 / INNOVATION</span><span>GOVERNMENT POLYTECHNIC COLLEGE · PALA</span></div>
        </motion.div>
        <motion.div className="hero-visual" initial={reduceMotion ? false : { opacity: 0, scale: .94, y: 30, rotate: 1.5 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }} transition={{ duration: 1.25, delay: .18, ease: [.22, 1, .36, 1] }}>
          <div className="hero-orbit hero-orbit--outer" aria-hidden="true" /><div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
          <div className="hero-image-frame"><Image src="/IEDC5.png" alt="Innovation and student activities at IEDC GPC Pala" fill priority sizes="(max-width: 900px) 100vw, 54vw" className="hero-image" /></div>
          <div className="image-shade" />
          <div className="visual-label"><span className="visual-label-dot" /><span>BUILD WHAT’S NEXT</span><span className="visual-label-index">IEDC / PALA</span></div>
          <div className="floating-note"><span className="note-icon">✳</span><span><strong>Curiosity → Creation</strong><small>Think it. Build it. Share it.</small></span></div>
          <div className="hero-corner hero-corner--tl" /><div className="hero-corner hero-corner--br" />
          <div className="hero-side-index" aria-hidden="true"><span>IDEATE</span><i /><span>CREATE</span><i /><span>REPEAT</span></div>
        </motion.div>
      </div>
      <a className="scroll-cue" href="#pillars"><span className="scroll-cue-line" /> Scroll to explore</a>
    </section>
  );
}
