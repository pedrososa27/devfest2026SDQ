'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '../../../lib/supabase/client';
import { PastTalk } from '../../../lib/supabase/types';
import styles from './PastTalks.module.scss';

const VISIBLE = 4;
const INTERVAL_MS = 4000;

export default function PastTalks() {
  const { isDark } = useTheme();
  const t = useTranslations('pastTalks');
  const [talks, setTalks] = useState<PastTalk[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('past_talks')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => { if (data) setTalks(data); });
  }, []);

  const maxIndex = Math.max(0, talks.length - VISIBLE);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (talks.length <= VISIBLE) return;
    timerRef.current = setInterval(next, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, talks.length]);

  function handlePrev() {
    if (timerRef.current) clearInterval(timerRef.current);
    prev();
    timerRef.current = setInterval(next, INTERVAL_MS);
  }
  function handleNext() {
    if (timerRef.current) clearInterval(timerRef.current);
    next();
    timerRef.current = setInterval(next, INTERVAL_MS);
  }

  const visible = talks.slice(current, current + VISIBLE);

  return (
    <section
      className={styles.section}
      style={{
        '--bg-primary':    isDark ? '#0A0A0F' : '#FFFFFF',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--bg-thumb':      isDark ? '#0F0F15' : '#E5E5E5',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--border-strong': isDark ? '#3A3A48' : '#CCCCCC',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
        '--neon-cyan':     isDark ? '#22D3EE' : '#0891B2',
        '--duration-bg':   isDark ? 'rgba(10,10,15,0.8)' : 'rgba(255,255,255,0.85)',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <div className={styles.eyebrow}>
              <div className={styles.eyebrowDot} />
              <span className={styles.eyebrowText}>{t('eyebrow')}</span>
            </div>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>
          </div>
          {talks.length > VISIBLE && (
            <div className={styles.navButtons}>
              <button className={styles.navBtn} onClick={handlePrev} aria-label={t('prevBtn')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className={styles.navBtnActive} onClick={handleNext} aria-label={t('nextBtn')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Carousel / empty state */}
        {talks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--fg-dim)', fontSize: 14 }}>
            {t('comingSoon')}
          </div>
        ) : (
          <div className={styles.grid}>
            {visible.map((talk, idx) => (
              <a
                key={`${talk.id}-${idx}`}
                href={`https://www.youtube.com/watch?v=${talk.youtube_video_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.thumbnail}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${talk.youtube_video_id}/hqdefault.jpg`}
                    alt={talk.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {talk.year && <div className={styles.yearTag}>{talk.year}</div>}
                  <div className={styles.playBtn}>
                    <span className={styles.playIcon}>&#9654;</span>
                  </div>
                  <div className={styles.thumbOverlay} />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Dots */}
        {talks.length > VISIBLE && (
          <div className={styles.dots}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className={i === current ? styles.dotActive : styles.dot}
                onClick={() => setCurrent(i)}
                aria-label={t('slideLabel', { n: i + 1 })}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerCount}>{t('footerCount', { count: talks.length })}</span>
          <a href="https://www.youtube.com/@gdgsantodomingo/videos" target="_blank" rel="noopener noreferrer" className={styles.ytLink}>
            <Image src="/icons/ytblue.png" alt="YouTube icon" width={16} height={16} />
            <span>{t('watchAll')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
