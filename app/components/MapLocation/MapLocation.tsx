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
            <iframe
              className={styles.mapIframe}
              title="Venue location"
              src="https://maps.google.com/maps?q=C. César Nicolás Penson 91, Santo Domingo 20711&output=embed&z=16"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className={styles.coordsBadge}>18.4703 N, 69.9213 W</div>
            <div className={styles.zoomBadge}>zoom 16x</div>
          </div>

          {/* Info */}
          <div className={styles.infoCard}>
            <div className={styles.infoTag}>
              <div className={styles.infoTagDot} />
              <span className={styles.infoTagText}>{t('eventDate')}</span>
            </div>

            <div className={styles.venueBlock}>
              <p className={styles.venueLabel}>{t('venueLabel')}</p>
              <h3 className={styles.venueName}>{t('venueName')}</h3>
            </div>

            <div className={styles.addressBlock}>
              <p className={styles.addressLabel}>{t('addressLabel')}</p>
              <p className={styles.addressText}>
                {t('addressLine1')}<br />
                {t('addressLine2')}<br />
                {t('addressLine3')}
              </p>
            </div>

            <div className={styles.divider} />

            <div className={styles.nearbyBlock}>
              <p className={styles.nearbyLabel}>{t('nearbyLabel')}</p>
              <div className={styles.nearbyItem}>

                <Image src="/icons/omsa.png" alt="Directions icon" width={14} height={14} />
                <span className={styles.nearbyText}>{t('nearbyBus')}</span>
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
