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
import type { Speaker } from '../../../lib/supabase/types';

const TRACK_COLORS: Record<string, string> = {
  // From image reference
  'General': '#9CA3AF',
  'Testing': '#F97316',
  'DevOps': '#8B5CF6',
  'UX': '#3B82F6', 'UI / UX': '#3B82F6', 'UI/UX': '#3B82F6', 'Design': '#3B82F6',
  'AI': '#06B6D4', 'AI/ML': '#06B6D4', 'Machine Learning': '#06B6D4',
  'Community': '#EC4899',
  'Development': '#F59E0B', 'Web': '#F59E0B',
  'Android': '#22C55E', 'Mobile': '#10B981',
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
    accentBlue: '#4285F4',
    accentGreen: '#34A853',
    accentRed: '#EA4335',
    accentYellow: '#FBBC04',
  };
}

function PhotoBlob({ color, className }: { color: string; className?: string }) {
  return (
    <div
      className={`${styles.photoBlob} ${className ?? ''}`}
      style={{
        '--glow-0': color + '77',
        '--glow-1': color + '33',
        '--glow-2': color + 'AA',
        '--glow-3': color + '44',
      } as React.CSSProperties}
    >
      <div className={styles.photoBlobGlow1} />
      <div className={styles.photoBlobGlow2} />
    </div>
  );
}

