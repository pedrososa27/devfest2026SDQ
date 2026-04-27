'use client';

import { useTheme } from '../../context/ThemeContext';
import Image from 'next/image';
import styles from './EventInfo.module.scss';

export default function EventInfo() {
  const { isDark } = useTheme();

  const cards = [
    {
      label: '// DATE',
      title: 'November 18-19',
      description: 'Two full days of tech talks, workshops, and networking with the local community.',
      iconColor: '#A855F7',
      icon: 'schedule-purple',
    },
    {
      label: '// VENUE',
      title: 'Universidad UNIBE',
      description: 'Santo Domingo, Dominican Republic — accessible campus with modern auditoriums.',
      iconColor: '#22D3EE',
      icon: 'location',
    },
    {
      label: '// FORMAT',
      title: 'In-person + Streaming',
      description: 'Attend live on campus or join remotely through our official YouTube live stream.',
      iconColor: '#EC4899',
      icon: 'red',
    },
  ];

  const stats = [
    { num: '2', label: 'DAYS', color: '#A855F7' },
    { num: '2', label: 'TRACKS', color: '#22D3EE' },
    { num: '25+', label: 'TALKS', color: '#EC4899' },
    { num: '30+', label: 'SPEAKERS', color: '#A855F7' },
    { num: '500+', label: 'ATTENDEES / DAY', color: '#22D3EE' },
  ];

  return (
    <>
      {/* Event Info Cards */}
      <section
        className={styles.cardsSection}
        style={{
          '--bg-section':   isDark ? '#13131A' : '#FAF9F5',
          '--bg-card':      isDark ? '#16161F' : '#FFFFFF',
          '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
          '--fg-primary':   isDark ? '#FFFFFF'  : '#141413',
          '--fg-muted':     isDark ? '#A1A1AA' : '#47362C',
          '--fg-dim':       isDark ? '#6B6B75' : '#757575',
        } as React.CSSProperties}
      >
        <div className={styles.cardsGrid}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={styles.card}
              style={{ '--icon-color': card.iconColor } as React.CSSProperties}
            >
              <div className={styles.cardIcon}>
                <Image src={`/icons/${card.icon}.png`} alt={`${card.label} icon`} width={22} height={22} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardLabel}>{card.label}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
              </div>
              <p className={styles.cardDescription}>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={styles.statsSection}
        style={{
          '--bg-primary':    isDark ? '#0A0A0F' : '#FFFFFF',
          '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
          '--fg-label':      isDark ? '#A1A1AA' : '#47362C',
        } as React.CSSProperties}
      >
        <div className={styles.statsRow}>
          {stats.map((stat, idx) => (
            <div key={idx} className={styles.statItem}>
              <div className={styles.statCell}>
                <span className={styles.statNum} style={{ color: stat.color }}>{stat.num}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
              {idx < stats.length - 1 && <div className={styles.statDivider} />}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
