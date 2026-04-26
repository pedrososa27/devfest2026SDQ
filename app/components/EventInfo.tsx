'use client';

import { useDarkMode } from '../hooks/useDarkMode';
import Image from 'next/image';

export default function EventInfo() {
  const isDark = useDarkMode();

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

  return (
    <>
      {/* Event Info Cards */}
      <section
        style={{
          backgroundColor: isDark ? '#13131A' : '#FAF9F5',
          padding: '72px 120px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {cards.map((card, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: isDark ? '#16161F' : '#FFFFFF',
                borderColor: isDark ? '#2A2A35' : '#E5E5E5',
                borderWidth: '1px',
                borderRadius: '8px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: `${card.iconColor}1A`,
                  borderColor: `${card.iconColor}40`,
                  borderWidth: '1px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                 <Image
            src={`/icons/${card.icon}.png`}
            alt={`${card.label} icon`}
            width={22}
            height={22}
          />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    color: isDark ? '#6B6B75' : '#757575',
                    textTransform: 'uppercase',
                  }}
                >
                  {card.label}
                </span>
                <h3
                  style={{
                    fontFamily: 'Geist, system-ui',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: isDark ? '#FFFFFF' : '#141413',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: 'Inter, system-ui',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: isDark ? '#A1A1AA' : '#47362C',
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          backgroundColor: isDark ? '#0A0A0F' : '#FFFFFF',
          padding: '64px 120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: isDark ? '#2A2A35' : '#E5E5E5',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: isDark ? '#2A2A35' : '#E5E5E5',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '0px',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {[
            { num: '2', label: 'DAYS', color: '#A855F7' },
            { num: '2', label: 'TRACKS', color: '#22D3EE' },
            { num: '25+', label: 'TALKS', color: '#EC4899' },
            { num: '30+', label: 'SPEAKERS', color: '#A855F7' },
            { num: '500+', label: 'ATTENDEES / DAY', color: '#22D3EE' },
          ].map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  flex: 1,
                  textAlign: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '56px',
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {stat.num}
                </span>
                <span
                  style={{
                    fontFamily: 'Geist Mono, monospace',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    color: isDark ? '#A1A1AA' : '#47362C',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.label}
                </span>
              </div>
              {idx < 4 && (
                <div
                  style={{
                    width: '1px',
                    height: '80px',
                    backgroundColor: isDark ? '#2A2A35' : '#E5E5E5',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
