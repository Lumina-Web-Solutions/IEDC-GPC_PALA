'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export default function Announcements() {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true);
  useEffect(() => { const controller = new AbortController(); (async () => { try { const res = await fetch('/api/announcements', { signal: controller.signal }); if (res.ok) setItems(await res.json()); } catch (e) { if (e.name !== 'AbortError') console.error('Unable to load announcements', e); } finally { if (!controller.signal.aborted) setLoading(false); } })(); return () => controller.abort(); }, []);
  const format = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? 'UPDATE' : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(); };
  if (!loading && !items.length) return null;
  return <section id="announcements" className="section section--tint announcements-section"><div className="section-shell announcement-layout"><div className="announcement-intro"><p className="eyebrow"><span className="eyebrow-number">04</span> The noticeboard</p><h2>In the<br /><span className="text-gradient">know.</span></h2><p>Small updates. Big opportunities. The latest from our community.</p></div><div className="announcement-list">{items.map((item, i) => <motion.article className="announcement-item" key={item.id} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .45, delay: i * .06 }}><span className="announcement-date">{format(item.announcement_date)}</span><div><h3>{item.title}</h3><p>{item.details}</p></div><span className="announcement-arrow">↗</span></motion.article>)}{loading && <div className="loading-line"><span /> Loading updates…</div>}</div></div></section>;
}
