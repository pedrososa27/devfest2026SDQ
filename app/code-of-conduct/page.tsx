'use client';

import {
  ShieldCheck, Download, Languages, Siren,
  Users, HeartHandshake, Shield, Sparkles,
  Check, X, Timer, Link, Mail, FileText,
  BookOpen, ArrowUpRight, MessageCircleWarning,
  TriangleAlert, DoorOpen, Ban,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './page.module.scss';

function useTokens(isDark: boolean) {
  return {
    bgPrimary: isDark ? '#0A0A0F' : '#FFFFFF',
    bgSecondary: isDark ? '#13131A' : '#FAF9F5',
    bgCard: isDark ? '#16161F' : '#FFFFFF',
    bgTertiary: isDark ? '#1A1A24' : '#F1F1F1',
    borderSubtle: isDark ? '#2A2A35' : '#E5E5E5',
    borderStrong: isDark ? '#3A3A48' : '#CCCCCC',
    fgPrimary: isDark ? '#FFFFFF' : '#141413',
    fgSecondary: isDark ? '#A1A1AA' : '#47362C',
    fgMuted: isDark ? '#6B6B75' : '#757575',
    neonPurple: isDark ? '#A855F7' : '#7C3AED',
    neonPink: isDark ? '#EC4899' : '#DB2777',
    neonCyan: isDark ? '#22D3EE' : '#0891B2',
    accentGreen: '#34A853',
    accentYellow: '#FBBC04',
    accentBlue: '#4285F4',
    accentRed: '#EA4335',
  };
}

const PLEDGE_CARDS = [
  {
    icon: Users,
    iconColor: '#A855F7',
    iconBg: '#A855F722',
    iconBorder: '#A855F744',
    title: 'Be inclusive',
    desc: 'Welcome people of every race, gender, orientation, ability, age, and experience level. Assume good faith.',
  },
  {
    icon: HeartHandshake,
    iconColor: '#22D3EE',
    iconBg: '#22D3EE22',
    iconBorder: '#22D3EE44',
    title: 'Be respectful',
    desc: 'Disagree on ideas, never on people. Listen actively. Use names and pronouns people share with you.',
  },
  {
    icon: Shield,
    iconColor: '#34A853',
    iconBg: '#34A85322',
    iconBorder: '#34A85344',
    title: 'Be safe',
    desc: 'Zero tolerance for harassment, intimidation, threats, or unsolicited photography. Consent is mandatory.',
  },
  {
    icon: Sparkles,
    iconColor: '#FBBC04',
    iconBg: '#FBBC0422',
    iconBorder: '#FBBC0444',
    title: 'Be helpful',
    desc: 'Lift others up. Mentor where you can. Celebrate first-time speakers, junior devs, and people new to our community.',
  },
];

const GOOD_ITEMS = [
  'Use welcoming, inclusive language. Default to people\'s stated names and pronouns.',
  'Show empathy toward people whose context is different from yours.',
  'Accept constructive feedback gracefully. Apologize and learn when you mess up.',
  'Ask before photographing or recording someone — and respect a \'no\'.',
  'Make space for first-time speakers, juniors, and new community members.',
  'If you see something off, say something — to staff, to organizers, or via the report form.',
];

const BAD_ITEMS = [
  'Harassment, intimidation, threats, or stalking — online or in person.',
  'Discriminatory jokes, slurs, or comments tied to identity, body, religion, or background.',
  'Sexual language, imagery, or unwanted physical contact in talks, booths, or hallways.',
  'Recording or photographing people without their consent.',
  'Sustained disruption of talks, workshops, or other community spaces.',
  'Retaliation against anyone who reports a Code of Conduct concern in good faith.',
];

const REPORT_CHANNELS = [
  {
    icon: Siren,
    iconBg: '#EA4335',
    iconShadow: '#EA433555',
    pillDot: '#EA4335',
    pillLabel: 'URGENT',
    title: 'Find a staff member',
    desc: 'Anyone in a purple Staff lanyard or a yellow Volunteer t-shirt can call our on-site CoC response team. Used for incidents that need an immediate response.',
    footerIcon: Timer,
    footerColor: '#34A853',
    footerText: 'Response time: under 5 minutes',
  },
  {
    icon: FileText,
    iconBg: '#22D3EE',
    iconShadow: '#22D3EE55',
    pillDot: '#22D3EE',
    pillLabel: 'ANONYMOUS',
    title: 'Submit a written report',
    desc: 'Use our online form to file a report — anonymously if you prefer. Reviewed by two CoC team members independently before any action is taken.',
    footerIcon: Link,
    footerColor: '#22D3EE',
    footerText: 'devfest.do/report',
  },
  {
    icon: Mail,
    iconBg: '#A855F7',
    iconShadow: '#A855F755',
    pillDot: '#A855F7',
    pillLabel: 'PRIVATE',
    title: 'Email the CoC team',
    desc: 'Reach the CoC committee directly. Two trained members triage every email; nothing is forwarded outside the team without your explicit consent.',
    footerIcon: Mail,
    footerColor: '#A855F7',
    footerText: 'coc@devfest.do',
  },
];

const ENFORCEMENT_STEPS = [
  {
    num: '01',
    numColor: '#FBBC04',
    icon: MessageCircleWarning,
    title: 'Private warning',
    desc: 'For minor or first-time issues. The reported person is contacted privately, told what happened, and asked to stop.',
  },
  {
    num: '02',
    numColor: '#EA4335',
    icon: TriangleAlert,
    title: 'Public warning',
    desc: 'A formal warning, with the offending behavior named. Continued behavior moves directly to step 3 or 4.',
  },
  {
    num: '03',
    numColor: '#EC4899',
    icon: DoorOpen,
    title: 'Removal from event',
    desc: 'For serious incidents: the person is asked to leave the venue. No refund. Speakers\' talks may be removed from the program.',
  },
  {
    num: '04',
    numColor: '#A855F7',
    icon: Ban,
    title: 'Permanent ban',
    desc: 'For severe or repeat violations: a permanent ban from all GDG Santo Domingo events and online community spaces.',
  },
];

export default function CodeOfConductPage() {
  const { isDark } = useTheme();
  const t = useTokens(isDark);
  const isMobile = useBreakpoint();

  return (
    <div
      className={styles.page}
      style={{
        '--bg-primary': t.bgPrimary,
        '--bg-secondary': t.bgSecondary,
        '--bg-card': t.bgCard,
        '--bg-tertiary': t.bgTertiary,
        '--border-subtle': t.borderSubtle,
        '--border-strong': t.borderStrong,
        '--fg-primary': t.fgPrimary,
        '--fg-secondary': t.fgSecondary,
        '--fg-muted': t.fgMuted,
        '--neon-purple': t.neonPurple,
        '--neon-cyan': t.neonCyan,
        '--neon-pink': t.neonPink,
        '--accent-green': t.accentGreen,
        '--accent-yellow': t.accentYellow,
        '--accent-blue': t.accentBlue,
        '--accent-red': t.accentRed,
      } as React.CSSProperties}
    >
      <Header />

      {/* ── Hero ── */}
      <section className={`${styles.hero} flex flex-col items-center justify-center gap-6 py-24 px-5 md:px-[120px]`}>
        {/* Version badge */}
        <div className={styles.versionBadge}>
          <ShieldCheck size={14} color="var(--accent-green)" />
          <span className={styles.versionBadgeText}>v 2.1 · LAST UPDATED MAR 2026</span>
        </div>

        {/* Kicker */}
        <span className={styles.heroKicker}>Code of Conduct</span>

        {/* Headline */}
        <h1 className={`text-[48px] md:text-[84px] ${styles.heroHeadline}`}>
          A safe space{'\n'}for every developer.
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSubtitle}>
          DevFest Santo Domingo is a community event for everyone — regardless of background, identity, or experience level.
          By attending, speaking, sponsoring, or volunteering, you agree to follow the rules below.
        </p>

        {/* Meta buttons */}
        <div className="flex flex-wrap items-center gap-[10px] pt-3">
          <button className={styles.metaBtn}>
            <Download size={14} color="var(--neon-cyan)" />
            <span className={styles.metaBtnText}>Download as PDF</span>
          </button>
          <button className={styles.metaBtn}>
            <Languages size={14} color="var(--neon-pink)" />
            <span className={styles.metaBtnText}>Leer en español</span>
          </button>
          <button className={styles.reportIncidentBtn}>
            <Siren size={14} color="#ffffff" />
            <span className={styles.reportIncidentBtnText}>Report an incident</span>
          </button>
        </div>
      </section>

      {/* ── 01 Our Pledge ── */}
      <section className={`${styles.sectionSecondary} py-20 px-5 md:px-[120px] flex flex-col gap-10`}>
        {/* Section head */}
        <div className="flex flex-col items-center gap-[14px] w-full">
          <span className={styles.sectionKicker}>01 · OUR PLEDGE</span>
          <h2 className={`text-[36px] md:text-[48px] ${styles.sectionHeading}`}>
            Our four ground rules.
          </h2>
          <p className={styles.sectionSubtitle}>
            These aren&apos;t suggestions. They&apos;re the floor — the minimum we expect from everyone who shares space with our community for two days.
          </p>
        </div>

        {/* Pledge cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {PLEDGE_CARDS.map(card => (
            <div
              key={card.title}
              className={styles.pledgeCard}
              style={{ '--accent': card.iconColor, '--accent-bg': card.iconBg, '--accent-border': card.iconBorder } as React.CSSProperties}
            >
              <div className={styles.pledgeIcon}>
                <card.icon size={22} color="var(--accent)" />
              </div>
              <span className={styles.pledgeTitle}>{card.title}</span>
              <p className={styles.pledgeDesc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 What We Expect ── */}
      <section className={`${styles.sectionPrimary} py-20 px-5 md:px-[120px] flex flex-col gap-12`}>
        {/* Section head */}
        <div className="flex flex-col items-center gap-3 w-full">
          <span className={styles.sectionKicker}>02 · WHAT WE EXPECT</span>
          <h2 className={`text-[36px] md:text-[48px] ${styles.sectionHeading}`}>
            What&apos;s in. What&apos;s out.
          </h2>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expected behavior */}
          <div className={`${styles.behaviorCard} ${styles.behaviorGood}`}>
            <div className={styles.behaviorHeader}>
              <div className={styles.behaviorIconGreen}>
                <Check size={22} color="#ffffff" />
              </div>
              <span className={styles.behaviorTitle}>Expected behavior</span>
            </div>
            <div className={styles.behaviorList}>
              {GOOD_ITEMS.map((item, i) => (
                <div key={i} className={styles.behaviorItem}>
                  <div className={styles.behaviorDotGood}>
                    <Check size={14} color="var(--accent-green)" />
                  </div>
                  <p className={styles.behaviorItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unacceptable behavior */}
          <div className={`${styles.behaviorCard} ${styles.behaviorBad}`}>
            <div className={styles.behaviorHeader}>
              <div className={styles.behaviorIconRed}>
                <X size={22} color="#ffffff" />
              </div>
              <span className={styles.behaviorTitle}>Unacceptable behavior</span>
            </div>
            <div className={styles.behaviorList}>
              {BAD_ITEMS.map((item, i) => (
                <div key={i} className={styles.behaviorItem}>
                  <div className={styles.behaviorDotBad}>
                    <X size={14} color="var(--accent-red)" />
                  </div>
                  <p className={styles.behaviorItemText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 How to Report ── */}
      <section className={`${styles.sectionSecondary} py-20 px-5 md:px-[120px] flex flex-col gap-12`}>
        {/* Section head */}
        <div className="flex flex-col items-center gap-[14px] w-full">
          <span className={styles.sectionKicker}>03 · HOW TO REPORT</span>
          <h2 className={`text-[36px] md:text-[48px] ${styles.sectionHeading}`}>
            Three ways to reach us — fast.
          </h2>
          <p className={styles.reportSectionSubtitle}>
            If something happens during the event — or has already happened — pick whichever channel feels safest. All reports are taken seriously and handled by a dedicated CoC response team within 24 hours.
          </p>
        </div>

        {/* Report cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REPORT_CHANNELS.map(ch => (
            <div
              key={ch.title}
              className={styles.reportCard}
              style={{
                '--ch-icon-bg': ch.iconBg,
                '--ch-icon-shadow': ch.iconShadow,
                '--ch-pill-dot': ch.pillDot,
                '--ch-footer-color': ch.footerColor,
              } as React.CSSProperties}
            >
              {/* Top row: icon + pill */}
              <div className={styles.channelTopRow}>
                <div className={styles.channelIcon}>
                  <ch.icon size={22} color="#ffffff" />
                </div>
                <div className={styles.channelPill}>
                  <div className={styles.channelPillDot} />
                  <span className={styles.channelPillLabel}>{ch.pillLabel}</span>
                </div>
              </div>

              <span className={styles.channelTitle}>{ch.title}</span>
              <p className={styles.channelDesc}>{ch.desc}</p>

              {/* Footer */}
              <div className={styles.channelFooter}>
                <ch.footerIcon size={13} color="var(--ch-footer-color)" />
                <span className={styles.channelFooterText}>{ch.footerText}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 Enforcement ── */}
      <section className={`${styles.sectionPrimary} py-20 px-5 md:px-[120px] flex flex-col gap-12`}>
        {/* Section head — two-column layout */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-10">
          <div className={styles.enforcementHeadLeft}>
            <span className={styles.sectionKicker}>04 · ENFORCEMENT</span>
            <h2 className={`text-[36px] md:text-[48px] ${styles.sectionHeadingLeft}`}>
              How we respond.
            </h2>
          </div>
          <p className={styles.enforcementSectionSubtitle}>
            Every report is unique, but here&apos;s the general ladder we use. The CoC team has full discretion to skip steps depending on severity.
          </p>
        </div>

        {/* Enforcement steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {ENFORCEMENT_STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`${
                i === 0
                  ? 'rounded-2xl md:rounded-l-2xl md:rounded-r-none'
                  : i === ENFORCEMENT_STEPS.length - 1
                  ? 'rounded-2xl md:rounded-r-2xl md:rounded-l-none'
                  : 'rounded-2xl md:rounded-none'
              } ${styles.enforcementStep} ${!isMobile && i > 0 ? styles.enforcementStepNoBorderLeft : ''}`}
              style={{ '--step-color': step.numColor } as React.CSSProperties}
            >
              <div className={styles.stepNumRow}>
                <span className={styles.stepNum}>{step.num}</span>
                <step.icon size={18} color="var(--step-color)" />
              </div>
              <span className={styles.stepTitle}>{step.title}</span>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Attribution & Contact CTA ── */}
      <section className={`${styles.sectionSecondary} py-20 px-5 md:px-[120px] flex flex-col gap-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attribution card */}
          <div className={styles.attrCard}>
            <div className={styles.attrHeader}>
              <BookOpen size={18} color="var(--neon-cyan)" />
              <span className={styles.attrLabel}>ATTRIBUTION</span>
            </div>
            <h3 className={styles.attrTitle}>Built on shoulders of giants.</h3>
            <p className={styles.attrText}>
              This Code of Conduct adapts language from the Contributor Covenant v2.1 and the GDG global community guidelines, with localizations specific to Santo Domingo and the broader Dominican developer community.
            </p>
            <div className={styles.attrTags}>
              {['Contributor Covenant 2.1', 'GDG Community Guidelines'].map(label => (
                <div key={label} className={styles.attrTag}>
                  <span className={styles.attrTagLabel}>{label}</span>
                  <ArrowUpRight size={11} color="var(--fg-muted)" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div className={styles.contactCard}>
            <div className={styles.contactHeader}>
              <ShieldCheck size={18} color="var(--accent-green)" />
              <span className={styles.contactLabel}>WE&apos;RE LISTENING</span>
            </div>
            <h3 className={styles.contactTitle}>Need to talk to us?</h3>
            <p className={styles.contactText}>
              Reach the CoC committee — directly, privately, and on your terms.
            </p>
            <div className={styles.contactBtns}>
              <button className={styles.contactPrimaryBtn}>
                <FileText size={14} color="#ffffff" />
                <span className={styles.contactPrimaryBtnText}>File a report</span>
              </button>
              <button className={styles.contactSecondaryBtn}>
                <Mail size={14} color="var(--fg-primary)" />
                <span className={styles.contactSecondaryBtnText}>coc@devfest.do</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
