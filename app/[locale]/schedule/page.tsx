'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../context/ThemeContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ComingSoon from '../../components/ComingSoon/ComingSoon';
import styles from './page.module.scss';
import { createClient } from '../../../lib/supabase/client';

function useTokens(isDark: boolean) {
  return {
    bgPrimary:    isDark ? '#0A0A0F' : '#FFFFFF',
    bgSecondary:  isDark ? '#13131A' : '#FAF9F5',
    bgCard:       isDark ? '#16161F' : '#FFFFFF',
    bgTertiary:   isDark ? '#1A1A24' : '#F1F1F1',
    borderSubtle: isDark ? '#2A2A35' : '#E5E5E5',
    borderStrong: isDark ? '#3A3A48' : '#CCCCCC',
    fgPrimary:    isDark ? '#FFFFFF'  : '#141413',
    fgSecondary:  isDark ? '#A1A1AA' : '#47362C',
    fgMuted:      isDark ? '#6B6B75' : '#757575',
    fgInverse:    isDark ? '#0A0A0F' : '#FFFFFF',
    neonPurple:   isDark ? '#A855F7' : '#7C3AED',
    neonPink:     isDark ? '#EC4899' : '#DB2777',
    neonCyan:     isDark ? '#22D3EE' : '#0891B2',
    accentBlue:   '#4285F4',
    accentGreen:  '#34A853',
    accentRed:    '#EA4335',
    accentYellow: '#FBBC04',
  };
}
// ── Track color helper ───────────────────────────────────────────────
const TRACK_COLORS: Record<string, string> = {
  // From image reference
  'General': '#9CA3AF',
  'Testing': '#F97316',
  'DevOps': '#8B5CF6',
  'UX': '#3B82F6', 'UI / UX': '#3B82F6', 'UI/UX': '#3B82F6', 'Design': '#3B82F6',
  'AI': '#06B6D4', 'AI/ML': '#06B6D4', 'Machine Learning': '#06B6D4',
  'Community': '#EC4899',
  'Development': '#F59E0B', 'Web': '#F59E0B',
  'Android': '#22C55E',
 'Mobile': '#10B981',
  'Flutter': '#38BDF8',
  'gRPC': '#64748B',
  // Additional tracks
  'Cybersecurity': '#EF4444', 'Security': '#EF4444',
  'QA': '#F97316',
  'Data Engineering': '#6366F1', 'Data': '#6366F1',
  'Cloud': '#22D3EE',
  'Workshop': '#FBBF24', 'Firebase': '#FBBF24',
};
function getTrackColor(track?: string | null): string {
  return (track && TRACK_COLORS[track]) ?? '#A855F7';
}

// ── DB talk → Session shape ─────────────────────────────────────────
type TalkRow = {
  id: string;
  title: string;
  description: string | null;
  track: string | null;
  room: string | null;
  starts_at: string;
  ends_at: string;
  talk_type: string;
  speakers: { name: string; title: string | null; company: string | null } | null;
};

function talkToSession(t: TalkRow): Session {
  const start = new Date(t.starts_at);
  const end = new Date(t.ends_at);
  const fmt = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const speakerName = t.speakers?.name ?? '';
  const speakerRole = [t.speakers?.title, t.speakers?.company].filter(Boolean).join(', ');
  const initials = speakerName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0] ?? '')
    .join('')
    .toUpperCase();
  const color = getTrackColor(t.track);
  return {
    time: `${fmt(start)} — ${fmt(end)}`,
    type: t.talk_type.toUpperCase(),
    room: t.room ?? '',
    trackKey: t.track ?? 'General',
    tagColor: color,
    tagBg: color + '1F',
    title: t.title,
    desc: t.description ?? '',
    initials: initials || '??',
    avColor: color,
    speaker: speakerName,
    role: speakerRole,
  };
}

type DayBlock = { morning: Session[]; afternoon: Session[]; evening: Session[] };

