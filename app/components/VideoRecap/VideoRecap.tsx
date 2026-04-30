'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import Image from 'next/image';
import styles from './VideoRecap.module.scss';

export default function VideoRecap() {
  const { isDark } = useTheme();
  const t = useTranslations('videoRecap');

  return (
    <section
      className={styles.section}
      style={{
        '--bg-section':    isDark ? '#13131A' : '#FAF9F5',
        '--bg-badge':      isDark ? '#1A1A24' : '#F1F1F1',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--border-strong': isDark ? '#3A3A48' : '#CCCCCC',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-secondary':  isDark ? '#A1A1AA' : '#888888',
        '--video-shadow':  isDark ? '0 20px 60px rgba(0,0,0,0.8)' : '0 20px 60px rgba(0,0,0,0.2)',
      } as React.CSSProperties}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.eyebrow}>
          <Image src="/icons/record.png" alt="Video icon" width={12} height={12} />
          <span>{t('eyebrow')}</span>
        </div>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>
          {t('description')}
        </p>
      </div>

      {/* Video Card */}
      <div className={styles.videoCard}>
        {/* Top Bar */}
        <div className={styles.videoTopBar}>
          <div className={styles.recapBadge}>
            <span>📺</span>
            <span>{t('recapLabel')}</span>
          </div>
          <div className={styles.durationBadge}>04:32</div>
        </div>

        {/* Play Button */}
        <div className={styles.playButton}>
          <span className={styles.playIcon}>▶</span>
        </div>

        {/* Bottom Info */}
        <div className={styles.videoInfo}>
          <h3 className={styles.videoTitle}>{t('videoTitle')}</h3>
          <p className={styles.videoMeta}>{t('videoMeta')}</p>
        </div>
      </div>

      {/* YouTube Button */}
      <button className={styles.ytButton}>
        <Image src="/icons/yt.png" alt="YouTube icon" width={16} height={16} />
        <span>{t('watchBtn')}</span>
      </button>
    </section>
  );
}
