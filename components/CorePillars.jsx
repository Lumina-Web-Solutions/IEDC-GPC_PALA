'use client';
import { motion } from 'framer-motion';
const pillars = [
  { n: '01', title: 'Innovation', mark: '✳', text: 'We create space for fresh thinking through ideathons, challenges, and idea-led projects that turn curiosity into action.' },
  { n: '02', title: 'Entrepreneurship', mark: '↗', text: 'We encourage student founders to explore opportunities, connect with mentors, and take the first steps toward building something real.' },
  { n: '03', title: 'Technology', mark: '⌘', text: 'Workshops, competitions, hackathons, and conversations help our community learn the tools shaping tomorrow.' },
];
export default function CorePillars() {
  return <section id="pillars" className="section section--light pillars-section"><div className="section-shell">
    <div className="section-heading section-heading--split"><div><p className="eyebrow"><span className="eyebrow-number">01</span> What moves us</p><h2>Three forces.<br /><span className="text-gradient">One community.</span></h2></div><p className="section-intro">We bring ideas, people, and practical skills together to help innovation take root on campus.</p></div>
    <div className="pillar-grid">{pillars.map((p, i) => <motion.article key={p.n} className="pillar-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: i * .1 }}><div className="pillar-card-top"><span>{p.n} / PILLAR</span><span className="pillar-mark">{p.mark}</span></div><h3>{p.title}</h3><p>{p.text}</p><a href="#about" className="text-link">Explore our approach <span>↗</span></a></motion.article>)}</div>
  </div></section>;
}
