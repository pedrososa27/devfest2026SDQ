'use client';

import Image from 'next/image';
import { useDarkMode } from '../hooks/useDarkMode';

export default function MapLocation() {
  const isDark = useDarkMode();

  const getColor = (dark:any, light:any) => isDark ? dark : light;

  return (
    <section style={{
      backgroundColor: getColor('#13131A', '#FAF9F5'),
      paddingTop: '80px',
      paddingBottom: '80px',
      paddingLeft: '120px',
      paddingRight: '120px',
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '40px',
        width: '100%',
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px', 
          width: '100%' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Image src="/icons/location-pink.png" alt="Venue icon" width={12} height={12} />
            <span style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '2px',
              color: '#EC4899',
              fontFamily: 'Geist Mono',
            }}>
              // VENUE
            </span>
          </div>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: getColor('#FFFFFF', '#141413'),
            fontFamily: 'Geist',
            margin: 0,
          }}>
            Find us in Santo Domingo
          </h2>
        </div>

        {/* Map and info two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          width: '100%',
        }}>
          {/* Map */}
          <div style={{
            borderRadius: '8px',
            border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
            overflow: 'hidden',
            height: '420px',
            position: 'relative',
            backgroundColor: getColor('#0A0A0F', '#F8F8F8'),
            backgroundImage: `linear-gradient(135deg, ${getColor('#1A1A2E', '#F0F0F0')} 0%, ${getColor('#13131A', '#FFFFFF')} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: getColor('#666666', '#CCCCCC'),
            fontSize: '14px',
          }}>
            {/* Map placeholder - in production this would be an actual map image */}
            <div style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Map View</span>
            </div>

            {/* Overlays for map (coordinates, zoom info) */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              backgroundColor: 'rgba(10, 10, 15, 0.8)',
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              color: '#22D3EE',
              fontFamily: 'IBM Plex Mono',
            }}>
              18.4655° N, 69.9406° W
            </div>

            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              backgroundColor: 'rgba(10, 10, 15, 0.8)',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '10px',
              color: getColor('#6B6B75', '#757575'),
              fontFamily: 'Geist Mono',
            }}>
              zoom · 15x
            </div>
          </div>

          {/* Info Column */}
          <div style={{
            borderRadius: '8px',
            border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
            backgroundColor: getColor('#16161F', '#FFFFFF'),
            padding: '32px',
            gap: '24px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Info tag */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: getColor('#1A1A24', '#F1F1F1'),
              padding: '4px 10px',
              borderRadius: '4px',
              width: 'fit-content',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#34A853',
              }}></div>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '1px',
                color: getColor('#FFFFFF', '#141413'),
                fontFamily: 'Geist Mono',
              }}>
                NOV 25, 2023 · 8:30 AM
              </span>
            </div>

            {/* Venue name */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: getColor('#6B6B75', '#757575'),
                fontFamily: 'Geist Mono',
                margin: 0,
              }}>
                VENUE
              </p>
              <h3 style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                color: getColor('#FFFFFF', '#141413'),
                fontFamily: 'Geist',
                margin: 0,
              }}>
                Universidad UNIBE
              </h3>
            </div>

            {/* Address */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: getColor('#6B6B75', '#757575'),
                fontFamily: 'Geist Mono',
                margin: 0,
              }}>
                ADDRESS
              </p>
              <p style={{
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: getColor('#A1A1AA', '#47362C'),
                fontFamily: 'Inter, sans-serif',
                margin: 0,
              }}>
                Av. Francisco Prats Ramírez #210<br />
                Ensanche Piantini, Santo Domingo<br />
                Dominican Republic
              </p>
            </div>

            {/* Divider */}
            <div style={{
              height: '1px',
              backgroundColor: getColor('#2A2A35', '#E5E5E5'),
            }}></div>

            {/* Nearby */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}>
              <p style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '2px',
                color: getColor('#6B6B75', '#757575'),
                fontFamily: 'Geist Mono',
                margin: 0,
              }}>
                NEARBY
              </p>

              {/* Bus */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M2 6h16M6 6v-2c0-1 0-2 2-2h0c2 0 2 1 2 2v2M6 6v10M18 6v10M3 16h2M19 16h2M3 20h18"></path>
                </svg>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: getColor('#A1A1AA', '#47362C'),
                  fontFamily: 'Inter, sans-serif',
                }}>
                  OMSA bus stop · 3 min walk
                </span>
              </div>

              {/* Car */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M18 8h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1M9 4h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2z"></path>
                </svg>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: getColor('#A1A1AA', '#47362C'),
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Free parking for attendees
                </span>
              </div>

              {/* Coffee */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                  <path d="M3 11h18M3 11v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M18 12h2a1 1 0 0 1 0 2h-2"></path>
                </svg>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  color: getColor('#A1A1AA', '#47362C'),
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Cafés & restaurants in Piantini
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: '8px',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              {/* Get directions button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '9999px',
                backgroundColor: '#A855F7',
                color: '#0A0A0F',
                border: 'none',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: 'Geist',
                cursor: 'pointer',
                flex: 1,
              }}>
                  <Image src="/icons/direction.png" alt="Directions icon" width={14} height={14} />
                Get directions
              </button>

              {/* Share button */}
              <button style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 14px',
                borderRadius: '9999px',
                backgroundColor: getColor('#1A1A24', '#F1F1F1'),
                color: getColor('#FFFFFF', '#141413'),
                border: `1px solid ${getColor('#3A3A48', '#CCCCCC')}`,
                fontSize: '14px',
                fontWeight: 600,
                fontFamily: 'Geist',
                cursor: 'pointer',
                flexShrink: 0,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
