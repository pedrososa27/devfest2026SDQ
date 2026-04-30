'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './PastTalks.module.scss';

export default function PastTalks() {
  const { isDark } = useTheme();
  const t = useTranslations('pastTalks');

  const talks = [
    { title: 'Building scalable AI pipelines with Vertex', speaker: 'Maria Reyes', duration: '42:15', year: '2022', avatar: '#22D3EE' },
    { title: 'Pentesting 101: Breaking and defending APIs', speaker: 'Carlos Vasquez', duration: '38:02', year: '2023', avatar: '#EC4899' },
    { title: 'Figma to Flutter: shipping UI faster', speaker: 'Laura Mendez', duration: '29:47', year: '2022', avatar: '#34A853' },
    { title: 'Testing like a senior: TDD in the AI era', speaker: 'Diego Nunez', duration: '45:30', year: '2021', avatar: '#FBBC04' },
  ];

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
            <p className={styles.description}>
              {t('description')}
            </p>
          </div>
          <div className={styles.navButtons}>
            <button className={styles.navBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button className={styles.navBtnActive}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className={styles.grid}>
          {talks.map((talk, idx) => (
            <div key={idx} className={styles.card}>
              {/* Thumbnail */}
              <div className={styles.thumbnail}>
                <div className={styles.yearTag}>{talk.year}</div>
                <div className={styles.durationBadge}>{talk.duration}</div>
                <div className={styles.playBtn}>
                  <span className={styles.playIcon}>&#9654;</span>
                </div>
                <div
                  className={styles.thumbGradient}
                  style={{ background: `linear-gradient(135deg, ${talk.avatar}33 0%, ${talk.avatar}11 100%)` }}
                />
              </div>
              {/* Body */}
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{talk.title}</h3>
                <div className={styles.cardSpeaker}>
                  <div className={styles.avatarDot} style={{ backgroundColor: talk.avatar }} />
                  <span className={styles.speakerName}>{talk.speaker}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerCount}>24 talks archived across 3 editions</span>
          <a href="#" className={styles.ytLink}>
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
