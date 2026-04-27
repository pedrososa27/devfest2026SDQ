'use client';

import { useTheme } from '../../context/ThemeContext';
import styles from './Footer.module.scss';

export default function Footer() {
  const { isDark } = useTheme();

  const t = {
    bgPrimary:    isDark ? '#0A0A0F' : '#FFFFFF',
    bgSecondary:  isDark ? '#1A1A24' : '#F5F5F5',
    bgCard:       isDark ? '#16161F' : '#F5F5F5',
    borderSubtle: isDark ? '#2A2A35' : '#E5E5E5',
    fgPrimary:    isDark ? '#FFFFFF'  : '#141413',
    fgSecondary:  isDark ? '#A1A1AA' : '#888888',
    fgMuted:      isDark ? '#A1A1AA' : '#666666',
    fgDim:        isDark ? '#6B6B75' : '#999999',
    neonPurple:   '#A855F7',
    neonCyan:     '#06B6D4',
    neonPink:     '#EC4899',
    accentGreen:  '#34A853',
  };

  const getSvgIcon = (iconName: string): string => {
    const icons: Record<string, string> = {
      'code-xml':  '<polyline points="14 5 9 19 19 19 14 5"></polyline><polyline points="10 5 15 19 5 19 10 5"></polyline>',
      'twitter':   '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7"></path>',
      'linkedin':  '<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle>',
      'github':    '<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.543 2.914 1.181.09-.916.35-1.543.636-1.897-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.005 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.545 1.375.203 2.394.1 2.647.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.195 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"></path>',
      'instagram': '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="#16161F"></path><circle cx="17.5" cy="6.5" r="1.5" fill="#16161F"></circle>',
      'youtube':   '<path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.54c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.25z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#16161F"></polygon>',
    };
    return icons[iconName] || '';
  };

  const socialLinks = [
    { name: 'twitter',   icon: 'twitter' },
    { name: 'linkedin',  icon: 'linkedin' },
    { name: 'github',    icon: 'github' },
    { name: 'instagram', icon: 'instagram' },
    { name: 'youtube',   icon: 'youtube' },
  ];

  const footerLinks = {
    EVENT: ['Schedule', 'Speakers', 'Past Talks', 'Call for Papers', 'Code of Conduct'],
    COMMUNITY: ['About GDG', 'Blog', 'Donate', 'Contact Us', 'Partners'],
    RESOURCES: ['Speaker Guides', 'Swag Store', 'Design Kit', 'Press Kit', 'Media'],
  };

  return (
    <footer
      className={styles.footer}
      style={{
        '--bg-primary':    t.bgPrimary,
        '--bg-secondary':  t.bgSecondary,
        '--bg-card':       t.bgCard,
        '--border-subtle': t.borderSubtle,
        '--fg-primary':    t.fgPrimary,
        '--fg-secondary':  t.fgSecondary,
        '--fg-muted':      t.fgMuted,
        '--fg-dim':        t.fgDim,
        '--neon-purple':   t.neonPurple,
        '--neon-cyan':     t.neonCyan,
        '--neon-pink':     t.neonPink,
        '--accent-green':  t.accentGreen,
      } as React.CSSProperties}
    >
      <div className={styles.topSection}>
        <div className={styles.brandSection}>
          <div className={styles.logoContainer}>
            <div className={styles.logoMark}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                <g dangerouslySetInnerHTML={{ __html: getSvgIcon('code-xml') }} />
              </svg>
            </div>
            <div className={styles.logoTextGroup}>
              <span className={styles.logoName}>DevFest</span>
              <span className={styles.logoSubtitle}>SANTO DOMINGO</span>
            </div>
          </div>

          <p className={styles.tagline}>
            The largest community-run tech event in the Dominican Republic. Powered by GDG Santo Domingo.
          </p>

          <div className={styles.socialRow}>
            {socialLinks.map((social) => (
              <button key={social.name} className={styles.socialIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <g dangerouslySetInnerHTML={{ __html: getSvgIcon(social.icon) }} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.linkColumns}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className={styles.linkColumn}>
              <h4 className={styles.linkColumnHeading}>{category}</h4>
              {links.map((link) => (
                <a key={link} href="#" className={styles.footerLink}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <div className={styles.statusDot} />
          <span>© 2026 GDG Santo Domingo // Built with ❤ by the community</span>
        </div>

        <div className={styles.legalLinks}>
          {['Privacy', 'Terms', 'Cookies'].map((link) => (
            <a key={link} href="#" className={styles.legalLink}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
