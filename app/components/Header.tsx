'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useBreakpoint } from '../hooks/useBreakpoint';
import styles from './header.module.scss';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useBreakpoint();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  const t = {
    bgPrimary:    isDark ? '#0A0A0F' : '#FFFFFF',
    bgSecondary:  isDark ? '#1A1A24' : '#F5F5F5',
    bgCard:       isDark ? '#1E1E2A' : '#F0F0F0',
    borderSubtle: isDark ? '#2A2A35' : '#E5E5E5',
    borderMuted:  isDark ? '#3A3A48' : '#CCCCCC',
    fgPrimary:    isDark ? '#FFFFFF'  : '#141413',
    fgSecondary:  isDark ? '#A1A1AA' : '#888888',
    fgMuted:      isDark ? '#A1A1AA' : '#666666',
    neonPurple:   '#A855F7',
    neonCyan:     '#06B6D4',
    neonPink:     '#EC4899',
    accentGreen:  '#34A853',
    toggleBg:     isDark ? '#A855F7' : '#E5E5E5',
  };

  const navLinks = [
    { label: 'Home', href: '/', weight: 500 },
    { label: 'Schedule', href: '/schedule', weight: 400 },
    { label: 'Speakers', href: '/speakers', weight: 400 },
    { label: 'Team', href: '/team', weight: 400 },
    { label: 'FAQ', href: '/faq', weight: 400 },
    { label: 'Code of Conduct', href: '/code-of-conduct', weight: 400 },
  ].map((link) => ({
    ...link,
    isActive: link.href !== '#' ? pathname === link.href : false,
  }));

  return (
    <header
      className={styles.header}
      style={{
        '--bg-primary':    t.bgPrimary,
        '--bg-secondary':  t.bgSecondary,
        '--bg-card':       t.bgCard,
        '--border-subtle': t.borderSubtle,
        '--border-muted':  t.borderMuted,
        '--fg-primary':    t.fgPrimary,
        '--fg-secondary':  t.fgSecondary,
        '--fg-muted':      t.fgMuted,
        '--neon-purple':   t.neonPurple,
        '--neon-cyan':     t.neonCyan,
        '--neon-pink':     t.neonPink,
        '--accent-green':  t.accentGreen,
        '--toggle-bg':     t.toggleBg,
      } as React.CSSProperties}
    >
      {/* Header Top Row */}
      <div className={styles.topRow}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoMark}>
            <span className={styles.logoMarkText}>{'<>'}</span>
          </div>
          <div className={styles.logoTextGroup}>
            <div className={styles.logoName}>DevFest</div>
            <div className={styles.logoSubtitle}>SANTO DOMINGO</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.isActive ? styles.navLinkActive : styles.navLink}
                style={{ fontWeight: link.weight }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right Actions - Desktop */}
        {!isMobile && (
          <div className={styles.desktopActions}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              <span className={styles.themeToggleIcon}>🌙</span>
            </button>
            <button className={styles.cfpButton}>Call for Papers</button>
            <button className={styles.registerButton}>
              Register <span>→</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <div className={styles.mobileActions}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.hamburger}
            >
              <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barTopOpen : ''}`} />
              <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barMidOpen : ''}`} />
              <div className={`${styles.bar} ${isMobileMenuOpen ? styles.barBottomOpen : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu - dropdown (always rendered, animated via max-height + opacity) */}
      {isMobile && (
        <nav className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          {/* Nav Links */}
          <div className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.mobileNavLink} ${link.isActive ? styles.mobileNavLinkActive : ''}`}
                style={{ fontWeight: link.weight }}
              >
                <span>{link.label}</span>
                {link.isActive && <div className={styles.activeDot} />}
              </Link>
            ))}
          </div>

          {/* Theme Toggle Row */}
          <div className={styles.mobileThemeRow}>
            <span className={styles.mobileThemeLabel}>
              {isDark ? 'Dark mode' : 'Light mode'}
            </span>
            <button onClick={toggleTheme} className={styles.mobileToggle}>
              <div
                className={`${styles.mobileToggleThumb} ${
                  isDark ? styles.mobileToggleThumbDark : styles.mobileToggleThumbLight
                }`}
              >
                {isDark ? '🌙' : '☀️'}
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className={styles.mobileMenuButtons}>
            <button className={styles.mobileCfpButton}>Call for Papers</button>
            <button className={styles.mobileRegisterButton}>
              Register Now <span>→</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}