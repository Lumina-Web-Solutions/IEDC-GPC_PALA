'use client';

import { useReducedMotion } from 'framer-motion';

export default function EngineeringDetails() {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`engineering-details${reduceMotion ? ' engineering-details--static' : ''}`} aria-hidden="true">
      <svg className="engineering-trace engineering-trace--one" viewBox="0 0 220 150" fill="none">
        <path d="M2 18H58V48H96V82H145V112H218" />
        <path d="M35 2V18M96 48V65M145 82V96" />
        <circle cx="58" cy="48" r="3" /><circle cx="96" cy="82" r="3" /><circle cx="145" cy="112" r="3" />
      </svg>
      <svg className="engineering-trace engineering-trace--two" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="55"/><circle cx="90" cy="90" r="42" strokeDasharray="2 7"/>
        <path d="M90 16V49M90 131V164M16 90H49M131 90H164M38 38L61 61M119 119L142 142M142 38L119 61M61 119L38 142"/>
        <circle cx="90" cy="90" r="5"/>
      </svg>
      <span className="engineering-coordinate engineering-coordinate--one">EE / 09.24</span>
      <span className="engineering-coordinate engineering-coordinate--two">SIGNAL DETECTED <i /></span>
    </div>
  );
}
