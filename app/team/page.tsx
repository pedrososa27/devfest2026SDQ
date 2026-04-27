'use client';

import { Users, MapPin, CalendarClock, Sparkles, Truck, Coffee, Video, Palette, PenLine, ArrowRight, ClipboardList, Calendar, Clock3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
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

// Section kicker: "// 01  CORE TEAM" pattern from the design
function SectionKicker({ num, label, color }: { num: string; label: string; color: string }) {
  return (
    <div className={styles.kicker} style={{ '--accent': color } as React.CSSProperties}>
      <span className={styles.kickerNum}>{num}</span>
      <span className={styles.kickerLabel}>{label}</span>
    </div>
  );
}

interface LeadCardProps {
  accentColor: string;
  accentLabel: string;
  roleLabel: string;
  name: string;
  title: string;
  bio: string;
  handle: string;
  gradientTo: string;
}

function LeadCard({ accentColor, accentLabel, roleLabel, name, title, bio, handle, gradientTo }: LeadCardProps) {
  return (
    <div
      className={styles.leadCard}
      style={{ '--accent': accentColor, '--accent-a60': `${accentColor}99`, '--gradient-to': gradientTo } as React.CSSProperties}
    >
      {/* Avatar blob */}
      <div className={styles.leadAvatarArea}>
        <div className={styles.leadAvatarCircle} />
        <div className={styles.leadAvatarTag}>
          <span className={styles.leadAvatarTagText}>{accentLabel}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.leadBody}>
        <div className={styles.leadRoleRow}>
          <div className={styles.leadRoleDot} />
          <span className={styles.leadRoleLabel}>{roleLabel}</span>
        </div>
        <div className={styles.leadName}>{name}</div>
        <div className={styles.leadTitle}>{title}</div>
        <div className={styles.leadBio}>{bio}</div>
      </div>

      {/* Social */}
      <div className={styles.leadFooter}>
        <div className={styles.leadSocialIcons}>
          {['𝕏', 'in', 'gh'].map((icon) => (
            <div key={icon} className={styles.leadSocialIcon}>
              <span className={styles.leadSocialIconText}>{icon}</span>
            </div>
          ))}
        </div>
        <span className={styles.leadHandle}>{handle}</span>
      </div>
    </div>
  );
}

interface CommitteeCardProps {
  badge: string;
  badgeColor: string;
  initials: string;
  name: string;
  role: string;
  handle: string;
}

function CommitteeCard({ badge, badgeColor, initials, name, role, handle }: CommitteeCardProps) {
  return (
    <div
      className={styles.committeeCard}
      style={{ '--accent': badgeColor, '--accent-a60': `${badgeColor}99`, '--accent-a20': `${badgeColor}33`, '--accent-a33': `${badgeColor}55` } as React.CSSProperties}
    >
      {/* Avatar row: avatar left, badge tag top-right */}
      <div className={styles.committeeAvatarRow}>
        <div className={styles.committeeAvatar}>
          <span className={styles.committeeAvatarInitials}>{initials}</span>
        </div>
        <div className={styles.committeeBadge}>
          <span className={styles.committeeBadgeText}>{badge}</span>
        </div>
      </div>

      {/* Name + role */}
      <div className={styles.committeeInfo}>
        <div className={styles.committeeName}>{name}</div>
        <div className={styles.committeeRole}>{role}</div>
      </div>

      {/* Footer: handle + social icons */}
      <div className={styles.committeeFooter}>
        <span className={styles.committeeHandle}>{handle}</span>
        <div className={styles.committeeSocial}>
          <span className={styles.committeeSocialIcon}>in</span>
          <span className={styles.committeeSocialIcon}>gh</span>
        </div>
      </div>
    </div>
  );
}

function VolAvatar({ initials, fullName, color }: { initials: string; fullName: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={styles.volAvatarCircle}
        style={{ '--accent': color } as React.CSSProperties}
      >
        <span className={styles.volAvatarInitials}>{initials}</span>
      </div>
      <span className={styles.volAvatarName}>{fullName}</span>
    </div>
  );
}

interface VolGroupProps {
  Icon: React.ComponentType<{ size: number; color: string }>;
  iconColor: string;
  title: string;
  subtitle: string;
  count: string;
  countColor: string;
  members: { initials: string; name: string; color: string }[];
}

