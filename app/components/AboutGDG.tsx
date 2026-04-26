'use client';

import Image from 'next/image';
import { useDarkMode } from '../hooks/useDarkMode';

export default function AboutGDG() {
  const isDark = useDarkMode();

  return (
    <section style={{
      backgroundColor: isDark ? '#13131A' : '#FAF9F5',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '2px',
                color: '#22D3EE',
                fontFamily: 'Geist Mono',
                textTransform: 'uppercase',display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
               <Image src="/icons/tagIcon.png" alt="About icon" width={12} height={12} /> // ABOUT
              </span>
            </div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: 700,
              letterSpacing: '-1px',
              color: isDark ? '#FFFFFF' : '#141413',
              fontFamily: 'Geist',
              margin: 0,
              lineHeight: 1.1,
            }}>
              Community-powered. Globally connected.
            </h2>
          </div>
          
          {/* Stats badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
            backgroundColor: isDark ? '#16161F' : '#FFFFFF',
            padding: '12px 20px',
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#A855F7',
              fontFamily: 'IBM Plex Mono',
            }}>
              500+
            </span>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: isDark ? '#FFFFFF' : '#141413',
                fontFamily: 'Inter',
              }}>
                Global DevFests
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 400,
                color: isDark ? '#6B6B75' : '#757575',
                fontFamily: 'Geist Mono',
              }}>
                across 100+ countries
              </span>
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          width: '100%',
        }}>
          {/* DevFest Column */}
          <div style={{
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
            backgroundColor: isDark ? '#16161F' : '#FFFFFF',
            padding: '32px',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#A855F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>
                <Image src="/icons/schedule-white.png" alt="DevFest icon" width={24} height={24} />
              </span>
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: isDark ? '#FFFFFF' : '#141413',
              fontFamily: 'Geist',
              margin: 0,
            }}>
              What is DevFest?
            </h3>
            <p style={{
              fontSize: '15px',
              fontWeight: 400,
              color: isDark ? '#A1A1AA' : '#47362C',
              fontFamily: 'Inter',
              lineHeight: 1.6,
              margin: 0,
            }}>
              DevFest is the annual tech conference organized by Google Developer Groups around the world. Each edition brings together developers, designers, and tech enthusiasts to explore the latest in Android, Web, Cloud, AI/ML, and community-driven technology.
            </p>
            <div style={{
              borderRadius: '4px',
              backgroundColor: isDark ? '#0A0A0F' : '#F1F1F1',
              padding: '10px 14px',
              fontFamily: 'Geist Mono',
              fontSize: '13px',
              color: isDark ? '#FFFFFF' : '#141413',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ color: '#A855F7', fontWeight: 700 }}>&gt;</span>
              <span>devfest.withgoogle.com</span>
            </div>
          </div>

          {/* GDG Column */}
          <div style={{
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
            backgroundColor: isDark ? '#16161F' : '#FFFFFF',
            padding: '32px',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              backgroundColor: '#22D3EE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '24px' }}>
                <Image src="/icons/gdgIcon.png" alt="GDG icon" width={24} height={24} />
              </span>
            </div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: isDark ? '#FFFFFF' : '#141413',
              fontFamily: 'Geist',
              margin: 0,
            }}>
              What is a GDG?
            </h3>
            <p style={{
              fontSize: '15px',
              fontWeight: 400,
              color: isDark ? '#A1A1AA' : '#47362C',
              fontFamily: 'Inter',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Google Developer Groups are community-run chapters for developers interested in Google technologies. GDG Santo Domingo is the local chapter for the Dominican Republic — we host meetups, workshops, study jams, and of course, DevFest.
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                borderRadius: '4px',
                backgroundColor: isDark ? '#0A0A0F' : '#F1F1F1',
                padding: '8px 12px',
              }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#4285F4',
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#EA4335',
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#FBBC04',
                }}></div>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#34A853',
                }}></div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isDark ? '#FFFFFF' : '#141413',
                  fontFamily: 'Geist',
                  marginLeft: '4px',
                }}>
                  GDG Santo Domingo
                </span>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: 400,
                color: isDark ? '#6B6B75' : '#757575',
                fontFamily: 'Geist Mono',
              }}>
                1.2k+ members
              </span>
            </div>
          </div>
        </div>

        {/* Meta strip with stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
          paddingTop: '20px',
          width: '100%',
        }}>
          {[
            { num: '03', label: 'Editions hosted' },
            { num: '2.4k', label: 'Attendees to date' },
            { num: '42', label: 'Speakers & workshops' },
            { num: '06', label: 'Tech tracks covered' },
          ].map((stat, idx) => (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <span style={{
                fontSize: '22px',
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#141413',
                fontFamily: 'IBM Plex Mono',
              }}>
                {stat.num}
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '1px',
                color: isDark ? '#6B6B75' : '#757575',
                fontFamily: 'Geist Mono',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
