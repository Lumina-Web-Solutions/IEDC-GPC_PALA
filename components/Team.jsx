'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

function SocialLink({ href, label, children }) {
  if (!href) return null;
  return <a className="team-social-link" href={href} target="_blank" rel="noreferrer" aria-label={label}>{children}</a>;
}

function PersonCard({ member, index }) {
  const reduceMotion = useReducedMotion();
  const initials = member.name?.trim()?.split(/\s+/).slice(0, 2).map((part) => part[0]).join('') || 'I';

  return (
    <motion.article
      className="person-card"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.075, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      <div className="person-portrait">
        <span className="person-event-label">IEDC<br />GPC PALA</span>
        <span className="person-role-label"><i /> {member.category === 'Faculty' ? 'Mentor' : 'Team'}</span>
        <div className="person-blue-shape" aria-hidden="true" />
        <div className="person-image">
          {member.image_url ? (
            <Image
              src={member.image_url}
              alt={member.name || 'IEDC team member'}
              fill
              sizes="(max-width: 520px) 90vw, (max-width: 760px) 44vw, (max-width: 1100px) 29vw, 23vw"
              className="person-photo"
            />
          ) : (
            <div className="person-initial" aria-label={`Initials ${initials}`}>{initials}</div>
          )}
        </div>
        <span className="person-index">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="person-details">
        <div className="person-details-top">
          <div className="person-copy">
            <h3>{member.name}</h3>
            <p>{member.role || (member.category === 'Faculty' ? 'Faculty Mentor' : 'Executive Committee')}</p>
          </div>
          <div className="person-socials">
            <SocialLink href={member.linkedin_url || member.linkedin} label={`${member.name} on LinkedIn`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.5H2.1V22h3.1V8.5ZM3.65 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 13.7c0-4.1-2.2-6-5.2-6a4.5 4.5 0 0 0-4.1 2.2V8.5H9.6V22h3.1v-7.1c0-1.9.4-3.8 2.8-3.8s2.5 2.2 2.5 3.9V22H22v-8.3Z" /></svg>
            </SocialLink>
            <SocialLink href={member.github_url || member.github} label={`${member.name} on GitHub`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 2.1 3.5 1.5.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.5 0-1.2.4-2.1 1.1-2.9-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.4 10.4 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.7 1.1 2.9 0 4.2-2.6 5.2-5.1 5.5.4.3.7 1 .7 1.9v2.8c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" /></svg>
            </SocialLink>
          </div>
        </div>
        <div className="person-accent-line" />
      </div>
    </motion.article>
  );
}

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/team', { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setMembers(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (error.name !== 'AbortError') console.error('Unable to load team', error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const faculty = members.filter((member) => member.category === 'Faculty');
  const students = members.filter((member) => member.category === 'Student');

  return (
    <section id="team" className="section section--tint team-section team-section--profiles">
      <div className="section-shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><span className="eyebrow-number">07</span> The people behind it</p>
            <h2>Good ideas need<br /><span className="text-gradient">good people.</span></h2>
          </div>
          <p className="section-intro">Meet the mentors and student leaders building a culture of innovation, collaboration, and making ideas real.</p>
        </div>

        {faculty.length > 0 && <div className="team-group">
          <div className="team-group-heading"><h3>Our mentors</h3><span>{String(faculty.length).padStart(2, '0')} PEOPLE</span></div>
          <div className="team-grid team-grid--faculty">{faculty.map((member, index) => <PersonCard member={member} index={index} key={member.id ?? `faculty-${member.name}-${index}`} />)}</div>
        </div>}

        {students.length > 0 && <div className="team-group">
          <div className="team-group-heading"><h3>Executive committee</h3><span>{String(students.length).padStart(2, '0')} PEOPLE</span></div>
          <div className="team-grid">{students.map((member, index) => <PersonCard member={member} index={index} key={member.id ?? `student-${member.name}-${index}`} />)}</div>
        </div>}

        {!loading && !members.length && <div className="empty-state"><h3>The team is coming into focus.</h3><p>Team profiles will appear here when available.</p></div>}
        {loading && <div className="loading-line"><span /> Loading the team…</div>}
      </div>
    </section>
  );
}
