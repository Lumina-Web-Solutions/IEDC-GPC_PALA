'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
export default function AboutIEDC() {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const controller = new AbortController(); (async () => { try { const res = await fetch('/api/about', { signal: controller.signal }); if (res.ok) setData(await res.json()); } catch (e) { if (e.name !== 'AbortError') console.error('Unable to load about content', e); } finally { if (!controller.signal.aborted) setLoading(false); } })(); return () => controller.abort(); }, []);
  const vision = data?.vision || 'A campus culture where students feel empowered to question, experiment, collaborate, and turn promising ideas into meaningful outcomes.';
  const objectives = Array.isArray(data?.objectives) ? data.objectives : ['Encourage creative problem-solving and interdisciplinary collaboration.', 'Connect students with mentors, startup resources, and practical learning.', 'Build confidence through workshops, projects, and community-led initiatives.'];
  return <section id="about" className="section section--dark about-section"><div className="about-glow" aria-hidden="true" /><div className="section-shell about-shell">
    <motion.div className="about-copy" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .7 }}><p className="eyebrow eyebrow--light"><span className="eyebrow-number">02</span> A little about us</p><h2>Not just ideas.<br /><span className="hero-gradient">A launchpad.</span></h2><p className="about-lead">{data?.about_text || 'IEDC GPC Pala is a student-focused space for innovation, entrepreneurship, and technology. We help turn curiosity into projects, skills, and possibilities.'}</p><a href="#contact" className="button button--primary">Meet the community <span>↗</span></a></motion.div>
    <motion.div className="about-visual" initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8 }}><div className="about-photo">{data?.image_url ? <Image src={data.image_url} alt="IEDC community in action" fill sizes="(max-width: 800px) 100vw, 45vw" className="cover-image" /> : <div className="about-image-placeholder"><span>IDEAS IN MOTION</span><span className="placeholder-symbol">✳</span></div>}</div><div className="about-photo-caption"><span>CURIOUS BY NATURE</span><span>BUILT TO EXPLORE ↗</span></div></motion.div>
    <div className="about-bottom"><div className="about-info-block"><p className="eyebrow eyebrow--light">Our vision</p><p>{vision}</p></div><div className="about-info-block"><p className="eyebrow eyebrow--light">What we work toward</p><ul>{objectives.map((item, i) => <li key={`${i}-${item}`}><span>0{i + 1}</span>{item}</li>)}</ul></div></div>
    {loading && <span className="sr-only">Loading additional about content</span>}
  </div></section>;
}
