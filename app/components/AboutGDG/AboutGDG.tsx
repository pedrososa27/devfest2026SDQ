'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './AboutGDG.module.scss';

export default function AboutGDG() {
  const { isDark } = useTheme();
  const t = useTranslations('about');

  return (
    <section
      className={styles.section}
      style={{
        '--bg-section':    isDark ? '#13131A' : '#FAF9F5',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--bg-code':       isDark ? '#0A0A0F' : '#F1F1F1',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <Image src="/icons/TagIcon.png" alt="About icon" width={12} height={12} /> {t('eyebrow')}
            </span>
            <h2 className={styles.title}>{t('title')}</h2>
          </div>
          <div className={styles.statsBadge}>
            <span className={styles.statsNum}>500+</span>
            <div className={styles.statsInfo}>
              <span className={styles.statsLabel}>{t('statsLabel')}</span>
              <span className={styles.statsSubLabel}>{t('statsSubLabel')}</span>
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div className={styles.grid}>
          {/* DevFest Column */}
          <div className={styles.col}>
            <div className={styles.colIcon} style={{ backgroundColor: '#A855F7' }}>
              <Image src="/icons/schedule-white.png" alt="DevFest icon" width={24} height={24} />
            </div>
            <h3 className={styles.colTitle}>{t('devfestTitle')}</h3>
            <p className={styles.colText}>
              {t('devfestText')}
            </p>
            <div className={styles.codeChip}>
              <span className={styles.codePrompt}>&gt;</span>
              <span>devfest.withgoogle.com</span>
            </div>
          </div>

          {/* GDG Column */}
          <div className={styles.col}>
            <div className={styles.colIcon} style={{ backgroundColor: '#22D3EE' }}>
              <Image src="/icons/gdgIcon.png" alt="GDG icon" width={24} height={24} />
            </div>
            <h3 className={styles.colTitle}>{t('gdgTitle')}</h3>
            <p className={styles.colText}>
              {t('gdgText')}
            </p>
            <div className={styles.gdgRow}>
              <div className={styles.gdgChip}>
                <div className={styles.gdgDot} style={{ backgroundColor: '#4285F4' }} />
                <div className={styles.gdgDot} style={{ backgroundColor: '#EA4335' }} />
                <div className={styles.gdgDot} style={{ backgroundColor: '#FBBC04' }} />
                <div className={styles.gdgDot} style={{ backgroundColor: '#34A853' }} />
                <span className={styles.gdgName}>GDG Santo Domingo</span>
              </div>
              <span className={styles.gdgMembers}>{t('gdgMembers')}</span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className={styles.statsStrip}>
          {[
            { num: t('stat1Num'), label: t('stat1Label') },
            { num: t('stat2Num'), label: t('stat2Label') },
            { num: t('stat3Num'), label: t('stat3Label') },
            { num: t('stat4Num'), label: t('stat4Label') },
          ].map((stat, idx) => (
            <div key={idx} className={styles.stripStat}>
              <span className={styles.stripNum}>{stat.num}</span>
              <span className={styles.stripLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
