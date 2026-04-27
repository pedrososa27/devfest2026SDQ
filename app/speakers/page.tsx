'use client';

import { useState } from 'react';
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
  const t = useTokens(isDark);
  const [activeFilter, setActiveFilter] = useState('All speakers');

  const filters = [
    { label: 'All speakers', count: 42, color: t.neonPurple },
    { label: 'AI', count: 12, color: t.neonPurple },
    { label: 'Cybersecurity', count: 7, color: t.accentRed },
    { label: 'Testing', count: 6, color: t.accentGreen },
    { label: 'Data Engineering', count: 9, color: t.accentBlue },
    { label: 'UI / UX', count: 8, color: t.neonPink },
    { label: 'Workshops', count: 5, color: t.accentYellow },
  ];

  const keynotes = [
    {
      day: 'DAY 1 — OPENING KEYNOTE',
      dayDot: t.neonPurple,
      name: 'María Valentina Reyes',
      role: 'Principal Engineer · Google DeepMind',
      location: 'London, UK',
      locationColor: t.neonCyan,
      talk: '"Beyond benchmarks: how we ship reliable agents at planet scale."',
      pills: [
        { label: 'AI', color: t.neonPurple },
        { label: '45 min', color: null },
      ],
      photoColor: t.neonPurple,
    },
    {
      day: 'DAY 2 — OPENING KEYNOTE',
      dayDot: t.neonCyan,
      name: 'Diego Kaminetzky',
      role: 'VP Engineering · Stripe',
      location: 'Buenos Aires, AR',
      locationColor: t.neonPink,
      talk: '"Engineering at fintech speed: building global payments without losing your mind."',
      pills: [
        { label: 'Data Engineering', color: t.accentBlue },
        { label: '45 min', color: null },
      ],
      photoColor: t.neonCyan,
    },
  ];

  const speakers = [
    { name: 'Andrea Núñez', role: 'Staff ML Engineer · Hugging Face', location: 'Madrid, ES', track: 'AI', color: t.neonPurple },
    { name: 'Lorenzo Pérez', role: 'Security Researcher · GitHub', location: 'Lima, PE', track: 'CYBERSEC', color: t.accentRed },
    { name: 'Camila Rojas', role: 'QA Lead · Mercado Libre', location: 'Bogotá, CO', track: 'TESTING', color: t.accentGreen },
    { name: 'Sofía Tavárez', role: 'Design Director · Figma', location: 'Santo Domingo, DR', track: 'UI / UX', color: t.neonPink },
    { name: 'Rafael Méndez', role: 'Sr. Data Eng · Snowflake', location: 'Mexico City, MX', track: 'DATA ENG', color: t.accentBlue },
    { name: 'Mateo Ferrari', role: 'Research Eng · Anthropic', location: 'São Paulo, BR', track: 'AI', color: t.neonPurple },
    { name: 'Isabella Capellán', role: 'Pen Tester · Cloudflare', location: 'Santo Domingo, DR', track: 'CYBERSEC', color: t.accentRed },
    { name: 'Joaquín Bermúdez', role: 'DX Lead · Vercel', location: 'Madrid, ES', track: 'WORKSHOP', color: t.accentYellow },
    { name: 'Valentina Ortiz', role: 'Product Designer · Linear', location: 'Santiago, CL', track: 'UI / UX', color: t.neonPink },
    { name: 'Carlos Eusebio', role: 'Principal Eng · Databricks', location: 'Punta Cana, DR', track: 'DATA ENG', color: t.accentBlue },
    { name: 'Lina Contreras', role: 'SDET Lead · Microsoft', location: 'San José, CR', track: 'TESTING', color: t.accentGreen },
    { name: 'Aldo Sánchez', role: 'AI Lead · Replit', location: 'Buenos Aires, AR', track: 'AI', color: t.neonCyan },
  ];

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
          <span className={styles.heroBadgeText}>WORLD-CLASS LINEUP // 2026 EDITION</span>
        </div>

        {/* "Meet the speakers" */}
        <span className={styles.heroLabel}>Meet the speakers</span>

        {/* Main title */}
        <h1
          className={`text-[44px] md:text-[88px] font-bold text-center tracking-[-1px] md:tracking-[-3px] leading-[1.02] m-0 max-w-full md:max-w-[1100px] ${styles.heroTitle}`}
        >
          The minds shaping
          <br />
          our 2026 stage.
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[16px] md:text-[18px] text-center leading-[1.6] m-0 max-w-[720px] ${styles.heroSubtitle}`}
        >
          40+ engineers, designers, and researchers from across Latin America and beyond — sharing
          what they&apos;re building, breaking, and learning right now.
        </p>

        {/* Meta pills */}
        <div className={styles.heroPills}>
          {[
            { color: t.neonCyan, label: '42 speakers' },
            { color: t.neonPink, label: '12 countries' },
            { color: t.accentYellow, label: '5 tracks' },
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
            <span className={styles.filterLabelText}>FILTER BY TRACK</span>
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
            <span className={styles.searchText}>Search speakers, talks, companies…</span>
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
              <span className={styles.keynoteLabelText}>FEATURED KEYNOTES</span>
            </div>

            <h2
              className={`text-[36px] md:text-[56px] font-bold m-0 leading-[1.1] ${styles.keynoteTitle}`}
            >
              Headlining the
              <br />
              main stage.
            </h2>
          </div>

          <p
            className={`hidden md:block max-w-[380px] m-0 shrink-0 leading-[1.6] ${styles.keynoteDesc}`}
          >
            Two days. Two opening keynotes from people who don&apos;t just write the specs — they
            ship the systems that millions of developers build on top of.
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
                    <span className={styles.keynoteLocationText}>{k.location}</span>
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
            Meet the full lineup
          </h2>
          <div className={styles.sortBtn}>
            <span className={styles.sortBtnText}>Sort by: Name</span>
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
            See all 42 speakers
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
            <span className={styles.ctaBadgeText}>CALL FOR PAPERS · OPEN UNTIL APR 30</span>
          </div>

          <h2
            className={`text-[40px] md:text-[64px] font-bold m-0 leading-[1.1] tracking-[-1px] md:tracking-[-2px] ${styles.ctaTitle}`}
          >
            Got something
            <br />
            worth sharing?
          </h2>

          <p className={styles.ctaSubtext}>
            We&apos;re still looking for talks, lightning sessions, and workshops on AI, cloud,
            security, data engineering, and more.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.ctaSubmitBtn}>
              Submit a talk
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
              CFP guidelines
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
