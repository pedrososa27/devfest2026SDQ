'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter, Link } from '../../../i18n/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import styles from './Header.module.scss';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();
  const isMobile = useBreakpoint();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('nav');

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  // Strip locale prefix for active link comparison
  // (usePathname from next-intl already returns locale-stripped path)

  // Language switcher
  const handleLangSwitch = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: nextLocale });
  };

  const navLinks = [
    { labelKey: 'home' as const, href: '/', weight: 500 },
    { labelKey: 'schedule' as const, href: '/schedule', weight: 400 },
    { labelKey: 'speakers' as const, href: '/speakers', weight: 400 },
    { labelKey: 'team' as const, href: '/team', weight: 400 },
    { labelKey: 'faq' as const, href: '/faq', weight: 400 },
    { labelKey: 'codeOfConduct' as const, href: '/code-of-conduct', weight: 400 },
  ].map((link) => ({
    ...link,
    label: t(link.labelKey),
    isActive: pathname === link.href,
  }));

  const colors = {
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

  return (
    <header
      className={styles.header}
      style={{
        '--bg-primary':    colors.bgPrimary,
        '--bg-secondary':  colors.bgSecondary,
        '--bg-card':       colors.bgCard,
        '--border-subtle': colors.borderSubtle,
        '--border-muted':  colors.borderMuted,
        '--fg-primary':    colors.fgPrimary,
        '--fg-secondary':  colors.fgSecondary,
        '--fg-muted':      colors.fgMuted,
        '--neon-purple':   colors.neonPurple,
        '--neon-cyan':     colors.neonCyan,
        '--neon-pink':     colors.neonPink,
        '--accent-green':  colors.accentGreen,
        '--toggle-bg':     colors.toggleBg,
      } as React.CSSProperties}
    >
      <div className={styles.topRow}>
        <div className={styles.logoContainer}>
          <div className={styles.logoMark}>
            <span className={styles.logoMarkText}>{'<>'}</span>
          </div>
          <div className={styles.logoTextGroup}>
            <div className={styles.logoName}>DevFest</div>
            <div className={styles.logoSubtitle}>SANTO DOMINGO</div>
          </div>
        </div>

        {!isMobile && (
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                href={link.href}
                className={link.isActive ? styles.navLinkActive : styles.navLink}
                style={{ fontWeight: link.weight }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {!isMobile && (
          <div className={styles.desktopActions}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              <span className={styles.themeToggleIcon}>🌙</span>
            </button>
            <button onClick={handleLangSwitch} className={styles.cfpButton}>
              {locale === 'es' ? 'EN' : 'ES'}
            </button>
            <button className={styles.cfpButton}>{t('callForPapers')}</button>
            <button className={styles.registerButton}>
              {t('register')} <span>→</span>
            </button>
          </div>
        )}

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

      {isMobile && (
        <nav className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileNavLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.labelKey}
                href={link.href}
                className={`${styles.mobileNavLink} ${link.isActive ? styles.mobileNavLinkActive : ''}`}
                style={{ fontWeight: link.weight }}
              >
                <span>{link.label}</span>
                {link.isActive && <div className={styles.activeDot} />}
              </Link>
            ))}
          </div>

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

          <div className={styles.mobileMenuButtons}>
            <button onClick={handleLangSwitch} className={styles.mobileCfpButton}>
              {locale === 'es' ? '🌐 English' : '🌐 Español'}
            </button>
            <button className={styles.mobileCfpButton}>{t('callForPapers')}</button>
            <button className={styles.mobileRegisterButton}>
              {t('register')} <span>→</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