function VolGroup({ Icon, iconColor, title, subtitle, count, countColor, members }: VolGroupProps) {
  return (
    <div className={styles.volGroup} style={{ '--accent': countColor } as React.CSSProperties}>
      <div className={styles.volGroupHeader}>
        <div className={styles.volGroupHeaderLeft}>
          <div className={styles.volGroupIcon}>
            <Icon size={16} color={iconColor} />
          </div>
          <div>
            <div className={styles.volGroupTitle}>{title}</div>
            <div className={styles.volGroupSubtitle}>{subtitle}</div>
          </div>
        </div>
        <div className={styles.volGroupCount}>
          <span className={styles.volGroupCountText}>{count}</span>
        </div>
      </div>
      <div className={styles.volGrid}>
        {members.map((m) => (
          <div key={m.initials + m.name} className={styles.volGridItem}>
            <VolAvatar initials={m.initials} fullName={m.name} color={m.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const { isDark } = useTheme();
  const t = useTokens(isDark);

  const leads = [
    { accentColor: t.neonPurple, gradientTo: '#A855F700', accentLabel: 'LEAD', roleLabel: 'GDG LEAD', name: 'Carolina Méndez', title: 'Chapter Organizer, GDG Santo Domingo', bio: 'Started the chapter in 2017. Runs the conference end-to-end and refuses to sleep in October.', handle: '@carolina.dev' },
    { accentColor: t.neonCyan, gradientTo: '#22D3EE00', accentLabel: 'PROG', roleLabel: 'PROGRAM CHAIR', name: 'Luis Hernández', title: 'Talks Curator & Track Owner', bio: 'Reviewed 230+ CFP submissions in 2025. If a talk made the schedule, Luis read it twice.', handle: '@luis.codes' },
    { accentColor: t.neonPink, gradientTo: '#EC489900', accentLabel: 'OPS', roleLabel: 'OPERATIONS LEAD', name: 'Andrea Disla', title: 'Logistics & Venue Operations', bio: 'Owns the run-of-show, vendor calls, and the Slack channel that never sleeps the week of the event.', handle: '@andrea.builds' },
    { accentColor: t.accentYellow, gradientTo: '#FBBC0400', accentLabel: 'CONT', roleLabel: 'SPEAKERS & CONTENT', name: 'Rafael Núñez', title: 'Speaker Care & Programming', bio: 'Coordinates speaker travel, dry runs, and last-minute slide rescues. Patron saint of HDMI cables.', handle: '@raf.eng' },
  ];

  const committee = [
    { badge: 'AI', badgeColor: t.neonCyan, initials: 'AB', name: 'Alejandro Báez', role: 'Track Captain — AI/ML', handle: '@alejandro.ai' },
    { badge: 'SEC', badgeColor: t.neonPink, initials: 'MR', name: 'María Rosario', role: 'Track Captain — Cybersecurity', handle: '@maria.sec' },
    { badge: 'DATA', badgeColor: t.accentGreen, initials: 'DG', name: 'Diego Gómez', role: 'Track Captain — Data Eng', handle: '@diego.data' },
    { badge: 'TEST', badgeColor: t.accentBlue, initials: 'PV', name: 'Patricia Vargas', role: 'Track Captain — Testing/QA', handle: '@pat.tests' },
    { badge: 'UI/UX', badgeColor: t.accentYellow, initials: 'JS', name: 'Joseline Santos', role: 'Track Captain — UI/UX', handle: '@josi.design' },
    { badge: 'WEB', badgeColor: t.neonPurple, initials: 'OF', name: 'Omar Familia', role: 'Track Captain — Web/Cloud', handle: '@omar.web' },
    { badge: 'MOB', badgeColor: t.accentRed, initials: 'VC', name: 'Valeria Cordero', role: 'Track Captain — Mobile', handle: '@val.mobile' },
    { badge: 'PART', badgeColor: t.neonCyan, initials: 'FT', name: 'Frank Tavárez', role: 'Sponsorships & Partners', handle: '@frank.partners' },
    { badge: 'COMM', badgeColor: t.neonPink, initials: 'NM', name: 'Noelia Marte', role: 'Communications & Marketing', handle: '@noe.writes' },
    { badge: 'DEI', badgeColor: t.accentGreen, initials: 'KP', name: 'Kevin Pérez', role: 'Diversity & Inclusion', handle: '@kev.dei' },
    { badge: 'FIN', badgeColor: t.accentYellow, initials: 'GA', name: 'Gabriela Adames', role: 'Finance & Treasury', handle: '@gab.numbers' },
    { badge: 'VOL', badgeColor: t.neonPurple, initials: 'HC', name: 'Hugo Carrasco', role: 'Volunteer Coordination', handle: '@hugo.crew' },
  ];
  

  const volMembers12 = [
    { initials: 'AS', name: 'Ana S.',     color: t.neonPurple },
    { initials: 'BR', name: 'Brian R.',   color: t.neonCyan },
    { initials: 'CM', name: 'Carla M.',   color: t.neonPink },
    { initials: 'DJ', name: 'Daniel J.',  color: t.accentYellow },
    { initials: 'EP', name: 'Elena P.',   color: t.accentGreen },
    { initials: 'FA', name: 'Fátima A.',  color: t.accentBlue },
    { initials: 'GT', name: 'Gerson T.',  color: t.accentRed },
    { initials: 'HM', name: 'Helena M.',  color: t.neonPurple },
    { initials: 'IB', name: 'Iván B.',    color: t.neonCyan },
    { initials: 'JL', name: 'Julia L.',   color: t.neonPink },
    { initials: 'KH', name: 'Karol H.',   color: t.accentGreen },
    { initials: '+1', name: 'Liz V.',     color: t.accentYellow },
  ];

  const volGroups: VolGroupProps[] = [
    { Icon: Truck, iconColor: t.neonPurple, title: 'Logistics & Check-in', subtitle: 'Welcome desk, badges, swag, signage', count: '12 people', countColor: t.neonPurple, members: volMembers12 },
    { Icon: Coffee, iconColor: t.neonPink, title: 'Hospitality', subtitle: 'Coffee, snacks, attendee experience', count: '9 people', countColor: t.neonPink, members: volMembers12.slice(0, 9) },
    { Icon: Video, iconColor: t.neonCyan, title: 'Tech & A/V', subtitle: 'Livestream, recording, mic line', count: '8 people', countColor: t.neonCyan, members: volMembers12.slice(0, 8) },
    { Icon: Palette, iconColor: t.accentYellow, title: 'Design', subtitle: 'Signage, slides, social graphics', count: '6 people', countColor: t.accentYellow, members: volMembers12.slice(0, 6) },
    { Icon: PenLine, iconColor: t.accentGreen, title: 'Content & Comms', subtitle: 'Notes, social posts, recap content', count: '10 people', countColor: t.accentGreen, members: volMembers12.slice(0, 10) },
  ];

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
        '--neon-pink': t.neonPink,
        '--neon-cyan': t.neonCyan,
        '--accent-green': t.accentGreen,
        '--accent-yellow': t.accentYellow,
        '--accent-blue': t.accentBlue,
        '--accent-red': t.accentRed,
        '--hero-gradient': isDark
          ? `radial-gradient(ellipse 120% 90% at 50% 10%, ${t.neonPurple}59 0%, transparent 100%), radial-gradient(ellipse 80% 80% at 85% 90%, ${t.neonCyan}40 0%, transparent 100%)`
          : `radial-gradient(ellipse 120% 90% at 50% 10%, ${t.neonPurple}20 0%, transparent 100%), radial-gradient(ellipse 80% 80% at 85% 90%, ${t.neonCyan}15 0%, transparent 100%)`,
        '--cta-gradient': isDark
          ? `radial-gradient(circle at 50% 0%, ${t.neonPurple}66 0%, transparent 70%)`
          : `radial-gradient(circle at 50% 0%, ${t.neonPurple}22 0%, transparent 70%)`,
        '--cta-shadow': `0 20px 60px ${t.neonPurple}44`,
      } as React.CSSProperties}
    >
      <Header />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className={`w-full py-24 px-5 md:px-[120px] flex flex-col items-center gap-7 ${styles.hero}`}>
        {/* Badge */}
        <div className={styles.heroBadge}>
          <div className={styles.heroBadgeDot} />
          <span className={styles.heroBadgeText}>THE PEOPLE BEHIND DEVFEST</span>
        </div>

        {/* Headline */}
        <div className={`text-[52px] md:text-[88px] ${styles.heroHeadline}`}>
          Built by the<br />community, for<br />the community.
        </div>

        {/* Subtitle */}
        <p className={`text-[15px] md:text-[18px] ${styles.heroSubtitle}`}>
          DevFest Santo Domingo runs on volunteer time. Sixty-plus organizers, captains, and helpers across eight GDG chapters — these are the people who make the weekend happen.
        </p>

        {/* Stats pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          <div className={styles.statPill}>
            <Users size={14} color={t.neonPurple} />
            <span className={styles.statPillText}>60+ volunteers</span>
          </div>
          <div className={styles.statPill}>
            <MapPin size={14} color={t.neonCyan} />
            <span className={styles.statPillText}>8 GDG chapters</span>
          </div>
          <div className={styles.statPill}>
            <CalendarClock size={14} color={t.neonPink} />
            <span className={styles.statPillText}>6 months of planning</span>
          </div>
        </div>
      </section>

      {/* ── Core Team Section ───────────────────────────────────────────── */}
      <section className={`w-full py-24 px-5 md:px-[120px] flex flex-col gap-12 ${styles.sectionPrimary}`}>
        <div className="flex items-end justify-between flex-wrap gap-5">
          <div className={styles.sectionHeaderContent}>
            <SectionKicker num="// 01" label="CORE TEAM" color={t.neonPurple} />
            <div className={`text-[32px] md:text-[48px] ${styles.sectionTitle}`}>Lead organizers</div>
            <p className={styles.sectionSubtitle}>
              The four people steering the ship — programming, operations, content, and the GDG chapter behind it all.
            </p>
          </div>
          <div className={styles.sectionBadge}>
            <Sparkles size={14} color={t.neonCyan} />
            <span className={styles.sectionBadgeText}>4 leads // 6 months // 1 weekend</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {leads.map((lead) => <LeadCard key={lead.name} {...lead} />)}
        </div>
      </section>

      {/* ── Organizing Committee ────────────────────────────────────────── */}
      <section className={`w-full py-20 px-5 md:px-[120px] flex flex-col gap-10 ${styles.sectionSecondary}`}>
        <div className="flex items-end justify-between flex-wrap gap-5">
          <div className={styles.sectionHeaderContent}>
            <SectionKicker num="// 02" label="ORGANIZING COMMITTEE" color={t.neonCyan} />
            <div className={`text-[28px] md:text-[42px] ${styles.sectionTitleSm}`}>Track captains &amp; area owners</div>
            <p className={styles.sectionSubtitleSm}>
              Twelve people running the tracks, partner relationships, and the operational threads that hold a two-day conference together.
            </p>
          </div>
          {/* Tabs: All 12 / By track / By area */}
          <div className={styles.tabs}>
            {[
              { label: 'All 12', active: true },
              { label: 'By track', active: false },
              { label: 'By area', active: false },
            ].map(({ label, active }) => (
              <div key={label} className={`${styles.tab} ${active ? styles.tabActive : styles.tabInactive}`}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {committee.map((m) => <CommitteeCard key={m.name} {...m} />)}
        </div>
      </section>

      {/* ── Volunteers Section ──────────────────────────────────────────── */}
      <section className={`w-full py-24 px-5 md:px-[120px] flex flex-col gap-12 ${styles.sectionPrimary}`}>
        <div className="flex items-end justify-between flex-wrap gap-5">
          <div className={styles.sectionHeaderContent}>
            <SectionKicker num="// 03" label="VOLUNTEERS" color={t.neonPink} />
            <div className={`text-[28px] md:text-[42px] ${styles.sectionTitleSm}`}>The crew on the floor.</div>
            <p className={styles.sectionSubtitleSm}>
              45+ volunteers across five workstreams — handling check-in, the mic line, livestream, signage, and everything in between.
            </p>
          </div>
          {/* Big number */}
          <div className={styles.volSectionNum}>
            <span className={styles.volSectionBigNum}>45</span>
            <span className={styles.volSectionNumLabel}>VOLUNTEERS</span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {volGroups.map((g) => <VolGroup key={g.title} {...g} />)}
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────────── */}
      <section className={`w-full py-20 px-5 md:px-[120px] ${styles.sectionSecondary}`}>
        <div className={`flex flex-col items-center gap-6 py-12 px-6 md:py-16 md:px-20 ${styles.ctaInner}`}>
          {/* Pill */}
          <div className={styles.ctaPill}>
            <div className={styles.ctaPillDot} />
            <span className={styles.ctaPillText}>VOLUNTEER APPLICATIONS // OPEN FOR 2027</span>
          </div>

          <div className={`text-[36px] md:text-[52px] ${styles.ctaHeadline}`}>
            Want to be on this page next year?
          </div>

          <p className={styles.ctaSubtitle}>
            Volunteer roles open in May. No prior experience required — just a willingness to help, learn, and meet a lot of people building things on the island.
          </p>

          {/* Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.ctaBtnPrimary}>
              Become a volunteer
              <ArrowRight size={14} color="#FFFFFF" />
            </button>
            <button className={styles.ctaBtnSecondary}>
              See open roles
              <ClipboardList size={14} color={t.fgPrimary} />
            </button>
          </div>

          {/* Meta row */}
          <div className={styles.ctaMeta}>
            <div className={styles.ctaMetaItem}>
              <Calendar size={14} color={t.neonCyan} />
              <span className={styles.ctaMetaText}>Apps open May 2026</span>
            </div>
            <div className={styles.ctaMetaItem}>
              <Sparkles size={14} color={t.neonPink} />
              <span className={styles.ctaMetaText}>5 workstreams</span>
            </div>
            <div className={styles.ctaMetaItem}>
              <Clock3 size={14} color={t.accentYellow} />
              <span className={styles.ctaMetaText}>~20 hrs commitment</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
