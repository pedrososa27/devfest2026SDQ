'use client';

import Image from 'next/image';
import { useDarkMode } from '../hooks/useDarkMode';

export default function Hero() {
  const isDark = useDarkMode();

  return (
    <section
      style={{
        width: '100%',
        backgroundColor: isDark ? '#0A0A0F' : '#FFFFFF',
        backgroundImage: isDark
          ? `
            radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 15% 90%, rgba(34, 211, 238, 0.25) 0%, transparent 50%)
          `
          : 'none',
        padding: '96px 120px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '28px',
      }}
    >
      {/* Hero Badge */}
      <div
        style={{
          backgroundColor: isDark ? '#1A1A24' : '#F1F1F1',
          borderColor: isDark ? '#2A2A35' : '#E5E5E5',
          borderWidth: '1px',
          borderRadius: '9999px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '8px',
          paddingBottom: '8px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#22D3EE',
          }}
        />
        <span
          style={{
            fontFamily: 'Geist Mono, monospace',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '2px',
            color: isDark ? '#A1A1AA' : '#888888',
            textTransform: 'uppercase',
          }}
        >
          GDG SANTO DOMINGO // COMMUNITY EVENT
        </span>
      </div>

      {/* Subtitle */}
      <span
        style={{
          fontFamily: 'Geist Mono, monospace',
          fontSize: '16px',
          fontWeight: 500,
          letterSpacing: '3px',
          color: '#A855F7',
          textAlign: 'center',
        }}
      >
        DevFest Santo Domingo 2023
      </span>

      {/* Main Title */}
      <h1
        style={{
          fontFamily: 'Geist, system-ui, -apple-system',
          fontSize: '88px',
          fontWeight: 700,
          letterSpacing: '-3px',
          lineHeight: 1.02,
          textAlign: 'center',
          color: isDark ? '#FFFFFF' : '#141413',
          maxWidth: '1000px',
          margin: 0,
        }}
      >
        Where developers<br />
        build the future.
      </h1>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, system-ui, -apple-system',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: 'center',
          color: isDark ? '#A1A1AA' : '#47362C',
          maxWidth: '680px',
          margin: 0,
        }}
      >
        Two days of deep-dive talks on AI, Cybersecurity, Testing, Data engineering, and UI/UX — built by the Dominican dev community, for the Dominican dev community.
      </p>

      {/* Meta Info */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginTop: '4px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: isDark ? '#1A1A24' : '#F1F1F1',
            borderColor: isDark ? '#2A2A35' : '#E5E5E5',
            borderWidth: '1px',
            borderRadius: '9999px',
            fontSize: '13px',
            color: isDark ? '#FFFFFF' : '#141413',
            fontFamily: 'Geist Mono, monospace',
          }}
        >
           <Image
            src="/icons/date.png"
            alt="Calendar icon"
            width={16}
            height={16}
          /> Nov 18-19, 2023
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: isDark ? '#1A1A24' : '#F1F1F1',
            borderColor: isDark ? '#2A2A35' : '#E5E5E5',
            borderWidth: '1px',
            borderRadius: '9999px',
            fontSize: '13px',
            color: isDark ? '#FFFFFF' : '#141413',
            fontFamily: 'Geist Mono, monospace',
          }}
        >
           <Image
            src="/icons/location-pink.png"
            alt="Location icon"
            width={16}
            height={16}
          /> Santo Domingo, DR
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        {/* Primary Button */}
        <button
          style={{
            backgroundColor: '#A855F7',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            paddingLeft: '28px',
            paddingRight: '28px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'Geist, system-ui',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#9945E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#A855F7';
          }}
        >
          Register Now
          <span style={{ fontSize: '16px' }}>→</span>
        </button>

        {/* Secondary Button */}
        <button
          style={{
            backgroundColor: isDark ? '#1A1A24' : '#F1F1F1',
            color: isDark ? '#FFFFFF' : '#141413',
            border: isDark ? `1px solid #3A3A48` : `1px solid #CCCCCC`,
            borderRadius: '9999px',
            paddingLeft: '28px',
            paddingRight: '28px',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'Geist, system-ui',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#2A2A35' : '#E5E5E5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#1A1A24' : '#F1F1F1';
          }}
        >
          <Image
            src="/icons/schedule-white.png"
            alt="Calendar icon"
            width={16}
            height={16}
          />
          View Schedule
        </button>
      </div>
    </section>
  );
}
