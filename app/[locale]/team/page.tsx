'use client';

import { useState, useEffect } from 'react';
import { Users, MapPin, CalendarClock, Sparkles, Truck, Coffee, Video, Palette, PenLine, ArrowRight, ClipboardList, Calendar, Clock3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';
import styles from './page.module.scss';
import { createClient } from '../../../lib/supabase/client';
import type { CoreTeamMember, CommitteeMember, Volunteer } from '../../../lib/supabase/types';

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
  photoUrl?: string | null;
}

function LeadCard({ accentColor, accentLabel, roleLabel, name, title, bio, handle, gradientTo, photoUrl }: LeadCardProps) {
  return (
    <div
      className={styles.leadCard}
      style={{ '--accent': accentColor, '--accent-a60': `${accentColor}99`, '--gradient-to': gradientTo } as React.CSSProperties}
    >
      {/* Avatar blob */}
      <div className={styles.leadAvatarArea}>
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photoUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 0 }}
          />
        ) : (
          <div className={styles.leadAvatarCircle} />
        )}
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
  photoUrl?: string | null;
}

function CommitteeCard({ badge, badgeColor, initials, name, role, handle, photoUrl }: CommitteeCardProps) {
  return (
    <div
      className={styles.committeeCard}
      style={{ '--accent': badgeColor, '--accent-a60': `${badgeColor}99`, '--accent-a20': `${badgeColor}33`, '--accent-a33': `${badgeColor}55` } as React.CSSProperties}
    >
      {/* Avatar row: avatar left, badge tag top-right */}
      <div className={styles.committeeAvatarRow}>
        <div className={styles.committeeAvatar}>
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '50%' }} />
          ) : (
            <span className={styles.committeeAvatarInitials}>{initials}</span>
          )}
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