function groupByDays(talks: TalkRow[]): DayBlock[] {
  const dayMap = new Map<string, TalkRow[]>();
  for (const talk of talks) {
    const day = talk.starts_at.slice(0, 10);
    if (!dayMap.has(day)) dayMap.set(day, []);
    dayMap.get(day)!.push(talk);
  }
  return Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, dayTalks]) => {
      dayTalks.sort((a, b) => a.starts_at.localeCompare(b.starts_at));
      return {
        morning: dayTalks.filter((t) => new Date(t.starts_at).getHours() < 12).map(talkToSession),
        afternoon: dayTalks.filter((t) => {
          const h = new Date(t.starts_at).getHours();
          return h >= 12 && h < 17;
        }).map(talkToSession),
        evening: dayTalks.filter((t) => new Date(t.starts_at).getHours() >= 17).map(talkToSession),
      };
    });
}
// ─── data ────────────────────────────────────────────────────────────────────

const DAY1_SESSIONS = {
  morning: [
    {
      time:    '09:00 — 09:45',
      type:    'KEYNOTE',
      room:    'Auditorium A',
      trackKey:'AI',
      tagColor:'#A855F7',
      tagBg:   '#A855F71F',
      title:   'Opening Keynote: The Future of AI in Latin America',
      desc:    'How AI is reshaping product development across Latin America — from startups to enterprise, and what comes next.',
      initials:'LM',
      avColor: '#A855F7',
      speaker: 'Laura Méndez',
      role:    'Staff ML Engineer, Google',
    },
    {
      time:    '10:00 — 10:45',
      type:    'TALK',
      room:    'Main Stage',
      trackKey:'AI',
      tagColor:'#A855F7',
      tagBg:   '#A855F71F',
      title:   'Fine-tuning LLMs on the Edge with open-source models',
      desc:    'A deep dive into running efficient, production-grade LLMs on consumer hardware. Quantisation, adapters, and real benchmarks.',
      initials:'CP',
      avColor: '#22D3EE',
      speaker: 'Carlos Peña',
      role:    'Senior ML Engineer, Stripe',
    },
    {
      time:    '11:00 — 11:45',
      type:    'TALK',
      room:    'Room B',
      trackKey:'Cybersecurity',
      tagColor:'#EA4335',
      tagBg:   '#EA43351F',
      title:   'Zero-trust Authentication for Microservice Architectures',
      desc:    'Move past perimeter security. How to design, implement, and operate mTLS, short-lived tokens, and workload identity across 100+ services.',
      initials:'SR',
      avColor: '#EA4335',
      speaker: 'Sofía Romero',
      role:    'Principal Security Engineer, Cloudflare',
    },
    {
      time:    '11:45 — 12:30',
      type:    'WORKSHOP',
      room:    'Lab 1 — Limited',
      trackKey:'Testing',
      tagColor:'#34A853',
      tagBg:   '#34A8531F',
      title:   'Workshop: Build a TypeScript Testing Suite from Scratch',
      desc:    'Hands-on session — bring your laptop. We will build a lightweight testing framework using Vitest, MSW, and Playwright end-to-end.',
      initials:'JC',
      avColor: '#34A853',
      speaker: 'Jonathan Cruz',
      role:    'Senior SDET, Mercado Libre',
    },
  ],
  afternoon: [
    {
      time:    '13:30 — 14:15',
      type:    'TALK',
      room:    'Main Stage',
      trackKey:'Testing',
      tagColor:'#34A853',
      tagBg:   '#34A8531F',
      title:   'Contract Testing Across 40+ Microservices',
      desc:    'How the payments platform team at Banreservas moved from e2e-heavy pipelines to fast, reliable consumer-driven contract tests.',
      initials:'AM',
      avColor: '#34A853',
      speaker: 'Andrés Mata',
      role:    'Staff Engineer, Banreservas',
    },
    {
      time:    '14:30 — 15:15',
      type:    'TALK',
      room:    'Room B',
      trackKey:'Data Engineering',
      tagColor:'#4285F4',
      tagBg:   '#4285F41F',
      title:   'BigQuery Patterns for Analytics at Scale',
      desc:    'Partitioning, clustering, and materialized views explained with real query plans from a 5 TB/day pipeline.',
      initials:'IR',
      avColor: '#4285F4',
      speaker: 'Isabel Reyes',
      role:    'Data Platform Lead, Scotiabank',
    },
    {
      time:    '15:30 — 16:15',
      type:    'TALK',
      room:    'Lab 1',
      trackKey:'UI/UX',
      tagColor:'#EC4899',
      tagBg:   '#EC48991F',
      title:   'Designing for Dark Mode — Done Right',
      desc:    'From color systems to elevation, accessibility, and motion — what actually changes when you design for dark environments.',
      initials:'MV',
      avColor: '#EC4899',
      speaker: 'Mariana Villar',
      role:    'Principal Designer, Rappi',
    },
    {
      time:    '16:30 — 17:15',
      type:    'WORKSHOP',
      room:    'Lab 2 — Limited',
      trackKey:'AI',
      tagColor:'#A855F7',
      tagBg:   '#A855F71F',
      title:   'Workshop: Agentic Workflows in Production',
      desc:    "Bring your laptop. We'll build a multi-step agent with tool use and memory, then deploy it behind a real API.",
      initials:'DG',
      avColor: '#A855F7',
      speaker: 'Diego Guzmán',
      role:    'AI Engineering Lead, Globant',
    },
  ],
  evening: [
    {
      time:    '17:30 — 18:15',
      type:    'PANEL',
      room:    'Main Stage',
      trackKey:'Cybersecurity',
      tagColor:'#EA4335',
      tagBg:   '#EA43351F',
      title:   'Panel: Security & Compliance in Latin American Fintech',
      desc:    'Four practitioners discuss SOC2, local regulations, cross-border data, and how startups can move fast without breaking compliance.',
      initials:'PN',
      avColor: '#EA4335',
      speaker: 'Moderated by Paola Núñez',
      role:    'Head of Security, Azul',
    },
    {
      time:    '18:30 — 19:15',
      type:    'CLOSING',
      room:    'Auditorium A',
      trackKey:'Community',
      tagColor:'#22D3EE',
      tagBg:   '#22D3EE1F',
      title:   'Closing Keynote: What We Build Next, Together',
      desc:    'A closing reflection from the GDG Santo Domingo leads on the state of the community, lessons from 2025, and what to expect in 2027.',
      initials:'RF',
      avColor: '#22D3EE',
      speaker: 'Ricardo Fermín',
      role:    'Lead Organizer, GDG Santo Domingo',
    },
  ],
};

