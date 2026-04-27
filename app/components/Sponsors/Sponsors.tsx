'use client';

import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import styles from './Sponsors.module.scss';

export default function Sponsors() {
  const { isDark } = useTheme();

  const tiers = [
    {
      icon: 'diamondIcon',
      label: 'DIAMOND',
      count: '01',
      sponsors: [
        { name: 'google.cloud', height: 140, fontSize: 22 },
        { name: 'Claro', height: 140, fontSize: 22 },
      ],
    },
    {
      icon: 'platIcon',
      label: 'PLATINUM',
      count: '03',
      sponsors: [
        { name: 'Microsoft', height: 110, fontSize: 18 },
        { name: 'Altice', height: 110, fontSize: 18 },
        { name: 'Globant', height: 110, fontSize: 18 },
      ],
    },
    {
      icon: 'goldIcon',
      label: 'GOLD',
      count: '04',
      sponsors: [
        { name: 'GitHub', height: 90, fontSize: 15 },
        { name: 'JetBrains', height: 90, fontSize: 15 },
        { name: 'MongoDB', height: 90, fontSize: 15 },
        { name: 'Vercel', height: 90, fontSize: 15 },
      ],
    },
    {
      icon: 'silverIcon',
      label: 'SILVER',
      count: '05',
      sponsors: [
        { name: 'DataStax', height: 72, fontSize: 13 },
        { name: 'Auth0', height: 72, fontSize: 13 },
        { name: 'Firebase', height: 72, fontSize: 13 },
        { name: 'Stripe', height: 72, fontSize: 13 },
        { name: 'Twilio', height: 72, fontSize: 13 },
      ],
    },
    {
      icon: 'partIcon',
      label: 'PARTNERS',
      count: '06',
      sponsors: [
        { name: 'UNIBE', height: 60, fontSize: 12 },
        { name: 'INTEC', height: 60, fontSize: 12 },
        { name: 'ITLA', height: 60, fontSize: 12 },
        { name: 'PUCMM', height: 60, fontSize: 12 },
        { name: 'INDOTEL', height: 60, fontSize: 12 },
        { name: 'MESCYT', height: 60, fontSize: 12 },
      ],
    },
  ];

  return (
    <section
      className={styles.section}
      style={{
        '--bg-primary':    isDark ? '#0A0A0F' : '#FFFFFF',
        '--bg-section':    isDark ? '#13131A' : '#FAF9F5',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <div className={styles.badgeDot} />
            <span className={styles.badgeText}>// POWERED BY</span>
          </div>
          <h2 className={styles.title}>Our Sponsors</h2>
          <p className={styles.subtitle}>
            Meet the companies making DevFest Santo Domingo possible.
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className={styles.tiers}>
          {tiers.map((tier, tierIdx) => (
            <div key={tierIdx} className={styles.tier}>
              <div className={styles.tierHeader}>
                <Image src={`/icons/${tier.icon}.png`} alt={`${tier.label} icon`} width={18} height={18} />
                <span className={styles.tierLabel}>{tier.label}</span>
                <div className={styles.tierDivider} />
                <span className={styles.tierCount}>{tier.count}</span>
              </div>
              <div
                className={styles.sponsorGrid}
                style={{ gridTemplateColumns: `repeat(${tier.sponsors.length}, 1fr)` }}
              >
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    className={styles.sponsorCard}
                    style={{ height: sponsor.height }}
                  >
                    <span className={styles.sponsorName} style={{ fontSize: sponsor.fontSize }}>
                      {sponsor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor */}
        <button className={styles.sponsorBtn}>
          <span>Become a Sponsor</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
