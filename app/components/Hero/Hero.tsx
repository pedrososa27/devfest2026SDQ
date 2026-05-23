'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './Hero.module.scss';

export default function Hero() {
  const { isDark } = useTheme();
  const t = useTranslations('hero');

  return (
    <section
      className={styles.hero}
      style={{
        '--bg-primary':     isDark ? '#0A0A0F' : '#FFFFFF',
        '--bg-secondary':   isDark ? '#1A1A24' : '#F1F1F1',
        '--border-subtle':  isDark ? '#2A2A35' : '#E5E5E5',
        '--border-strong':  isDark ? '#3A3A48' : '#CCCCCC',
        '--fg-primary':     isDark ? '#FFFFFF'  : '#141413',
        '--fg-secondary':   isDark ? '#A1A1AA' : '#888888',
        '--fg-muted':       isDark ? '#A1A1AA' : '#47362C',
        '--glow-1':         isDark ? 'rgba(168, 85, 247, 0.35)' : 'rgba(124, 58, 237, 0.35)',
        '--glow-2':         isDark ? 'rgba(34, 211, 238, 0.25)' : 'rgba(8, 145, 178, 0.25)',
        '--btn-sec-bg':     isDark ? '#1A1A24' : '#F1F1F1',
        '--btn-sec-hover':  isDark ? '#2A2A35' : '#E5E5E5',
      } as React.CSSProperties}
    >
      {/* Background Video */}
      <video
        className={styles.videoBg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/assets/Hero-bg.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoOverlay} />

      {/* Hero Badge */}
      <div className={styles.badge}>
        <div className={styles.badgeDot} />
        <span className={styles.badgeText}>{t('badge')}</span>
      </div>

      {/* Event Name — primary heading */}
      <h1 className={styles.subtitle}>{t('subtitle')}</h1>

      {/* Tagline */}
      <p className={styles.title}>
        {t('title')}
      </p>

      {/* Description */}
      <p className={styles.description}>
        {t('description')}
      </p>

      {/* Meta Info */}
      <div className={styles.metaRow}>
        <div className={styles.metaChip}>
          <Image src="/icons/date.png" alt="Calendar icon" width={16} height={16} />
          {t('date')}
        </div>
        <div className={styles.metaChip}>
          <Image src="/icons/location-pink.png" alt="Location icon" width={16} height={16} />
          {t('location')}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaRow}>
        <button className={styles.primaryButton}>
          {t('registerBtn')}
          <span className={styles.btnArrow}>→</span>
        </button>
        <button className={styles.secondaryButton}>
          <Image src={isDark ? '/icons/schedule-white.png' : '/icons/schedule-purple.png'} alt="Calendar icon" width={16} height={16} />
          {t('scheduleBtn')}
        </button>
      </div>
    </section>
  );
}
