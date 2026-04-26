'use client';

import Image from 'next/image';
import { useDarkMode } from '../hooks/useDarkMode';

export default function PastTalks() {
  const isDark = useDarkMode();

  const talks = [
    { 
      title: 'Building scalable AI pipelines with Vertex',
      speaker: 'María Reyes',
      duration: '42:15',
      year: '2022',
      avatar: '#22D3EE' // $neon-cyan
    },
    { 
      title: 'Pentesting 101: Breaking & defending APIs',
      speaker: 'Carlos Vásquez',
      duration: '38:02',
      year: '2023',
      avatar: '#EC4899' // $neon-pink
    },
    { 
      title: 'Figma to Flutter: shipping UI faster',
      speaker: 'Laura Méndez',
      duration: '29:47',
      year: '2022',
      avatar: '#34A853' // $accent-green
    },
    { 
      title: 'Testing like a senior: TDD in the AI era',
      speaker: 'Diego Núñez',
      duration: '45:30',
      year: '2021',
      avatar: '#FBBC04' // $accent-yellow
    },
  ];

  return (
    <section style={{
      backgroundColor: isDark ? '#0A0A0F' : '#FFFFFF',
      paddingTop: '80px',
      paddingBottom: '80px',
      paddingLeft: '120px',
      paddingRight: '120px',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#A855F7',
              }}></div>
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '2px',
                color: '#A855F7',
                fontFamily: 'Geist Mono',
                textTransform: 'uppercase',
              }}>
                // ARCHIVE
              </span>
            </div>
            <h2 style={{
              fontSize: '48px',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: isDark ? '#FFFFFF' : '#141413',
              fontFamily: 'Geist',
              margin: 0,
            }}>
              Talks from past editions
            </h2>
            <p style={{
              fontSize: '16px',
              fontWeight: 400,
              color: isDark ? '#A1A1AA' : '#47362C',
              fontFamily: 'Inter, system-ui',
              margin: 0,
              maxWidth: '560px',
              lineHeight: 1.5,
            }}>
              Relive the best moments from DevFest Santo Domingo — deep dives, lightning talks, and code walkthroughs.
            </p>
          </div>
          
          {/* Navigation buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <button style={{
              width: '44px',
              height: '44px',
              borderRadius: '9999px',
              border: `1px solid ${isDark ? '#3A3A48' : '#CCCCCC'}`,
              backgroundColor: 'transparent',
              color: isDark ? '#FFFFFF' : '#141413',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button style={{
              width: '44px',
              height: '44px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: '#A855F7',
              color: '#0A0A0F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          width: '100%',
        }}>
          {talks.map((talk, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '8px',
                backgroundColor: isDark ? '#16161F' : '#FFFFFF',
                border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                padding: '0 0 16px 0',
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '160px',
                backgroundColor: isDark ? '#0F0F15' : '#E5E5E5',
                borderRadius: '8px 8px 0 0',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {/* Year tag */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: '#A855F7',
                  color: '#0A0A0F',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  fontFamily: 'Geist Mono',
                  zIndex: 2,
                }}>
                  {talk.year}
                </div>

                {/* Duration badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(10, 10, 15, 0.8)',
                  color: isDark ? '#FFFFFF' : '#141413',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  fontFamily: 'IBM Plex Mono',
                  zIndex: 2,
                }}>
                  {talk.duration}
                </div>

                {/* Play button */}
                <div style={{
                  position: 'absolute',
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 3,
                }}>
                  <span style={{ fontSize: '24px' }}>▶</span>
                </div>

                {/* Placeholder image */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(135deg, ${talk.avatar}33 0%, ${talk.avatar}11 100%)`,
                }}></div>
              </div>

              {/* Card body */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '4px 16px 0 16px',
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: isDark ? '#FFFFFF' : '#141413',
                  margin: 0,
                  lineHeight: 1.3,
                  fontFamily: 'Geist',
                }}>
                  {talk.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '9999px',
                    backgroundColor: talk.avatar,
                  }}></div>
                  <span style={{
                    fontSize: '13px',
                    color: isDark ? '#A1A1AA' : '#47362C',
                    fontFamily: 'Inter, system-ui',
                    fontWeight: 400,
                  }}>
                    {talk.speaker}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with YouTube link */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
          paddingTop: '20px',
          width: '100%',
        }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 400,
            color: isDark ? '#6B6B75' : '#757575',
            fontFamily: 'Geist Mono',
          }}>
            24 talks archived across 3 editions
          </span>
          <a href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: isDark ? '#22D3EE' : '#0891B2',
            textDecoration: 'none',
            fontFamily: 'Inter, system-ui',
            fontSize: '14px',
            fontWeight: 500,
          }}>
            {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg> */}
            <Image src="/icons/ytblue.png" alt="YouTube icon" width={16} height={16} />
            <span>See all on YouTube</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
