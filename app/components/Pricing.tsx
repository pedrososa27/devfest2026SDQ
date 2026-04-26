'use client';

import Image from 'next/image';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Pricing() {
  const isDark = useDarkMode();

  const getColor = (dark:any, light:any) => isDark ? dark : light;

  const tickets = [
    {
      label: '// STUDENT',
      labelColor: '#22D3EE',
      name: 'Student',
      price: 'Free',
      priceNote: 'with valid ID',
      features: [
        { text: 'Full main stage access', included: true },
        { text: 'Lunch & coffee breaks', included: true },
        { text: 'DevFest sticker pack', included: true },
        { text: 'Community networking lounge', included: true },
        { text: 'Workshops & afterparty', included: false },
      ],
      button: 'Apply with student ID',
      buttonBg: getColor('#1A1A24', '#F1F1F1'),
      buttonText: getColor('#FFFFFF', '#141413'),
      buttonBorder: true,
      buttonBorderColor: getColor('#3A3A48', '#CCCCCC'),
      featureIconColor: '#22D3EE',
      highlighted: false,
    },
    {
      flag: 'MOST POPULAR',
      flagBg: '#A855F7',
      label: '// GENERAL',
      labelColor: '#A855F7',
      name: 'General Admission',
      price: '$25',
      priceNote: 'USD',
      features: [
        { text: 'All 6 tech tracks (AI, Dev, Security, Data, UI/UX, Testing)', included: true },
        { text: 'DevFest T-shirt & sticker pack', included: true },
        { text: 'Lunch, coffee & afterparty access', included: true },
        { text: 'Speaker Q&A lounge', included: true },
        { text: 'Hands-on workshops', included: false },
      ],
      button: 'Get general ticket',
      buttonIcon: true,
      buttonBg: '#A855F7',
      buttonText: '#FFFFFF',
      featureIconColor: '#A855F7',
      highlighted: true,
      shadow: true,
    },
    {
      label: '// SUPPORTER',
      labelColor: '#EC4899',
      name: 'Supporter',
      price: '$75',
      priceNote: 'USD',
      features: [
        { text: 'Everything in General', included: true },
        { text: 'Exclusive merch bundle (hoodie + cap + pins)', included: true },
        { text: 'Access to 2 hands-on workshops', included: true },
        { text: 'VIP speaker dinner invite', included: true },
      ],
      button: 'Become a supporter',
      buttonBg: getColor('#1A1A24', '#F1F1F1'),
      buttonText: '#EC4899',
      buttonBorder: true,
      buttonBorderColor: '#EC4899',
      featureIconColor: '#EC4899',
      highlighted: false,
    },
  ];

  return (
    <section style={{
      backgroundColor: getColor('#0A0A0F', '#FFFFFF'),
      paddingTop: '80px',
      paddingBottom: '80px',
      paddingLeft: '120px',
      paddingRight: '120px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        width: '100%',
        alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#22D3EE',
            }}></div>
            <p style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '2px',
              color: '#22D3EE',
              fontFamily: 'Geist Mono',
              margin: 0,
            }}>
              // TICKETS
            </p>
          </div>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 700,
            letterSpacing: '-1px',
            color: getColor('#FFFFFF', '#141413'),
            fontFamily: 'Geist',
            margin: 0,
            textAlign: 'center',
          }}>
            Get your ticket
          </h2>
          <p style={{
            fontSize: '16px',
            fontWeight: 400,
            color: getColor('#A1A1AA', '#47362C'),
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            textAlign: 'center',
            maxWidth: '600px',
          }}>
            Pick your tier. All tickets include access to the main stage, lunch, and the afterparty.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          width: '100%',
          alignItems: 'start',
        }}>
          {tickets.map((ticket, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: '8px',
                border: ticket.highlighted 
                  ? `2px solid ${ticket.labelColor}`
                  : `1px solid ${getColor('#2A2A35', '#E5E5E5')}`,
                backgroundColor: getColor('#16161F', '#FFFFFF'),
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
                boxShadow: ticket.shadow
                  ? `rgba(168, 85, 247, 0.2) 0px 8px 40px`
                  : 'none',
                height: 'fit-content',
              }}
            >
              {/* Flag */}
              {ticket.flag && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: ticket.flagBg,
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  width: 'fit-content',
                }}>
                  <Image src="/icons/popularIcon.png" alt="Flag icon" width={16} height={16} />
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    fontFamily: 'Geist Mono',
                  }}>
                    {ticket.flag}
                  </span>
                </div>
              )}

              {/* Label and name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  color: ticket.labelColor,
                  fontFamily: 'Geist Mono',
                  margin: 0,
                }}>
                  {ticket.label}
                </p>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: getColor('#FFFFFF', '#141413'),
                  fontFamily: 'Geist',
                  margin: 0,
                }}>
                  {ticket.name}
                </h3>
              </div>

              {/* Price row */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                {ticket.price.startsWith('$') && (
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: getColor('#A1A1AA', '#47362C'),
                    fontFamily: 'Geist',
                  }}>
                    $
                  </span>
                )}
                <span style={{
                  fontSize: '42px',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                  color: getColor('#FFFFFF', '#141413'),
                  fontFamily: 'Geist',
                }}>
                  {ticket.price.replace('$', '')}
                </span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  color: getColor('#6B6B75', '#757575'),
                  fontFamily: 'Geist Mono',
                  marginBottom: '4px',
                }}>
                  {ticket.priceNote}
                </span>
              </div>

              {/* Divider */}
              <div style={{
                height: '1px',
                backgroundColor: getColor('#2A2A35', '#E5E5E5'),
              }}></div>

              {/* Features */}
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {ticket.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: feature.included
                        ? getColor('#A1A1AA', '#47362C')
                        : getColor('#6B6B75', '#757575'),
                      fontFamily: 'Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    {feature.included ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={ticket.featureIconColor}
                        strokeWidth="2"
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={getColor('#6B6B75', '#757575')}
                        strokeWidth="2"
                        style={{ marginTop: '2px', flexShrink: 0 }}
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                style={{
                  borderRadius: '9999px',
                  border: ticket.buttonBorder 
                    ? `1px solid ${ticket.buttonBorderColor}` 
                    : 'none',
                  backgroundColor: ticket.buttonBg,
                  color: ticket.buttonText,
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: ticket.highlighted ? 700 : 600,
                  fontFamily: 'Geist',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {ticket.button}
                {ticket.buttonIcon && (
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
