'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import styles from './CFPSection.module.scss';

export default function CFPSection() {
  const { isDark } = useTheme();
  const t = useTranslations('cfp');

  const topics = [
    { name: t('topics.ai'), icon: 'ML' },
    { name: t('topics.cyber'), icon: 'cyber' },
    { name: t('topics.testing'), icon: 'testing' },
    { name: t('topics.data'), icon: 'data' },
    { name: t('topics.ux'), icon: 'ux' },
    { name: t('topics.dev'), icon: 'dev' },
  ];

  return (
    <section
      className={styles.section}
      style={{
        '--bg-section':    isDark ? '#13131A' : '#FAF9F5',
        '--bg-card':       isDark ? '#16161F' : '#FFFFFF',
        '--bg-terminal':   isDark ? '#0A0A0F' : '#F5F5F5',
        '--bg-topbar':     isDark ? '#16161F' : '#F5F5F5',
        '--bg-badge':      isDark ? '#16161F' : '#F5F5F5',
        '--bg-deadline':   isDark ? '#16161F' : '#F5F5F5',
        '--border-subtle': isDark ? '#2A2A35' : '#E5E5E5',
        '--border-strong': isDark ? '#3A3A48' : '#CCCCCC',
        '--fg-primary':    isDark ? '#FFFFFF'  : '#141413',
        '--fg-muted':      isDark ? '#A1A1AA' : '#47362C',
        '--fg-dim':        isDark ? '#6B6B75' : '#757575',
      } as React.CSSProperties}
    >
      <div className={styles.inner}>
        {/* CFP Card */}
        <div className={styles.cfpCard}>
          {/* Terminal top bar */}
          <div className={styles.topBar}>
            <div className={styles.dot} style={{ backgroundColor: '#FF4444' }} />
            <div className={styles.dot} style={{ backgroundColor: '#FCD34D' }} />
            <div className={styles.dot} style={{ backgroundColor: '#34A853' }} />
            <div className={styles.topBarSpacer} />
            <span className={styles.topBarPath}>~/devfest-sdq/speakers</span>
          </div>

          {/* Content */}
          <div className={styles.content}>
            {/* Left */}
            <div className={styles.leftCol}>
              <div className={styles.openBadge}>
                <div className={styles.openDot} />
                <span className={styles.openText}>{t('openBadge')}</span>
              </div>
              <h2 className={styles.cfpTitle}>{t('title')}</h2>
              <div className={styles.terminal}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCommand}>{t('termCommand')}</span>
                <div className={styles.cursor} />
              </div>
              <p className={styles.cfpDesc}>
                {t('description')}
              </p>
              <div className={styles.btns}>
                <button className={styles.primaryBtn}>
                  <span>{t('submitBtn')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button className={styles.secondaryBtn}>{t('guideBtn')}</button>
              </div>
            </div>

            {/* Right */}
            <div className={styles.rightCol}>
              <div className={styles.fileHeader}>
                <Image src="/icons/proposal.png" alt="File icon" width={16} height={16} />
                <span className={styles.fileName}>proposal.md</span>
              </div>
              <div className={styles.topicsHeader}>
                <span className={styles.lineNum}>01</span>
                <span className={styles.topicsTitle}>{t('topicsTitle')}</span>
              </div>
              <div className={styles.topicsList}>
                {topics.map((topic, idx) => (
                  <div key={idx} className={styles.topicRow}>
                    <Image src={`/icons/${topic.icon}.png`} alt={topic.name} width={14} height={14} />
                    <span className={styles.topicName}>{topic.name}</span>
                  </div>
                ))}
              </div>
              <div className={styles.deadline}>
                <Image src="/icons/submisions.png" alt="Clock icon" width={16} height={16} />
                <span className={styles.deadlineText}>{t('deadline')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
