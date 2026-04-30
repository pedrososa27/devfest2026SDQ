'use client';

import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import styles from './Hero.module.scss';

export default function Hero() {
  const { isDark } = useTheme();

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
        <span className={styles.badgeText}>GDG SANTO DOMINGO // COMMUNITY EVENT</span>
      </div>

      {/* Subtitle */}
      <span className={styles.subtitle}>DevFest Santo Domingo 2023</span>

      {/* Main Title */}
      <h1 className={styles.title}>
        Where developers<br />
        build the future.
      </h1>

      {/* Description */}
      <p className={styles.description}>
        Two days of deep-dive talks on AI, Cybersecurity, Testing, Data engineering, and UI/UX — built by the Dominican dev community, for the Dominican dev community.
      </p>

      {/* Meta Info */}
      <div className={styles.metaRow}>
        <div className={styles.metaChip}>
          <Image src="/icons/date.png" alt="Calendar icon" width={16} height={16} />
          Nov 18-19, 2023
        </div>
        <div className={styles.metaChip}>
          <Image src="/icons/location-pink.png" alt="Location icon" width={16} height={16} />
          Santo Domingo, DR
        </div>
      </div>

      {/* CTA Buttons */}
      <div className={styles.ctaRow}>
        <button className={styles.primaryButton}>
          Register Now
          <span className={styles.btnArrow}>→</span>
        </button>
        <button className={styles.secondaryButton}>
          <Image src="/icons/schedule-white.png" alt="Calendar icon" width={16} height={16} />
          View Schedule
        </button>
      </div>
    </section>
  );
}
