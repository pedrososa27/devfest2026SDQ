'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './Sponsors.module.scss';
import { createClient } from '../../../lib/supabase/client';
import type { Sponsor } from '../../../lib/supabase/types';

const TIER_ORDER: Sponsor['tier'][] = ['platinum', 'gold', 'silver', 'bronze', 'community'];

const TIER_ICONS: Record<Sponsor['tier'], string> = {
  platinum:  'platIcon',
  gold:      'goldIcon',
  silver:    'silverIcon',
  bronze:    'silverIcon',
  community: 'partIcon',
};

const TIER_HEIGHTS: Record<Sponsor['tier'], number> = {
  platinum:  110,
  gold:      90,
  silver:    72,
  bronze:    60,
  community: 60,
};

const TIER_FONT: Record<Sponsor['tier'], number> = {
  platinum:  18,
  gold:      15,
  silver:    13,
  bronze:    12,
  community: 12,
};

export default function Sponsors() {
  const { isDark } = useTheme();
  const t = useTranslations('sponsors');
  const [dbSponsors, setDbSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('sponsors')
      .select('*')
      .eq('active', true)
      .order('tier')
      .order('display_order')
      .then(({ data }) => { if (data) setDbSponsors(data); });
  }, []);

  // Group sponsors by tier (only tiers that have at least one sponsor)
  const tiers = TIER_ORDER
    .map((tier) => ({
      tier,
      icon:      TIER_ICONS[tier],
      label:     tier.toUpperCase(),
      height:    TIER_HEIGHTS[tier],
      fontSize:  TIER_FONT[tier],
      sponsors:  dbSponsors.filter((s) => s.tier === tier),
    }))
    .filter((g) => g.sponsors.length > 0);

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
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className={styles.tiers}>
          {tiers.map((tier) => (
            <div key={tier.tier} className={styles.tier}>
              <div className={styles.tierHeader}>
                <Image src={`/icons/${tier.icon}.png`} alt={`${tier.label} icon`} width={18} height={18} />
                <span className={styles.tierLabel}>{tier.label}</span>
                <div className={styles.tierDivider} />
                <span className={styles.tierCount}>{String(tier.sponsors.length).padStart(2, '0')}</span>
              </div>
              <div
                className={styles.sponsorGrid}
                style={{ gridTemplateColumns: `repeat(${tier.sponsors.length}, 1fr)` }}
              >
                {tier.sponsors.map((sponsor) => (
                  <a
                    key={sponsor.id}
                    href={sponsor.website_url ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.sponsorCard}
                    style={{ height: tier.height, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {sponsor.logo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sponsor.logo_url}
                        alt={sponsor.name}
                        style={{ maxHeight: tier.height * 0.55, maxWidth: '80%', objectFit: 'contain' }}
                      />
                    ) : (
                      <span className={styles.sponsorName} style={{ fontSize: tier.fontSize }}>
                        {sponsor.name}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
          {tiers.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--fg-dim)', fontSize: 14 }}>
              Los sponsors se anunciarán pronto.
            </p>
          )}
        </div>

        {/* Become a Sponsor */}
        <button className={styles.sponsorBtn}>
          <span>{t('becomeBtn')}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