const DAY2_SESSIONS = {
  morning: [
    {
      time:    '09:00 — 09:45',
      type:    'KEYNOTE',
      room:    'Auditorium A',
      trackKey:'Data Engineering',
      tagColor:'#4285F4',
      tagBg:   '#4285F41F',
      title:   'Opening Keynote: The Future of Data Infrastructure',
      desc:    'How modern data platforms are evolving beyond the warehouse — real-time streaming, lakehouses, and what comes next.',
      initials:'DK',
      avColor: '#4285F4',
      speaker: 'Diego Kaminetzky',
      role:    'VP Engineering, Stripe',
    },
    {
      time:    '10:00 — 10:45',
      type:    'TALK',
      room:    'Main Stage',
      trackKey:'AI',
      tagColor:'#A855F7',
      tagBg:   '#A855F71F',
      title:   'Building Reliable AI Pipelines with dbt and Airflow',
      desc:    'Patterns for orchestrating ML feature pipelines that are versioned, tested, and observable in production.',
      initials:'AN',
      avColor: '#A855F7',
      speaker: 'Andrea Núñez',
      role:    'Staff ML Engineer, Hugging Face',
    },
    {
      time:    '11:00 — 11:45',
      type:    'TALK',
      room:    'Room B',
      trackKey:'UI/UX',
      tagColor:'#EC4899',
      tagBg:   '#EC48991F',
      title:   'Design Systems at Scale: From Figma to Production',
      desc:    'How to maintain a living design system across 12 product teams without losing consistency or developer sanity.',
      initials:'SO',
      avColor: '#EC4899',
      speaker: 'Sofía Tavárez',
      role:    'Design Director, Figma',
    },
    {
      time:    '11:45 — 12:30',
      type:    'WORKSHOP',
      room:    'Lab 1 — Limited',
      trackKey:'Cybersecurity',
      tagColor:'#EA4335',
      tagBg:   '#EA43351F',
      title:   'Workshop: Hands-on Threat Modelling with STRIDE',
      desc:    'Walk through a realistic microservices threat model from scratch. Identify attack surfaces, mitigate risks, and document findings.',
      initials:'LP',
      avColor: '#EA4335',
      speaker: 'Lorenzo Pérez',
      role:    'Security Researcher, GitHub',
    },
  ],
  afternoon: [
    {
      time:    '13:30 — 14:15',
      type:    'TALK',
      room:    'Main Stage',
      trackKey:'AI',
      tagColor:'#A855F7',
      tagBg:   '#A855F71F',
      title:   'Agents Beyond the Demo: Production Hardening',
      desc:    "What nobody tells you when you ship your first agent to 100k users — rate limits, failure modes, and the cost surprise.",
      initials:'MF',
      avColor: '#A855F7',
      speaker: 'Mateo Ferrari',
      role:    'Research Engineer, Anthropic',
    },
    {
      time:    '14:30 — 15:15',
      type:    'TALK',
      room:    'Room B',
      trackKey:'Testing',
      tagColor:'#34A853',
      tagBg:   '#34A8531F',
      title:   'Testing AI Systems: Evals, Assertions, and Trust',
      desc:    'How to build meaningful evals for LLM-powered features that give you real confidence before shipping.',
      initials:'LC',
      avColor: '#34A853',
      speaker: 'Lina Contreras',
      role:    'SDET Lead, Microsoft',
    },
    {
      time:    '15:30 — 16:15',
      type:    'TALK',
      room:    'Lab 1',
      trackKey:'Data Engineering',
      tagColor:'#4285F4',
      tagBg:   '#4285F41F',
      title:   'Real-time CDC Pipelines with Debezium + Kafka',
      desc:    'Change-data capture patterns for keeping your analytics warehouse in sync with millisecond latency.',
      initials:'CE',
      avColor: '#4285F4',
      speaker: 'Carlos Eusebio',
      role:    'Principal Engineer, Databricks',
    },
    {
      time:    '16:30 — 17:15',
      type:    'WORKSHOP',
      room:    'Lab 2 — Limited',
      trackKey:'UI/UX',
      tagColor:'#EC4899',
      tagBg:   '#EC48991F',
      title:   'Workshop: Prototyping Micro-interactions in Figma',
      desc:    'Build production-ready interaction prototypes using variables, spring animations, and component states.',
      initials:'VO',
      avColor: '#EC4899',
      speaker: 'Valentina Ortiz',
      role:    'Product Designer, Linear',
    },
  ],
  evening: [
    {
      time:    '17:30 — 18:15',
      type:    'PANEL',
      room:    'Main Stage',
      trackKey:'Community',
      tagColor:'#22D3EE',
      tagBg:   '#22D3EE1F',
      title:   'Panel: What Should Engineering Culture Look Like in 2027?',
      desc:    'Organisational patterns, async-first teams, and how leading companies are rethinking how engineers work.',
      initials:'AS',
      avColor: '#22D3EE',
      speaker: 'Aldo Sánchez',
      role:    'AI Lead, Replit',
    },
    {
      time:    '18:30 — 19:15',
      type:    'CLOSING',
      room:    'Auditorium A',
      trackKey:'Community',
      tagColor:'#22D3EE',
      tagBg:   '#22D3EE1F',
      title:   'Closing Keynote: What We Build Next, Together',
      desc:    'A closing reflection from the GDG Santo Domingo leads on the state of the community, lessons from 2025, and what to expect in 2027.',
      initials:'RF',
      avColor: '#22D3EE',
      speaker: 'Ricardo Fermín',
      role:    'Lead Organizer, GDG Santo Domingo',
    },
  ],
};

