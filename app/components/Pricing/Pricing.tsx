'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './Pricing.module.scss';

export default function Pricing() {
  const { isDark } = useTheme();
  const t = useTranslations('pricing');

  const tickets = [
    {
      label: t('student.label'),
      labelColor: '#22D3EE',
      name: t('student.name'),
      price: 'Free',
      priceNote: t('student.priceNote'),
      features: [
        { text: t('student.f1'), included: true },
        { text: t('student.f2'), included: true },
        { text: t('student.f3'), included: true },
        { text: t('student.f4'), included: true },
        { text: t('student.f5'), included: false },
      ],
      button: t('student.btn'),
      buttonStyle: 'secondary' as const,
      buttonBorderColor: isDark ? '#3A3A48' : '#CCCCCC',
      featureIconColor: '#22D3EE',
      highlighted: false,
    },
    {
      flag: t('popular'),
      flagBg: '#A855F7',
      label: t('general.label'),
      labelColor: '#A855F7',
      name: t('general.name'),
      price: '$25',
      priceNote: t('general.priceNote'),
      features: [
        { text: t('general.f1'), included: true },
        { text: t('general.f2'), included: true },
        { text: t('general.f3'), included: true },
        { text: t('general.f4'), included: true },
        { text: t('general.f5'), included: false },
      ],
      button: t('general.btn'),
      buttonStyle: 'primary' as const,
      featureIconColor: '#A855F7',
      highlighted: true,
    },
    {
      label: t('supporter.label'),
      labelColor: '#EC4899',
      name: t('supporter.name'),
      price: '$75',
      priceNote: t('supporter.priceNote'),
      features: [
        { text: t('supporter.f1'), included: true },
        { text: t('supporter.f2'), included: true },
        { text: t('supporter.f3'), included: true },
        { text: t('supporter.f4'), included: true },
      ],
      button: t('supporter.btn'),
      buttonStyle: 'supporter' as const,
      featureIconColor: '#EC4899',
      highlighted: false,
    },
  ];

  return (
    <section
      className={styles.section}
      style={{
        '--bg-primary':    isDark ? '#0A0A0F' : '#FFFFFF',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--bg-btn-sec':    isDark ? '#1A1A24' : '#F1F1F1',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
        '--fg-dollar':     isDark ? '#A1A1AA' : '#47362C',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.eyebrowDot} />
            <span className={styles.eyebrowText}>{t('eyebrow')}</span>
          </div>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>
            {t('subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              className={`${styles.card} ${ticket.highlighted ? styles.cardHighlighted : ''}`}
              style={{
                '--label-color': ticket.labelColor,
                boxShadow: ticket.highlighted ? 'rgba(168, 85, 247, 0.2) 0px 8px 40px' : 'none',
              } as React.CSSProperties}
            >
              {ticket.flag && (
                <div className={styles.flag} style={{ backgroundColor: ticket.flagBg }}>
                  <Image src="/icons/popularIcon.png" alt="Flag" width={16} height={16} />
                  <span className={styles.flagText}>{ticket.flag}</span>
                </div>
              )}

              <div className={styles.labelRow}>
                <p className={styles.ticketLabel}>{ticket.label}</p>
                <h3 className={styles.ticketName}>{ticket.name}</h3>
              </div>

              <div className={styles.priceRow}>
                {ticket.price.startsWith('$') && (
                  <span className={styles.priceCurrency}>$</span>
                )}
                <span className={styles.priceNum}>{ticket.price.replace('$', '')}</span>
                <span className={styles.priceNote}>{ticket.priceNote}</span>
              </div>

              <div className={styles.divider} />

              <ul className={styles.featureList}>
                {ticket.features.map((feature, fIdx) => (
                  <li key={fIdx} className={`${styles.featureItem} ${!feature.included ? styles.featureItemDim : ''}`}>
                    {feature.included ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ticket.featureIconColor} strokeWidth="2" className={styles.featureIcon}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`${styles.featureIcon} ${styles.featureIconDim}`}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className={
                  ticket.buttonStyle === 'primary' ? styles.btnPrimary :
                  ticket.buttonStyle === 'supporter' ? styles.btnSupporter :
                  styles.btnSecondary
                }
                style={ticket.buttonStyle === 'secondary' ? { '--btn-border': ticket.buttonBorderColor } as React.CSSProperties : undefined}
              >
                {ticket.button}
                {ticket.buttonStyle === 'primary' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
