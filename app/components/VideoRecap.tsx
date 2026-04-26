'use client';

import { useDarkMode } from '../hooks/useDarkMode';
import Image from 'next/image';

export default function VideoRecap() {
  const isDark = useDarkMode();

  return (
    <section
      style={{
        backgroundColor: isDark ? '#13131A' : '#FAF9F5',
        padding: '96px 120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: isDark ? '#1A1A24' : '#F1F1F1',
            borderColor: isDark ? '#2A2A35' : '#E5E5E5',
            borderWidth: '1px',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '2px',
            color: isDark ? '#A1A1AA' : '#888888',
            textTransform: 'uppercase',
          }}
        >
          <span>
            <Image src="/icons/record.png" alt="Video icon" width={12} height={12} />
          </span>
          <span>ARCHIVE // 2022</span>
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'Geist, system-ui',
            fontSize: '56px',
            fontWeight: 700,
            letterSpacing: '-2px',
            textAlign: 'center',
            color: isDark ? '#FFFFFF' : '#141413',
            margin: 0,
            maxWidth: '900px',
          }}
        >
          Watch our last recap
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter, system-ui',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.6,
            textAlign: 'center',
            color: isDark ? '#A1A1AA' : '#47362C',
            margin: 0,
            maxWidth: '620px',
          }}
        >
          See what DevFest Santo Domingo 2022 looked like — talks, hallway conversations, and the community energy.
        </p>
      </div>

      {/* Video Card */}
      <div
        style={{
          position: 'relative',
          width: '960px',
          height: '540px',
          backgroundColor: '#000000',
          borderRadius: '12px',
          borderColor: isDark ? '#3A3A48' : '#CCCCCC',
          borderWidth: '1px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '24px',
          backgroundImage: 'url(data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="960" height="540"%3E%3Crect fill="%23000" width="960" height="540"/%3E%3C/svg%3E)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          justifyContent: 'space-between',
          boxShadow: isDark 
            ? '0 20px 60px rgba(0,0,0,0.8)' 
            : '0 20px 60px rgba(0,0,0,0.2)',
        }}
      >
        {/* Top Bar with Badges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Official Recap Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(10, 10, 15, 0.7)',
              borderColor: isDark ? '#3A3A48' : '#CCCCCC',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '2px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            <span>📺</span>
            <span>OFFICIAL RECAP</span>
          </div>

          {/* Duration Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(10, 10, 15, 0.7)',
              borderColor: isDark ? '#3A3A48' : '#CCCCCC',
              borderWidth: '1px',
              borderRadius: '4px',
              padding: '6px 12px',
              fontSize: '11px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#FFFFFF',
            }}
          >
            04:32
          </div>
        </div>

        {/* Play Button */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '96px',
            height: '96px',
            backgroundColor: '#FFFFFFF2',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(-50%, -50%)';
          }}
        >
          <span style={{ fontSize: '36px', marginLeft: '4px' }}>▶</span>
        </div>

        {/* Bottom Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 10,
          }}
        >
          <h3
            style={{
              fontFamily: 'Geist, system-ui',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            DevFest SDQ 2022 Recap
          </h3>
          <p
            style={{
              fontFamily: 'Geist Mono, monospace',
              fontSize: '12px',
              color: isDark ? '#A1A1AA' : '#888888',
              margin: 0,
            }}
          >
            GDG Santo Domingo • 12K views
          </p>
        </div>
      </div>

      {/* YouTube Button */}
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#EA4335',
          color: '#FFFFFF',
          border: 'none',
          borderRadius: '9999px',
          padding: '14px 24px',
          fontSize: '15px',
          fontWeight: 600,
          fontFamily: 'Geist, system-ui',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#D33C2F';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#EA4335';
        }}
      >
        <span>
          <Image src="/icons/yt.png" alt="YouTube icon" width={16} height={16} />
        </span>
        <span>Watch on YouTube</span>
      </button>
    </section>
  );
}
