'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { useBreakpoint } from '../hooks/useBreakpoint';

export default function Header() {
  const isDarkSystem = useDarkMode();
  const isMobile = useBreakpoint();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userThemeOverride, setUserThemeOverride] = useState<boolean | null>(null);
  
  const isDark = userThemeOverride !== null ? userThemeOverride : isDarkSystem;

  const navLinks = [
    { label: 'Home', weight: 500, isActive: true },
    { label: 'Schedule', weight: 400, isActive: false },
    { label: 'Speakers', weight: 400, isActive: false },
    { label: 'Sponsors', weight: 400, isActive: false },
    { label: 'About', weight: 400, isActive: false },
  ];

  return (
    <header
      style={{
        height: isMobile ? 'auto' : '72px',
        backgroundColor: isDark ? '#0A0A0F' : '#FFFFFF',
        borderBottomColor: isDark ? '#2A2A35' : '#E5E5E5',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        width: '100%',
        paddingLeft: isMobile ? '16px' : '120px',
        paddingRight: isMobile ? '16px' : '120px',
        paddingTop: 0,
        paddingBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Top Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
          minHeight: '72px',
          width: '100%',
          gap: isMobile ? '12px' : '0px',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Logo Mark - 36x36px */}
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#A855F7',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '20px', color: '#FFFFFF', fontWeight: 600 }}>{'<>'}</span>
          </div>

          {/* Logo Text Group */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: isDark ? '#FFFFFF' : '#141413',
                fontFamily: 'Geist, system-ui, -apple-system',
                letterSpacing: '-0.3px',
              }}
            >
              DevFest
            </div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 500,
                color: '#A855F7',
                fontFamily: 'Geist Mono, monospace',
                letterSpacing: '1px',
              }}
            >
              SANTO DOMINGO
            </div>
          </div>
        </div>

        {/* Desktop Nav Links - hidden on mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '36px', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href="#"
                style={{
                  fontSize: '14px',
                  fontWeight: link.weight,
                  color: link.isActive ? (isDark ? '#FFFFFF' : '#141413') : (isDark ? '#A1A1AA' : '#888888'),
                  textDecoration: 'none',
                  fontFamily: 'Inter, system-ui',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Actions - Desktop */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: 'auto' }}>
            {/* Theme Toggle */}
            <button
              onClick={() => setUserThemeOverride(!isDark)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                backgroundColor: isDark ? '#1A1A24' : '#F5F5F5',
                border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '18px', color: isDark ? '#FFFFFF' : '#141413' }}>🌙</span>
            </button>

            {/* CFP Link */}
            <button
              style={{
                backgroundColor: 'transparent',
                color: isDark ? '#FFFFFF' : '#141413',
                border: `1px solid ${isDark ? '#3A3A48' : '#CCCCCC'}`,
                borderRadius: '9999px',
                paddingLeft: '18px',
                paddingRight: '18px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: 'Inter, system-ui',
                cursor: 'pointer',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Call for Papers
            </button>

            {/* Register Button */}
            <button
              style={{
                backgroundColor: '#A855F7',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Inter, system-ui',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              Register
              <span style={{ fontSize: '14px' }}>→</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setUserThemeOverride(!isDark)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '9999px',
                backgroundColor: isDark ? '#1A1A24' : '#F5F5F5',
                border: `1px solid ${isDark ? '#2A2A35' : '#E5E5E5'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span style={{ fontSize: '18px', color: isDark ? '#FFFFFF' : '#141413' }}>🌙</span>
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: isDark ? '#1A1A24' : '#F5F5F5',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <div style={{ width: '20px', height: '2px', backgroundColor: isDark ? '#FFFFFF' : '#141413' }} />
              <div style={{ width: '20px', height: '2px', backgroundColor: isDark ? '#FFFFFF' : '#141413' }} />
              <div style={{ width: '20px', height: '2px', backgroundColor: isDark ? '#FFFFFF' : '#141413' }} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu - dropdown */}
      {isMobile && isMobileMenuOpen && (
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            paddingTop: '16px',
            paddingBottom: '16px',
            borderTopColor: isDark ? '#2A2A35' : '#E5E5E5',
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            marginTop: '12px',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href="#"
              style={{
                fontSize: '14px',
                fontWeight: link.weight,
                color: link.isActive ? (isDark ? '#FFFFFF' : '#141413') : (isDark ? '#A1A1AA' : '#888888'),
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            {/* CFP Link Mobile */}
            <button
              style={{
                backgroundColor: 'transparent',
                color: isDark ? '#FFFFFF' : '#141413',
                border: `1px solid ${isDark ? '#3A3A48' : '#CCCCCC'}`,
                borderRadius: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '13px',
                fontWeight: 500,
                fontFamily: 'Inter, system-ui',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Call for Papers
            </button>

            {/* Register Button Mobile */}
            <button
              style={{
                backgroundColor: '#A855F7',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Inter, system-ui',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
              }}
            >
              Register
              <span style={{ fontSize: '14px' }}>→</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