export default function SpeakersPage() {
  const { isDark } = useTheme();
  const siteConfig = useSiteConfig();
  const t = useTokens(isDark);
  const tp = useTranslations('speakersPage');
  const [activeFilter, setActiveFilter] = useState(tp('filterAll'));
  const [dbSpeakers, setDbSpeakers] = useState<Speaker[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('speakers').select('*').order('name').then(({ data }) => {
      if (data) setDbSpeakers(data);
    });
  }, []);

  if (!siteConfig.show_speakers) {
    return (
      <div className={styles.page} style={{ '--bg-primary': isDark ? '#0A0A0F' : '#FFFFFF', display: 'flex', flexDirection: 'column', minHeight: '100vh' } as React.CSSProperties}>
        <Header />
        <ComingSoon message={siteConfig.speakers_coming_soon_msg} isDark={isDark} />
        <Footer />
      </div>
    );
  }

  // ── Derive display data from DB speakers ─────────────────────────
  const topicCounts: Record<string, number> = {};
  for (const sp of dbSpeakers) {
    for (const topic of sp.topics ?? []) {
      topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
    }
  }
  const filters = [
    { label: tp('filterAll'), count: dbSpeakers.length, color: t.neonPurple },
    ...Object.entries(topicCounts).map(([topic, count]) => ({
      label: topic,
      count,
      color: getTrackColor(topic),
    })),
  ];

  const dotColors = [t.neonPurple, t.neonCyan, t.neonPink, t.accentYellow];
  const locColors = [t.neonCyan, t.neonPink, t.neonPurple, t.accentYellow];
  const keynotes = dbSpeakers
    .filter((sp) => sp.featured)
    .map((sp, i) => ({
      day: i === 0 ? 'DAY 1 — OPENING KEYNOTE' : `DAY ${i + 1} — KEYNOTE`,
      dayDot: dotColors[i % dotColors.length],
      name: sp.name,
      role: [sp.title, sp.company].filter(Boolean).join(' · '),
      location: sp.company ?? '',
      locationColor: locColors[i % locColors.length],
      locationLabel: [sp.city, sp.country].filter(Boolean).join(', ') || sp.company || '',
      talk: sp.bio ? `"${sp.bio}"` : '',
      pills: [
        ...(sp.topics?.slice(0, 1).map((topic) => ({ label: topic, color: getTrackColor(topic) })) ?? []),
        { label: '45 min', color: null },
      ],
      photoColor: getTrackColor(sp.topics?.[0]),
    }));

  const speakers = dbSpeakers
    .filter((sp) => !sp.featured)
    .map((sp) => ({
      name: sp.name,
      role: [sp.title, sp.company].filter(Boolean).join(' · '),
      location: [sp.city, sp.country].filter(Boolean).join(', '),
      track: (sp.topics?.[0] ?? 'General').toUpperCase(),
      color: getTrackColor(sp.topics?.[0]),
    }));

  const heroBg = isDark
    ? `radial-gradient(ellipse 120% 90% at 50% 10%, rgba(168,85,247,0.35) 0%, transparent 70%),
       radial-gradient(ellipse 80% 80% at 85% 90%, rgba(236,72,153,0.25) 0%, transparent 70%),
       #0A0A0F`
    : `radial-gradient(ellipse 120% 90% at 50% 10%, rgba(124,58,237,0.15) 0%, transparent 70%),
       radial-gradient(ellipse 80% 80% at 85% 90%, rgba(219,39,119,0.1) 0%, transparent 70%),
       #FFFFFF`;

  const ctaBg = isDark
    ? `radial-gradient(ellipse 90% 120% at 50% 50%, rgba(168,85,247,0.25) 0%, transparent 70%), #0A0A0F`
    : `radial-gradient(ellipse 90% 120% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%), #FFFFFF`;

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
        '--blob-bg': isDark ? '#0D0D18' : '#F2F2F8',
        '--day-tag-bg': isDark ? 'rgba(10,10,15,0.85)' : 'rgba(255,255,255,0.9)',
        '--day-tag-text': isDark ? '#FFFFFF' : '#141413',
        '--hero-bg': heroBg,
        '--cta-bg': ctaBg,
      } as React.CSSProperties}
    >
      <Header />

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        className={`relative flex flex-col items-center gap-7 py-16 md:py-24 px-5 md:px-[120px] box-border overflow-hidden ${styles.hero}`}
      >
        {/* World-class badge */}
        <div className={styles.heroBadge}>
          <div className={styles.heroBadgeDot} />
          <span className={styles.heroBadgeText}>{tp('badgeText')}</span>
        </div>

        {/* "Meet the speakers" */}
        <span className={styles.heroLabel}>{tp('meetLabel')}</span>

        {/* Main title */}
        <h1
          className={`text-[44px] md:text-[88px] font-bold text-center tracking-[-1px] md:tracking-[-3px] leading-[1.02] m-0 max-w-full md:max-w-[1100px] whitespace-pre-line ${styles.heroTitle}`}
        >
          {tp('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[16px] md:text-[18px] text-center leading-[1.6] m-0 max-w-[720px] ${styles.heroSubtitle}`}
        >
          {tp('heroSubtitle')}
        </p>

        {/* Meta pills */}
        <div className={styles.heroPills}>
          {[
            { color: t.neonCyan, label: tp('pillSpeakers') },
            { color: t.neonPink, label: tp('pillCountries') },
            { color: t.accentYellow, label: tp('pillTracks') },
          ].map(({ color, label }) => (
            <div
              key={label}
              className={styles.heroPill}
              style={{ '--accent': color } as React.CSSProperties}
            >
              <div className={styles.heroPillDot} />
              <span className={styles.heroPillText}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FILTER BAR ─────────────────────────────────────────────── */}
      <section
        className={`flex flex-col gap-5 py-10 px-5 md:px-[120px] box-border ${styles.filterBar}`}
      >
        {/* Row: label + search */}
        <div className="flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
          <div className={styles.filterLabelRow}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.svgFgSecondary}
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span className={styles.filterLabelText}>{tp('filterByTrack')}</span>
          </div>

          <div
            className={`flex items-center gap-[10px] p-[10px_16px] rounded-lg flex-1 min-w-0 md:flex-none md:min-w-[300px] ${styles.searchBox}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.svgFgMuted}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className={styles.searchText}>{tp('searchSpeakers')}</span>
          </div>
        </div>

        {/* Chips */}
        <div className={styles.filterChips}>
          {filters.map((f) => {
            const isActive = activeFilter === f.label;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ''}`}
                style={{ '--accent': f.color } as React.CSSProperties}
              >
                {!isActive && <div className={styles.filterChipDot} />}
                <span
                  className={`${styles.filterChipLabel} ${isActive ? styles.filterChipLabelActive : ''}`}
                >
                  {f.label}
                </span>
                <span
                  className={`${styles.filterChipCount} ${isActive ? styles.filterChipCountActive : ''}`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── KEYNOTE SECTION ────────────────────────────────────────── */}
      <section
        className={`flex flex-col gap-12 py-16 md:py-24 px-5 md:px-[120px] box-border ${styles.keynoteSection}`}
      >
        {/* Section header */}
        <div className="flex items-end justify-between gap-8 flex-wrap md:flex-nowrap">
          <div className={styles.keynoteSectionHeader}>
            <div className={styles.keynoteLabel}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className={styles.svgAccentYellow}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className={styles.keynoteLabelText}>{tp('featuredTitle')}</span>
            </div>

            <h2
              className={`text-[36px] md:text-[56px] font-bold m-0 leading-[1.1] whitespace-pre-line ${styles.keynoteTitle}`}
            >
              {tp('headliningTitle')}
            </h2>
          </div>

          <p
            className={`hidden md:block max-w-[380px] m-0 shrink-0 leading-[1.6] ${styles.keynoteDesc}`}
          >
            {tp('keynoteDesc')}
          </p>
        </div>

        {/* Keynote cards */}
        <div className="flex flex-col md:flex-row gap-6">
          {keynotes.map((k) => (
            <div key={k.name} className={styles.keynoteCard}>
              {/* Photo area */}
              <div className={styles.keynotePhotoArea}>
                <PhotoBlob color={k.photoColor} className="h-[280px]" />
                {/* Day tag */}
                <div
                  className={styles.keynoteDayTag}
                  style={{ '--accent': k.dayDot } as React.CSSProperties}
                >
                  <div className={styles.keynoteDayTagDot} />
                  <span className={styles.keynoteDayTagText}>{k.day}</span>
                </div>
              </div>

              {/* Body */}
              <div className={styles.keynoteBody}>
                {/* Name row */}
                <div className={styles.keynoteNameRow}>
                  <div>
                    <div className={styles.keynoteName}>{k.name}</div>
                    <div className={styles.keynoteRole}>{k.role}</div>
                  </div>
                  <div
                    className={styles.keynoteLocationBadge}
                    style={{ '--accent': k.locationColor } as React.CSSProperties}
                  >
                    <div className={styles.keynoteLocationDot} />
                    <span className={styles.keynoteLocationText}>{k.locationLabel ?? k.location}</span>
                  </div>
                </div>

                {/* Talk */}
                <p className={styles.keynoteTalk}>{k.talk}</p>

                {/* Pills */}
                <div className={styles.keynotePills}>
                  {k.pills.map((p) => (
                    <div
                      key={p.label}
                      className={styles.keynotePill}
                      style={p.color ? ({ '--accent': p.color } as React.CSSProperties) : undefined}
                    >
                      {p.color && <div className={styles.keynotePillDot} />}
                      <span
                        className={
                          p.color ? styles.keynotePillTextColored : styles.keynotePillTextMuted
                        }
                      >
                        {p.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPEAKERS GRID ──────────────────────────────────────────── */}
      <section
        className={`flex flex-col gap-10 py-[60px] md:py-20 px-5 md:px-[120px] box-border ${styles.speakersSection}`}
      >
        {/* Grid header */}
        <div className={styles.speakersGridHeader}>
          <h2 className={`text-[28px] md:text-[40px] font-bold m-0 ${styles.speakersGridTitle}`}>
            {tp('fullLineup')}
          </h2>
          <div className={styles.sortBtn}>
            <span className={styles.sortBtnText}>{tp('sortBy')}</span>
            <span className={styles.sortBtnArrow}>↕</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {speakers.map((s) => (
            <div
              key={s.name}
              className={styles.speakerCard}
              style={{ '--accent': s.color } as React.CSSProperties}
            >
              {/* Photo */}
              <div className={styles.speakerPhotoArea}>
                <PhotoBlob color={s.color} className="h-[120px] md:h-[160px]" />
                {/* Track tag */}
                <div className={styles.speakerTrackTag}>
                  <div className={styles.speakerTrackDot} />
                  <span className={styles.speakerTrackText}>{s.track}</span>
                </div>
              </div>

              {/* Body */}
              <div className={styles.speakerBody}>
                <div
                  className={`text-[15px] md:text-[18px] font-semibold leading-[1.2] ${styles.speakerName}`}
                >
                  {s.name}
                </div>
                <div
                  className={`text-[12px] md:text-[13px] leading-[1.4] ${styles.speakerRole}`}
                >
                  {s.role}
                </div>
                <div className={styles.speakerLocationRow}>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.svgFgMuted}
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className={styles.speakerLocationText}>{s.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className={styles.loadMore}>
          <button className={styles.loadMoreBtn}>
            {tp('seeAll')}
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section
        className={`flex items-center py-[60px] md:py-20 px-5 md:px-[120px] box-border ${styles.ctaSection}`}
      >
        <div
          className={`flex-1 rounded-[20px] flex flex-col items-center gap-5 text-center py-10 px-6 md:py-16 md:px-20 ${styles.ctaCard}`}
        >
          {/* Badge */}
          <div className={styles.ctaBadge}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.svgNeonPurple}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className={styles.ctaBadgeText}>{tp('cfpBadge')}</span>
          </div>

          <h2
            className={`text-[40px] md:text-[64px] font-bold m-0 leading-[1.1] tracking-[-1px] md:tracking-[-2px] whitespace-pre-line ${styles.ctaTitle}`}
          >
            {tp('ctaTitle')}
          </h2>

          <p className={styles.ctaSubtext}>
            {tp('ctaSubtext')}
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.ctaSubmitBtn}>
              {tp('submitBtn')}
              <span>→</span>
            </button>
            <button className={styles.ctaGuidelinesBtn}>
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {tp('guidelinesBtn')}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
