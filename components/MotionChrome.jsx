'use client';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export default function MotionChrome() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <>
      <motion.div className="reading-progress" style={{ scaleX: reduceMotion ? 0 : scaleX }} aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
    </>
  );
}
