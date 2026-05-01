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
        <iframe
          src="https://www.youtube.com/embed/8PCLmte00jw?rel=0&modestbranding=1"
          title="DevFest Video Recap"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      {/* YouTube Button */}
      <a
        href="https://www.youtube.com/watch?v=8PCLmte00jw"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.ytButton}
      >
        <Image src="/icons/yt.png" alt="YouTube icon" width={16} height={16} />
        <span>{t('watchBtn')}</span>
      </a>
    </section>
  );
}
