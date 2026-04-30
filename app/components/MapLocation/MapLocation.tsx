'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './MapLocation.module.scss';

export default function MapLocation() {
  const { isDark } = useTheme();
  const t = useTranslations('mapLocation');

  return (
    <section
      className={styles.section}
      style={{
        '--bg-section':    isDark ? '#13131A' : '#FAF9F5',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--bg-map':        isDark ? '#0A0A0F' : '#F8F8F8',
        '--bg-map-grad1':  isDark ? '#1A1A2E' : '#F0F0F0',
        '--bg-map-grad2':  isDark ? '#13131A' : '#FFFFFF',
        '--bg-info-tag':   isDark ? '#1A1A24' : '#F1F1F1',
        '--bg-overlay':    isDark ? 'rgba(10,10,15,0.8)' : 'rgba(255,255,255,0.85)',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--border-strong': isDark ? '#3A3A48' : '#CCCCCC',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
        '--map-icon-color': isDark ? '#666666' : '#CCCCCC',
        '--btn-sec-bg':    isDark ? '#1A1A24' : '#F1F1F1',
        '--btn-sec-border': isDark ? '#3A3A48' : '#CCCCCC',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <Image src="/icons/location-pink.png" alt="Venue icon" width={12} height={12} />
            <span className={styles.eyebrowText}>{t('eyebrow')}</span>
          </div>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>

        {/* Two column layout */}
        <div className={styles.grid}>
          {/* Map */}
          <div className={styles.mapBox}>
            <div className={styles.mapPlaceholder}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Map View</span>
            </div>
            <div className={styles.coordsBadge}>18.4655 N, 69.9406 W</div>
            <div className={styles.zoomBadge}>zoom 15x</div>
          </div>

          {/* Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoTag}>
              <div className={styles.infoTagDot} />
              <span className={styles.infoTagText}>NOV 25, 2023 8:30 AM</span>
            </div>

            <div className={styles.venueBlock}>
              <p className={styles.venueLabel}>{t('venueLabel')}</p>
              <h3 className={styles.venueName}>Universidad UNIBE</h3>
            </div>

            <div className={styles.addressBlock}>
              <p className={styles.addressLabel}>{t('addressLabel')}</p>
              <p className={styles.addressText}>
                Av. Francisco Prats Ramirez 210<br />
                Ensanche Piantini, Santo Domingo<br />
                Dominican Republic
              </p>
            </div>

            <div className={styles.divider} />

            <div className={styles.nearbyBlock}>
              <p className={styles.nearbyLabel}>{t('nearbyLabel')}</p>
              <div className={styles.nearbyItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M2 6h16M6 6v-2c0-1 0-2 2-2h0c2 0 2 1 2 2v2M6 6v10M18 6v10M3 16h2M19 16h2M3 20h18"></path>
                </svg>
                <span className={styles.nearbyText}>OMSA bus stop 3 min walk</span>
              </div>
              <div className={styles.nearbyItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M18 8h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1M9 4h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z"></path>
                </svg>
                <span className={styles.nearbyText}>Free parking for attendees</span>
              </div>
              <div className={styles.nearbyItem}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M3 11h18M3 11v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M18 12h2a1 1 0 0 1 0 2h-2"></path>
                </svg>
                <span className={styles.nearbyText}>Cafes and restaurants in Piantini</span>
              </div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.dirBtn}>
                <Image src="/icons/direction.png" alt="Directions icon" width={14} height={14} />
                {t('directionsBtn')}
              </button>
              <button className={styles.shareBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                {t('shareBtn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