function VolAvatar({ initials, fullName, color, photoUrl }: { initials: string; fullName: string; color: string; photoUrl?: string | null }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={styles.volAvatarCircle}
        style={{ '--accent': color } as React.CSSProperties}
      >
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={fullName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: '50%' }} />
        ) : (
          <span className={styles.volAvatarInitials}>{initials}</span>
        )}
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
  members: { initials: string; name: string; color: string; photoUrl?: string | null }[];
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
            <VolAvatar initials={m.initials} fullName={m.name} color={m.color} photoUrl={m.photoUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamPage() {
  const { isDark } = useTheme();
  const siteConfig = useSiteConfig();
  const t = useTokens(isDark);
  const tp = useTranslations('teamPage');
  const [dbCore, setDbCore] = useState<CoreTeamMember[]>([]);
  const [dbCommittee, setDbCommittee] = useState<CommitteeMember[]>([]);
  const [dbVolunteers, setDbVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('core_team').select('*').eq('active', true).order('display_order'),
      supabase.from('committee_members').select('*').eq('active', true).order('display_order'),
      supabase.from('volunteers').select('*').eq('active', true).order('display_order'),
    ]).then(([core, committee, vols]) => {
      if (core.data) setDbCore(core.data);
      if (committee.data) setDbCommittee(committee.data);
      if (vols.data) setDbVolunteers(vols.data);
    });
  }, []);

  if (!siteConfig.show_team) {
    return (
      <div className={styles.page} style={{ '--bg-primary': isDark ? '#0A0A0F' : '#FFFFFF', display: 'flex', flexDirection: 'column', minHeight: '100vh' } as React.CSSProperties}>
        <Header />
        <ComingSoon message={siteConfig.team_coming_soon_msg} isDark={isDark} />
        <Footer />
      </div>
    );
  }

  const LEAD_COLORS = [
    { accentColor: t.neonPurple,   gradientTo: '#A855F700' },
    { accentColor: t.neonCyan,     gradientTo: '#22D3EE00' },
    { accentColor: t.neonPink,     gradientTo: '#EC489900' },
    { accentColor: t.accentYellow, gradientTo: '#FBBC0400' },
  ];

  const leads = dbCore.map((m, i) => ({
    accentColor: LEAD_COLORS[i % LEAD_COLORS.length].accentColor,
    gradientTo:  LEAD_COLORS[i % LEAD_COLORS.length].gradientTo,
    accentLabel: m.accent_label,
    roleLabel:   m.role_label,
    name:        m.name,
    title:       m.title ?? '',
    bio:         m.bio ?? '',
    handle:      m.handle ?? '',
    photoUrl:    m.photo_url,
  }));

  const BADGE_COLORS: Record<string, string> = {
    AI: t.neonCyan, SEC: t.neonPink, DATA: t.accentGreen, TEST: t.accentBlue,
    QA: t.accentBlue, 'UI/UX': t.accentYellow, WEB: t.neonPurple, MOB: t.accentRed,
    PART: t.neonCyan, COMM: t.neonPink, DEI: t.accentGreen, FIN: t.accentYellow,
    VOL: t.neonPurple, CLOUD: t.neonCyan, FLUTTER: '#38BDF8', DEVOPS: '#8B5CF6',
  };

  const committee = dbCommittee.map((m) => ({
    badge:      m.badge,
    badgeColor: BADGE_COLORS[m.badge] ?? t.neonPurple,
    initials:   m.initials,
    name:       m.name,
    role:       m.role,
    handle:     m.handle ?? '',
    photoUrl:   m.photo_url,
  }));

  const AREA_COLORS = [t.neonPurple, t.neonCyan, t.neonPink, t.accentYellow, t.accentGreen, t.accentBlue, t.accentRed];

  const VOL_AREA_CONFIG: Record<string, { Icon: React.ComponentType<{ size: number; color: string }>; iconColor: string; title: string; subtitle: string; countColor: string }> = {
    logistics:   { Icon: Truck,   iconColor: t.neonPurple,   title: tp('volLogisticsTitle'), subtitle: tp('volLogisticsSub'), countColor: t.neonPurple },
    hospitality: { Icon: Coffee,  iconColor: t.neonPink,     title: tp('volHospTitle'),      subtitle: tp('volHospSub'),      countColor: t.neonPink },
    tech:        { Icon: Video,   iconColor: t.neonCyan,     title: tp('volTechTitle'),      subtitle: tp('volTechSub'),      countColor: t.neonCyan },
    design:      { Icon: Palette, iconColor: t.accentYellow, title: tp('volDesignTitle'),    subtitle: tp('volDesignSub'),    countColor: t.accentYellow },
    comms:       { Icon: PenLine, iconColor: t.accentGreen,  title: tp('volCommsTitle'),     subtitle: tp('volCommsSub'),     countColor: t.accentGreen },
  };

  const volGroups: VolGroupProps[] = (['logistics', 'hospitality', 'tech', 'design', 'comms'] as const)
    .map((area) => {
      const config = VOL_AREA_CONFIG[area];
      const areaVols = dbVolunteers.filter((v) => v.area === area);
      return {
        ...config,
        count: `${areaVols.length} ${areaVols.length === 1 ? 'persona' : 'personas'}`,
        members: areaVols.map((v, i) => ({
          initials: v.initials,
          name:     v.full_name,
          color:    AREA_COLORS[i % AREA_COLORS.length],
          photoUrl: v.photo_url,
        })),
      };
    })
    .filter((g) => g.members.length > 0);

  const totalVols = dbVolunteers.length;

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
          <span className={styles.heroBadgeText}>{tp('badge')}</span>
        </div>

        {/* Headline */}
        <div className={`text-[52px] md:text-[88px] ${styles.heroHeadline}`}>
          {tp('headline')}
        </div>

        {/* Subtitle */}
        <p className={`text-[15px] md:text-[18px] ${styles.heroSubtitle}`}>
          {tp('subtitle')}
        </p>

        {/* Stats pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          <div className={styles.statPill}>
            <Users size={14} color={t.neonPurple} />
            <span className={styles.statPillText}>{tp('statVolunteers')}</span>
          </div>
          <div className={styles.statPill}>
            <MapPin size={14} color={t.neonCyan} />
            <span className={styles.statPillText}>{tp('statChapters')}</span>
          </div>
          <div className={styles.statPill}>
            <CalendarClock size={14} color={t.neonPink} />
            <span className={styles.statPillText}>{tp('statPlanning')}</span>
          </div>
        </div>
      </section>

      {/* ── Core Team Section ───────────────────────────────────────────── */}
      <section className={`w-full py-24 px-5 md:px-[120px] flex flex-col gap-12 ${styles.sectionPrimary}`}>
        <div className="flex items-end justify-between flex-wrap gap-5">
          <div className={styles.sectionHeaderContent}>
            <SectionKicker num="// 01" label={tp('coreTeam')} color={t.neonPurple} />
            <div className={`text-[32px] md:text-[48px] ${styles.sectionTitle}`}>{tp('coreTeamTitle')}</div>
            <p className={styles.sectionSubtitle}>
              {tp('coreTeamSubtitle')}
            </p>
          </div>
          <div className={styles.sectionBadge}>
            <Sparkles size={14} color={t.neonCyan} />
            <span className={styles.sectionBadgeText}>{tp('coreTeamBadge')}</span>
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
            <SectionKicker num="// 02" label={tp('committee')} color={t.neonCyan} />
            <div className={`text-[28px] md:text-[42px] ${styles.sectionTitleSm}`}>{tp('committeeTitle')}</div>
            <p className={styles.sectionSubtitleSm}>
              {tp('committeeSubtitle')}
            </p>
          </div>
          {/* Tabs: All 12 / By track / By area */}
          <div className={styles.tabs}>
            {[
              { label: tp('tabAll'), active: true },
              { label: tp('tabByTrack'), active: false },
              { label: tp('tabByArea'), active: false },
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
            <SectionKicker num="// 03" label={tp('volunteers')} color={t.neonPink} />
            <div className={`text-[28px] md:text-[42px] ${styles.sectionTitleSm}`}>{tp('volCrewTitle')}</div>
            <p className={styles.sectionSubtitleSm}>
              {tp('volCrewSubtitle')}
            </p>
          </div>
          {/* Big number */}
          <div className={styles.volSectionNum}>
            <span className={styles.volSectionBigNum}>{totalVols || '–'}</span>
            <span className={styles.volSectionNumLabel}>{tp('volSectionLabel')}</span>
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
            <span className={styles.ctaPillText}>{tp('ctaPill')}</span>
          </div>

          <div className={`text-[36px] md:text-[52px] ${styles.ctaHeadline}`}>
            {tp('ctaHeadline')}
          </div>

          <p className={styles.ctaSubtitle}>
            {tp('ctaSubtitle')}
          </p>

          {/* Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.ctaBtnPrimary}>
              {tp('ctaBtnPrimary')}
              <ArrowRight size={14} color="#FFFFFF" />
            </button>
            <button className={styles.ctaBtnSecondary}>
              {tp('ctaBtnSecondary')}
              <ClipboardList size={14} color={t.fgPrimary} />
            </button>
          </div>

          {/* Meta row */}
          <div className={styles.ctaMeta}>
            <div className={styles.ctaMetaItem}>
              <Calendar size={14} color={t.neonCyan} />
              <span className={styles.ctaMetaText}>{tp('ctaMetaApps')}</span>
            </div>
            <div className={styles.ctaMetaItem}>
              <Sparkles size={14} color={t.neonPink} />
              <span className={styles.ctaMetaText}>{tp('ctaMetaWorkstreams')}</span>
            </div>
            <div className={styles.ctaMetaItem}>
              <Clock3 size={14} color={t.accentYellow} />
              <span className={styles.ctaMetaText}>{tp('ctaMetaHours')}</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