// ─── sub-components ───────────────────────────────────────────────────────────

interface Session {
  time: string;
  type: string;
  room: string;
  trackKey: string;
  tagColor: string;
  tagBg: string;
  title: string;
  desc: string;
  initials: string;
  avColor: string;
  speaker: string;
  role: string;
}

function BlockHeader({
  label,
  iconColor,
  timeRange,
}: {
  label: string;
  iconColor: string;
  timeRange: string;
}) {
  return (
    <div
      className={styles.blockHeader}
      style={{ '--icon-color': iconColor } as React.CSSProperties}
    >
      <div className={styles.blockHeaderLabelWrap}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="var(--icon-color)">
          <circle cx="12" cy="12" r="10" />
        </svg>
        <span className={styles.blockHeaderLabelText}>{label}</span>
      </div>
      <span className={styles.blockHeaderTime}>{timeRange}</span>
      <div className={styles.blockHeaderLine} />
    </div>
  );
}

function SessionCard({
  session,
}: {
  session: Session;
}) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-[14px] md:gap-0 p-5 md:px-8 md:py-7 rounded-[14px] w-full box-border ${styles.sessionCard}`}
      style={{
        '--tag-color': session.tagColor,
        '--tag-bg': session.tagBg,
        '--av-color': session.avColor,
      } as React.CSSProperties}
    >
      {/* Time column */}
      <div
        className={`w-full md:w-[160px] flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-2 pr-0 md:pr-8 pb-[14px] md:pb-0 ${styles.timeCol}`}
      >
        <span className={styles.sessionTime}>{session.time}</span>
        <div className={styles.sessionTypeBadge}>
          <span className={styles.sessionTypeLabel}>{session.type}</span>
        </div>
        <span className={styles.sessionRoom}>{session.room}</span>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col gap-3 pl-0 md:pl-8">
        {/* Track tag */}
        <div className={styles.trackTag}>
          <div className={styles.trackDot} />
          <span className={styles.trackLabel}>{session.trackKey}</span>
        </div>

        {/* Title */}
        <h3 className={`text-[18px] md:text-[22px] m-0 ${styles.sessionTitle}`}>
          {session.title}
        </h3>

        {/* Description */}
        <p className={styles.sessionDesc}>{session.desc}</p>

        {/* Speaker row */}
        <div className={styles.speakerRow}>
          <div className={styles.avatar}>
            <span className={styles.avatarInitials}>{session.initials}</span>
          </div>
          <div>
            <div className={styles.speakerName}>{session.speaker}</div>
            <div className={styles.speakerRole}>{session.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const { isDark } = useTheme();
  const siteConfig = useSiteConfig();
  const t = useTokens(isDark);
  const tp = useTranslations('schedulePage');

  if (!siteConfig.show_schedule) {
    return (
      <div className={styles.page} style={{ '--bg-primary': isDark ? '#0A0A0F' : '#FFFFFF', display: 'flex', flexDirection: 'column', minHeight: '100vh' } as React.CSSProperties}>
        <Header />
        <ComingSoon message={siteConfig.schedule_coming_soon_msg} isDark={isDark} />
        <Footer />
      </div>
    );
  }

  const FILTERS = [
    { label: tp('filterAll'), color: null },
    { label: 'AI', color: '#A855F7' },
    { label: 'Cybersecurity', color: '#EA4335' },
    { label: 'Testing', color: '#34A853' },
    { label: 'Data Engineering', color: '#4285F4' },
    { label: 'UI/UX', color: '#EC4899' },
    { label: 'Workshops', color: '#FBBC04' },
  ];

  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [activeFilter, setActiveFilter] = useState(tp('filterAll'));
  const [dbDays, setDbDays] = useState<DayBlock[] | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('talks')
      .select('id, title, description, track, room, starts_at, ends_at, talk_type, speakers(name, title, company)')
      .order('starts_at')
      .then(({ data }) => {
        if (data && data.length > 0) setDbDays(groupByDays(data as unknown as TalkRow[]));
      });
  }, []);

  const daysData = dbDays ?? [DAY1_SESSIONS, DAY2_SESSIONS];
  const dayData = daysData[activeDay - 1] ?? { morning: [], afternoon: [], evening: [] };

  const filterAll = tp('filterAll');

  function filterSessions(sessions: Session[]) {
    if (activeFilter === filterAll) return sessions;
    if (activeFilter === 'Workshops')
      return sessions.filter((s) => s.type === 'WORKSHOP');
    return sessions.filter((s) => s.trackKey === activeFilter);
  }

  return (
    <div
      className={styles.page}
      style={{
        '--bg-primary':    t.bgPrimary,
        '--bg-secondary':  t.bgSecondary,
        '--bg-card':       t.bgCard,
        '--bg-tertiary':   t.bgTertiary,
        '--border-subtle': t.borderSubtle,
        '--border-strong': t.borderStrong,
        '--fg-primary':    t.fgPrimary,
        '--fg-secondary':  t.fgSecondary,
        '--fg-muted':      t.fgMuted,
        '--fg-inverse':    t.fgInverse,
        '--neon-purple':   t.neonPurple,
        '--neon-cyan':     t.neonCyan,
        '--neon-pink':     t.neonPink,
        '--accent-green':  t.accentGreen,
        '--accent-yellow': t.accentYellow,
        '--accent-blue':   t.accentBlue,
        '--accent-red':    t.accentRed,
        '--hero-bg': isDark
          ? `radial-gradient(ellipse 120% 90% at 50% 10%, rgba(168,85,247,0.35) 0%, transparent 70%),
             radial-gradient(ellipse 80% 80% at 15% 90%, rgba(34,211,238,0.25) 0%, transparent 70%),
             #0A0A0F`
          : `radial-gradient(ellipse 120% 90% at 50% 10%, rgba(124,58,237,0.15) 0%, transparent 70%),
             radial-gradient(ellipse 80% 80% at 15% 90%, rgba(8,145,178,0.1) 0%, transparent 70%),
             #FFFFFF`,
        '--cta-bg': isDark
          ? `radial-gradient(ellipse 90% 120% at 50% 50%, rgba(168,85,247,0.25) 0%, transparent 70%), #0A0A0F`
          : `radial-gradient(ellipse 90% 120% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%), #FFFFFF`,
      } as React.CSSProperties}
    >
      <Header />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className={`px-5 md:px-[120px] py-16 md:py-24 flex flex-col items-center gap-7 box-border ${styles.hero}`}>
        {/* Badge */}
        <div className={styles.heroBadge}>
          <div className={styles.heroBadgeDot} />
          <span className={styles.heroBadgeText}>
            {tp('badgeText')}
          </span>
        </div>

        {/* Title */}
        <h1 className={`text-[40px] md:text-[72px] text-center [letter-spacing:-1px] md:[letter-spacing:-2px] max-w-full md:max-w-[1000px] m-0 whitespace-pre-line ${styles.heroTitle}`}>
          {tp('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p className={`text-base md:text-[18px] text-center max-w-[720px] m-0 ${styles.heroSubtitle}`}>
          {tp('heroSubtitle')}
        </p>
      </section>

      {/* ── SCHEDULE SECTION ───────────────────────────────────────── */}
      <section className={`px-5 md:px-[120px] py-12 md:py-20 flex flex-col gap-12 box-border ${styles.scheduleSection}`}>
        {/* Day switcher */}
        <div className={styles.daySwitcher}>
          <div className={styles.daySwitcherInner}>
            {([1, 2] as const).map((day) => {
              const active = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`${styles.tab} ${active ? styles.tabActive : ''}`}
                >
                  <span className={styles.tabLabel}>{day === 1 ? tp('day1') : tp('day2')}</span>
                  <span className={styles.tabDate}>{day === 1 ? tp('date1') : tp('date2')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter row */}
        <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          {/* Filter chips */}
          <div className={styles.filterChips}>
            {FILTERS.map((f) => {
              const active = activeFilter === f.label;
              return (
                <button
                  key={f.label}
                  onClick={() => setActiveFilter(f.label)}
                  className={`${styles.filterChip} ${active ? styles.filterChipActive : ''}`}
                  style={f.color ? { '--dot-color': f.color } as React.CSSProperties : undefined}
                >
                  {f.color && <div className={styles.filterChipDot} />}
                  <span className={styles.filterChipLabel}>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className={`flex items-center gap-[10px] px-4 py-[10px] rounded-lg flex-shrink-0 w-full md:w-[260px] box-border ${styles.searchBox}`}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--fg-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className={styles.searchText}>{tp('searchSessions')}</span>
          </div>
        </div>

        {/* ── MORNING BLOCK ── */}
        {filterSessions(dayData.morning).length > 0 && (
          <div className={styles.timeBlock}>
            <BlockHeader
              label={tp('morning')}
              iconColor={t.accentYellow}
              timeRange="09:00 — 12:30"
            />
            {filterSessions(dayData.morning).map((s) => (
              <SessionCard key={s.title} session={s} />
            ))}
          </div>
        )}

        {/* ── LUNCH BREAK ── */}
        {activeFilter === filterAll && (
          <div className={`flex items-center gap-4 px-6 py-5 rounded-2xl flex-wrap md:flex-nowrap ${styles.breakStrip}`}>
            <div className={styles.breakIcon}>
              <span className="text-[18px]">🍽</span>
            </div>
            <div className="flex-1">
              <div className={styles.breakTitle}>{tp('lunchTitle')}</div>
              <div className={styles.breakSubtitle}>
                {tp('lunchSubtitle')}
              </div>
            </div>
            <span className={styles.breakTime}>{tp('lunchTime')}</span>
          </div>
        )}

        {/* ── AFTERNOON BLOCK ── */}
        {filterSessions(dayData.afternoon).length > 0 && (
          <div className={styles.timeBlock}>
            <BlockHeader
              label={tp('afternoon')}
              iconColor={t.accentYellow}
              timeRange="13:30 — 17:15"
            />
            {filterSessions(dayData.afternoon).map((s) => (
              <SessionCard key={s.title} session={s} />
            ))}
          </div>
        )}

        {/* ── EVENING BLOCK ── */}
        {filterSessions(dayData.evening).length > 0 && (
          <div className={styles.timeBlock}>
            <BlockHeader
              label={tp('evening')}
              iconColor={t.neonPink}
              timeRange="17:30 — 20:00"
            />
            {filterSessions(dayData.evening).map((s) => (
              <SessionCard key={s.title} session={s} />
            ))}

            {/* After-party strip */}
            {activeFilter === filterAll && (
              <div className={`flex items-center gap-4 px-6 py-5 rounded-2xl flex-wrap md:flex-nowrap ${styles.breakStrip}`}>
                <div className={styles.breakIcon}>
                  <span className="text-[18px]">🎉</span>
                </div>
                <div className="flex-1">
                  <div className={styles.breakTitle}>{tp('afterPartyTitle')}</div>
                  <div className={styles.breakSubtitle}>
                    {tp('afterPartySubtitle')}
                  </div>
                </div>
                <span className={styles.breakTime}>{tp('afterPartyTime')}</span>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {filterSessions(dayData.morning).length === 0 &&
          filterSessions(dayData.afternoon).length === 0 &&
          filterSessions(dayData.evening).length === 0 && (
            <div className={styles.emptyState}>
              {tp('noSessions')}
            </div>
          )}
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className={`px-5 md:px-[120px] py-[60px] md:py-20 flex justify-center box-border ${styles.ctaSection}`}>
        <div className={`w-full max-w-[900px] rounded-3xl flex flex-col gap-5 px-6 py-10 md:px-14 md:py-12 ${styles.ctaCard}`}>
          {/* Badge */}
          <div className={styles.ctaBadge}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--neon-cyan)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className={styles.ctaBadgeText}>{tp('ctaBadge')}</span>
          </div>

          {/* Title */}
          <h2 className={`text-[32px] md:text-[40px] m-0 ${styles.ctaTitle}`}>
            {tp('ctaTitle')}
          </h2>

          {/* Desc */}
          <p className={styles.ctaDesc}>
            {tp('ctaDesc')}
          </p>

          {/* Buttons */}
          <div className={styles.ctaButtons}>
            <button className={styles.btnPrimary}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {tp('downloadBtn')}
            </button>

            <button className={styles.btnSecondary}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {tp('calendarBtn')}
            </button>
          </div>

          {/* Meta */}
          <div className={styles.ctaMeta}>
            {[
              tp('ctaMeta1'),
              tp('ctaMeta2'),
            ].map((label) => (
              <div key={label} className={styles.ctaMetaItem}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-green)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className={styles.ctaMetaLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
