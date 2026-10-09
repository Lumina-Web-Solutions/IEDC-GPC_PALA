'use client';
import { motion, useReducedMotion } from 'framer-motion';

const phrases = ['Ideas into action', 'Build with purpose', 'Experiment boldly', 'Create together', 'Make an impact'];
export default function SignalMarquee() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="signal-marquee" aria-label="Our mindset">
      <div className="signal-marquee-top"><span>THE IEDC MINDSET</span><span>CURIOUS BY NATURE · BUILT TO CREATE</span></div>
      <div className="signal-marquee-window">
        <motion.div className="signal-marquee-track" animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }} transition={{ duration: 32, ease: 'linear', repeat: Infinity }}>
          {[...phrases, ...phrases].map((phrase, index) => <span className="signal-marquee-item" key={`${phrase}-${index}`}>{phrase}<b aria-hidden="true">✳</b></span>)}
        </motion.div>
      </div>
    </section>
  );
}
