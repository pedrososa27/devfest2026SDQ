'use client';

import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Sponsors() {
  const { isDark } = useTheme();
  const isMobile = useBreakpoint();

  const getColor = (dark:any, light:any) => isDark ? dark : light;

  const tiers = [
    {
      icon: 'diamondIcon',
      label: 'DIAMOND',
      count: '01',
      labelColor: '#22D3EE',
      sponsors: [
        { name: 'google.cloud', icon: 'cloud', iconColor: '#A855F7', height: 140, fontSize: 22 },
        { name: 'Claro', icon: 'zap', iconColor: '#22D3EE', height: 140, fontSize: 22 },
      ],
    },
    {
      icon: 'platIcon',
      label: 'PLATINUM',
      count: '03',
      labelColor: '#EC4899',
      sponsors: [
        { name: 'Microsoft', icon: 'cpu', iconColor: '#A855F7', height: 110, fontSize: 18 },
        { name: 'Altice', icon: 'circle', iconColor: '#FF4444', height: 110, fontSize: 18 },
        { name: 'Globant', icon: 'box', iconColor: '#FCD34D', height: 110, fontSize: 18 },
      ],
    },
    {
      icon: 'goldIcon',
      label: 'GOLD',
      count: '04',
      labelColor: '#FCD34D',
      sponsors: [
        { name: 'GitHub', icon: 'github', iconColor: getColor('#FFFFFF', '#141413'), height: 90, fontSize: 15 },
        { name: 'JetBrains', icon: 'terminal', iconColor: '#22D3EE', height: 90, fontSize: 15 },
        { name: 'MongoDB', icon: 'database', iconColor: '#34A853', height: 90, fontSize: 15 },
        { name: 'Vercel', icon: 'layers', iconColor: '#EC4899', height: 90, fontSize: 15 },
      ],
    },
    {
      icon: 'silverIcon',
      label: 'SILVER',
      count: '05',
      labelColor: getColor('#A1A1AA', '#47362C'),
      sponsors: [
        { name: 'DataStax', icon: 'globe', iconColor: '#3B82F6', height: 72, fontSize: 13 },
        { name: 'Auth0', icon: 'bot', iconColor: '#A855F7', height: 72, fontSize: 13 },
        { name: 'Firebase', icon: 'flame', iconColor: '#FF4444', height: 72, fontSize: 13 },
        { name: 'Stripe', icon: 'circuit-board', iconColor: '#22D3EE', height: 72, fontSize: 13 },
        { name: 'Twilio', icon: 'package', iconColor: '#FCD34D', height: 72, fontSize: 13 },
      ],
    },
    {
      icon: 'partIcon',
      label: 'PARTNERS',
      count: '06',
      labelColor: '#22D3EE',
      sponsors: [
        { name: 'UNIBE', height: 60, fontSize: 12, isMono: true },
        { name: 'INTEC', height: 60, fontSize: 12, isMono: true },
        { name: 'ITLA', height: 60, fontSize: 12, isMono: true },
        { name: 'PUCMM', height: 60, fontSize: 12, isMono: true },
        { name: 'INDOTEL', height: 60, fontSize: 12, isMono: true },
        { name: 'MESCYT', height: 60, fontSize: 12, isMono: true },
      ],
    },
  ];

  // const getSvgIcon = (iconName:any) => {
  //   const icons = {
  //     cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>',
  //     zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  //     cpu: '<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="5" x2="9" y2="4"></line><line x1="15" y1="5" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="21"></line><line x1="15" y1="20" x2="15" y2="21"></line><line x1="20" y1="9" x2="21" y2="9"></line><line x1="20" y1="14" x2="21" y2="14"></line><line x1="4" y1="9" x2="3" y2="9"></line><line x1="4" y1="14" x2="3" y2="14"></line>',
  //     circle: '<circle cx="12" cy="12" r="10"></circle>',
  //     box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
  //     github: '<path d="M15 22v-4a6.973 6.973 0 0 0-2-5.469A6.972 6.972 0 0 0 21 9v-4a6 6 0 0 0-6-6 6 6 0 0 0-6 6v4a6.973 6.973 0 0 0-2 5.469v4"></path><circle cx="9" cy="9" r="4"></circle>',
  //     terminal: '<polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line>',
  //     database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><line x1="3" y1="12" x2="21" y2="12"></line>',
  //     layers: '<polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2"></polygon><polyline points="2 7 12 12 22 7"></polyline><polyline points="2 17 12 12 22 17"></polyline>',
  //     globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
  //     bot: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 20h10M9 9v2M15 9v2M9 5h1M15 5h1"></path>',
  //     flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 12 12c0-1.38-.5-2-1-3-1.072-2.143-.723-4.139 2-6 .75 2.458.75 6.458 0 9.5 1 0 1.5 1 1 2.5a2.5 2.5 0 0 1-5 .119c-.5-1-.5-1-1-1.5"></path>',
  //     'circuit-board': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="9" cy="9" r="1"></circle><circle cx="15" cy="9" r="1"></circle><circle cx="9" cy="15" r="1"></circle><circle cx="15" cy="15" r="1"></circle><path d="M9 9h6M9 15h6M9 9v6M15 9v6"></path>',
  //     package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>',
  //     'arrow-up-right': '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>',
  //   };
  //   return icons[iconName] || '';
  // };

  return (
    <section style={{
      backgroundColor: getColor('#0A0A0F', '#FFFFFF'),
      paddingTop: isMobile ? '48px' : '100px',
      paddingBottom: isMobile ? '48px' : '100px',
      paddingLeft: isMobile ? '20px' : '120px',
      paddingRight: isMobile ? '20px' : '120px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        alignItems: 'center',
        width: '100%',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          width: '100%',
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '9999px',
            backgroundColor: getColor('#13131A', '#FAF9F5'),
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
              // POWERED BY
            </span>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: getColor('#FFFFFF', '#141413'),
            fontFamily: 'Geist',
            margin: 0,
            textAlign: 'center',
          }}>
            Our Sponsors
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: getColor('#A1A1AA', '#47362C'),
            fontFamily: 'Inter, sans-serif',
            lineHeight: 1.5,
            margin: 0,
            textAlign: 'center',
            maxWidth: '560px',
          }}>
            Meet the companies making DevFest Santo Domingo possible.
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: '100%',
        }}>
          {tiers.map((tier, tierIdx) => (
            <div key={tierIdx} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              width: '100%',
            }}>
              {/* Tier Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%',
              }}>
                {/* Icon */}
                <Image src={`/icons/${tier.icon}.png`} alt={`${tier.label} icon`} width={18} height={18} />

                {/* Label */}
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  color: getColor('#FFFFFF', '#141413'),
                  fontFamily: 'Geist Mono',
                }}>
                  {tier.label}
                </span>

                {/* Divider */}
                <div style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: getColor('#2A2A35', '#E5E5E5'),
                }}></div>

                {/* Count */}
                <span style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: getColor('#6B6B75', '#757575'),
                  fontFamily: 'IBM Plex Mono',
                }}>
                  {tier.count}
                </span>
              </div>

              {/* Sponsors Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile
                  ? `repeat(${Math.min(tier.sponsors.length, 2)}, 1fr)`
                  : `repeat(${tier.sponsors.length}, 1fr)`,
                gap: tier.label === 'PARTNERS' ? '10px' : tier.label === 'SILVER' ? '12px' : tier.label === 'GOLD' ? '14px' : '16px',
                width: '100%',
              }}>
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div
                    key={sIdx}
                    style={{
                      borderRadius: tier.label === 'PARTNERS' ? '6px' : tier.label === 'SILVER' ? '8px' : tier.label === 'GOLD' ? '10px' : '12px',
                      border: `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
                      backgroundColor: getColor('#16161F', '#FFFFFF'),
                      height: sponsor.height,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '6px',
                      width: '100%',
                    }}
                  >
                    {/* {sponsor.icon && (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={sponsor.iconColor} strokeWidth="2">
                        <g dangerouslySetInnerHTML={{ __html: getSvgIcon(sponsor.icon) }} />
                      </svg>
                    )} */}
                    <span style={{
                      fontSize: sponsor.fontSize || 14,
                      fontWeight:  600,
                      color: getColor('#FFFFFF', '#141413'),
                      fontFamily:  'Geist',
                      textAlign: 'center',
                      letterSpacing: 'normal',
                    }}>
                      {sponsor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Become a Sponsor Button */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          borderRadius: '9999px',
          backgroundColor: getColor('#16161F', '#FFFFFF'),
          border: `1px solid #A855F7`,
          padding: '14px 28px',
          color: getColor('#FFFFFF', '#141413'),
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Inter, sans-serif',
          cursor: 'pointer',
        }}>
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
