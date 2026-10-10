'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const active = photos[activeIndex] || null;

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/gallery', { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          setPhotos(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (error.name !== 'AbortError') console.error('Unable to load gallery', error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const closeViewer = useCallback(() => setExpanded(false), []);
  const move = useCallback((direction) => {
    if (!photos.length) return;
    setDirection(direction > 0 ? 1 : -1);
    setActiveIndex((index) => (index + direction + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (event) => {
      if (event.key === 'Escape') closeViewer();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [expanded, closeViewer, move]);

  if (!loading && !photos.length) return null;

  const getPhoto = (offset) => photos[(activeIndex + offset + photos.length) % photos.length];
  const sideOffsets = [-2, -1, 1, 2];

  return (
    <section id="gallery" className="section section--light gallery-section gallery-showcase">
      <div className="section-shell">
        <div className="section-heading section-heading--split gallery-showcase-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-number">06</span> The moments between</p>
            <h2>Life at <span className="text-gradient">IEDC.</span></h2>
          </div>
          <p className="section-intro">Ideas, people, experiments, and moments worth remembering.</p>
        </div>

        {loading ? (
          <div className="gallery-loading"><span className="gallery-loading-dot" /> Collecting moments…</div>
        ) : (
          <div className="gallery-stage" aria-label="IEDC photo gallery carousel">
            <div className="gallery-ambient" aria-hidden="true" />
            {photos.length > 1 && sideOffsets.map((offset) => {
              const photo = getPhoto(offset);
              if (!photo) return null;
              return (
                <motion.button
                  type="button"
                  key={`${photo.id}-${offset}`}
                  className={`gallery-side-card gallery-side-card--${offset < 0 ? 'left' : 'right'} gallery-side-card--${Math.abs(offset)}`}
                  onClick={() => move(offset)}
                  aria-label={`Show ${photo.title || `photo ${((activeIndex + offset + photos.length) % photos.length) + 1}`}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={photo.image_url} alt={photo.title || 'IEDC gallery moment'} fill sizes="(max-width: 700px) 28vw, 22vw" className="cover-image" />
                  <span className="gallery-side-shade" />
                  <span className="gallery-side-caption">{photo.title || 'IEDC moment'}</span>
                </motion.button>
              );
            })}

            {active && (
              <AnimatePresence mode="sync" initial={false}>
                <motion.article
                  key={active.id || activeIndex}
                  className="gallery-feature-card"
                  initial={{ opacity: 0, x: direction * 22, scale: .985 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -18, scale: .99 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 28, mass: 0.82 }}
                  drag={photos.length > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.14}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -55) move(1);
                    if (info.offset.x > 55) move(-1);
                  }}
                >
                  <button type="button" className="gallery-feature-image" onClick={() => setExpanded(true)} aria-label="Expand current gallery photo">
                    <Image src={active.image_url} alt={active.title || `IEDC gallery photo ${activeIndex + 1}`} fill priority={activeIndex === 0} sizes="(max-width: 700px) 88vw, 560px" className="cover-image" />
                    <span className="gallery-image-topline"><span>IEDC / GPC PALA</span><span>{String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span></span>
                    <span className="gallery-expand-chip"><span aria-hidden="true">↗</span> Expand</span>
                  </button>
                  <div className="gallery-feature-info">
                    <div className="gallery-feature-copy">
                      <p className="gallery-feature-kicker">FIELD NOTES · {String(activeIndex + 1).padStart(2, '0')}</p>
                      <h3>{active.title || 'A moment at IEDC'}</h3>
                      {active.description && <p className="gallery-feature-description">{active.description}</p>}
                    </div>
                    <div className="gallery-feature-controls">
                      <button type="button" onClick={() => move(-1)} aria-label="Previous photo">←</button>
                      <button type="button" onClick={() => move(1)} aria-label="Next photo">→</button>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            )}
          </div>
        )}

        {!loading && photos.length > 0 && (
          <div className="gallery-bottom-rail">
            <button type="button" className="gallery-rail-arrow" onClick={() => move(-1)} aria-label="Previous gallery photo">←</button>
            <div className="gallery-rail-current">
              <div className="gallery-rail-thumb">
                {active && <Image src={active.image_url} alt="" fill sizes="56px" className="cover-image" />}
              </div>
              <div className="gallery-rail-text"><strong>{active?.title || 'IEDC GPC Pala'}</strong><span>Moments from our community</span></div>
            </div>
            <button type="button" className="gallery-rail-heart" onClick={() => setExpanded(true)} aria-label="View current photo">↗</button>
            <button type="button" className="gallery-rail-arrow" onClick={() => move(1)} aria-label="Next gallery photo">→</button>
          </div>
        )}

        <div className="gallery-pagination" aria-label="Choose gallery photo">
          {photos.slice(0, 9).map((photo, index) => (
            <button key={photo.id || index} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => { setDirection(index >= activeIndex ? 1 : -1); setActiveIndex(index); }} aria-label={`Go to photo ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} />
          ))}
          {photos.length > 9 && <span>+{photos.length - 9}</span>}
        </div>
      </div>

      <AnimatePresence>
        {expanded && active && (
          <motion.div className="lightbox gallery-lightbox" role="dialog" aria-modal="true" aria-label="Gallery image viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeViewer}>
            <button className="lightbox-close" onClick={closeViewer} aria-label="Close image viewer">×</button>
            {photos.length > 1 && <button className="gallery-lightbox-nav gallery-lightbox-prev" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous photo">←</button>}
            <motion.div className="lightbox-image" key={active.id || activeIndex} initial={{ scale: .96 }} animate={{ scale: 1 }} exit={{ scale: .96 }} onClick={(event) => event.stopPropagation()}>
              <Image src={active.image_url} alt={active.title || 'IEDC gallery image'} fill sizes="90vw" className="cover-image" />
            </motion.div>
            {photos.length > 1 && <button className="gallery-lightbox-nav gallery-lightbox-next" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next photo">→</button>}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
