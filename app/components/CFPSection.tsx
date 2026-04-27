'use client';

import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function CFPSection() {
  const { isDark } = useTheme();
  const isMobile = useBreakpoint();

  const getColor = (dark: string, light: string) => isDark ? dark : light;

  const topics = [
    { name: 'Artificial Intelligence & ML', icon: 'ML', color: '#A855F7' },
    { name: 'Cybersecurity', icon: 'cyber', color: '#34A853' },
    { name: 'Testing & Quality', icon: 'testing', color: '#FF4444' },
    { name: 'Data Engineering', icon: 'data', color: '#FCD34D' },
    { name: 'UI/UX Design', icon: 'ux', color: '#EC4899' },
    { name: 'Software Development', icon: 'dev', color: '#22D3EE' },
  ];


  return (
    <section style={{
      backgroundColor: getColor('#13131A', '#FAF9F5'),
      paddingTop: isMobile ? '48px' : '80px',
      paddingBottom: isMobile ? '48px' : '80px',
      paddingLeft: isMobile ? '20px' : '25%',
      paddingRight: isMobile ? '20px' : '25%',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* CFP Card */}
        <div style={{
          borderRadius: '16px',
          backgroundColor: getColor('#16161F', '#FFFFFF'),
          border: `1px solid #A855F7`,
          overflow: 'hidden',
          width: '100%',
          boxShadow: `0 8px 40px rgba(168, 85, 247, 0.2)`,
        }}>
          {/* Terminal-style top bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: getColor('#16161F', '#F5F5F5'),
            borderBottom: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
            padding: '12px 20px',
          }}>
            {/* Window control dots */}
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FF4444',
            }}></div>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FCD34D',
            }}></div>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#34A853',
            }}></div>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: 'transparent',
            }}></div>
            <span style={{
              fontSize: '12px',
              fontWeight: 400,
              color: getColor('#6B6B75', '#757575'),
              fontFamily: 'Geist Mono',
            }}>
              ~/devfest-sdq/speakers
            </span>
          </div>

          {/* Content */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 420px',
            gap: isMobile ? '32px' : '48px',
            padding: isMobile ? '28px 24px' : '56px 64px',
            alignItems: 'start',
          }}>
            {/* Left side */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {/* Pill Badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '9999px',
                backgroundColor: getColor('#16161F', '#F5F5F5'),
                border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
                padding: '6px 14px',
                width: 'fit-content',
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#22D3EE',
                }}></div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '1.2px',
                  color: '#22D3EE',
                  fontFamily: 'Geist Mono',
                }}>
                  CALL FOR PAPERS // OPEN
                </span>
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: isMobile ? '32px' : '52px',
                fontWeight: 700,
                letterSpacing: isMobile ? '-0.8px' : '-1.5px',
                lineHeight: 1.05,
                color: getColor('#FFFFFF', '#141413'),
                fontFamily: 'Geist',
                margin: 0,
              }}>
                Got something to share?
              </h2>

              {/* Terminal */}
              <div style={{
                borderRadius: '8px',
                border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
                backgroundColor: getColor('#0A0A0F', '#F5F5F5'),
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'Geist Mono',
                fontSize: '14px',
              }}>
                <span style={{ color: '#22D3EE', fontWeight: 600 }}>$</span>
                <span style={{
                  color: getColor('#FFFFFF', '#141413'),
                  fontWeight: 500,
                }}>submit --talk --deadline="Oct 15, 2023"</span>
                <div style={{
                  width: '9px',
                  height: '17px',
                  backgroundColor: '#22D3EE',
                  animation: 'blink 0.7s infinite',
                }}></div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '16px',
                fontWeight: 400,
                color: getColor('#A1A1AA', '#47362C'),
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Submit your talk proposal and be part of the biggest GDG event in the Caribbean. We're looking for talks on AI, Cybersecurity, Testing, Data, UI/UX, and anything pushing tech forward.
              </p>

              {/* Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                alignItems: isMobile ? 'stretch' : 'center',
              }}>
                <button style={{
                  borderRadius: '9999px',
                  backgroundColor: '#A855F7',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}>
                  <span>Submit your talk</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <button style={{
                  borderRadius: '9999px',
                  backgroundColor: 'transparent',
                  border: `1px solid ${getColor('#3A3A48', '#CCCCCC')}`,
                  color: getColor('#FFFFFF', '#141413'),
                  padding: '14px 24px',
                  fontSize: '15px',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                }}>
                  Speaker Guide
                </button>
              </div>
            </div>

            {/* Right side - Proposal */}
            <div style={{
              borderRadius: '12px',
              backgroundColor: getColor('#0A0A0F', '#FFFFFF'),
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
            }}>
              {/* File header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
                paddingBottom: '12px',
              }}>
                <Image src="/icons/proposal.png" alt="File icon" width={16} height={16} />
                <span style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: getColor('#A1A1AA', '#47362C'),
                  fontFamily: 'Geist Mono',
                }}>
                  proposal.md
                </span>
              </div>

              {/* Topics Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: getColor('#6B6B75', '#757575'),
                  fontFamily: 'IBM Plex Mono',
                }}>01</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#22D3EE',
                  fontFamily: 'Geist Mono',
                }}>
                  # Topics we love
                </span>
              </div>

              {/* Topics List */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                {topics.map((topic, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                   <Image src={`/icons/${topic.icon}.png`} alt={topic.name} width={14} height={14} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: getColor('#FFFFFF', '#141413'),
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {topic.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Deadline */}
              <div style={{
                borderRadius: '8px',
                backgroundColor: getColor('#16161F', '#F5F5F5'),
                padding: '12px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
              }}>
                <Image src="/icons/submisions.png" alt="Clock alert icon" width={16} height={16} />
                <span style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: getColor('#A1A1AA', '#47362C'),
                  fontFamily: 'Geist Mono',
                }}>
                  Submissions close Oct 15, 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
