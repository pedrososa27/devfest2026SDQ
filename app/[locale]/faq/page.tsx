'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Info, Search, LayoutGrid, Ticket, CalendarDays, MapPin, Mic, ShieldCheck,
  Plus, Minus, ArrowUpRight, MessageCircle, Mail, Send, ArrowRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

type Category = 'all' | 'tickets' | 'schedule' | 'venue' | 'speakers' | 'conduct';

interface FaqItem {
  id: string;
  category: Category;
  dotColor: string;
  tagLabel: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: 'q1',
    category: 'tickets',
    dotColor: '$neon-purple',
    tagLabel: 'TICKETS',
    question: 'How much does a DevFest SDQ ticket cost?',
    answer: 'Tickets start at $25 USD for the Community tier (students, early-stage devs, and members of GDG chapters), $45 USD for the General tier, and $85 USD for the Pro tier — which includes workshop access, lunch, and event swag. Sponsors receive complimentary tickets based on their tier. We also reserve a number of free Community Scholarship tickets for under-represented developers in the Dominican tech community — applications open in July.',
  },
  {
    id: 'q2',
    category: 'tickets',
    dotColor: '$neon-purple',
    tagLabel: 'TICKETS',
    question: 'Can I get a refund if I can\'t attend?',
    answer: 'Refunds are available up to 30 days before the event. After that, tickets can be transferred to another attendee. Please contact us at tickets@gdg-sdq.dev for refund requests.',
  },
  {
    id: 'q3',
    category: 'schedule',
    dotColor: '$neon-cyan',
    tagLabel: 'SCHEDULE',
    question: 'What\'s the difference between a talk and a workshop?',
    answer: 'Talks are 30–45 minute presentations in the main or breakout rooms — they\'re open to all attendees. Workshops are hands-on 90-minute technical sessions with limited capacity that require Pro ticket access or a separate workshop add-on.',
  },
  {
    id: 'q4',
    category: 'schedule',
    dotColor: '$neon-cyan',
    tagLabel: 'SCHEDULE',
    question: 'Will sessions be recorded and published online?',
    answer: 'Yes! All main stage talks will be recorded and published to the GDG Santo Domingo YouTube channel within two weeks of the event. Workshop recordings are shared only with registered attendees.',
  },
  {
    id: 'q5',
    category: 'venue',
    dotColor: '$neon-pink',
    tagLabel: 'VENUE',
    question: 'Where exactly is the venue and how do I get there?',
    answer: 'DevFest SDQ 2026 takes place at Centro León, Av. 27 de Febrero 146, Santiago de los Caballeros. Full directions and a travel guide will be shared with all registered attendees closer to the event date.',
  },
  {
    id: 'q6',
    category: 'venue',
    dotColor: '$neon-pink',
    tagLabel: 'VENUE',
    question: 'Is there parking on-site? What about public transit?',
    answer: 'Yes, Centro León has on-site parking available. The venue is also accessible via public transit — we\'ll include detailed transit routes and a carpool coordination channel in the attendee guide.',
  },
  {
    id: 'q7',
    category: 'speakers',
    dotColor: '$accent-yellow',
    tagLabel: 'SPEAKERS',
    question: 'How do I submit a talk proposal? When does the CFP close?',
    answer: 'Submit your proposal through our CFP form at devfestsdq.com/cfp. The Call for Proposals closes on August 31, 2026. We welcome talks in English and Spanish on topics related to Google technologies, open source, developer tools, and community.',
  },
  {
    id: 'q8',
    category: 'speakers',
    dotColor: '$accent-yellow',
    tagLabel: 'SPEAKERS',
    question: 'Do speakers receive travel and accommodation support?',
    answer: 'Selected speakers from outside the Dominican Republic may be eligible for travel and accommodation support, depending on sponsorship availability. Local speakers receive complimentary event tickets and are invited to the speaker dinner.',
  },
  {
    id: 'q9',
    category: 'conduct',
    dotColor: '$accent-green',
    tagLabel: 'CODE OF CONDUCT',
    question: 'How do I report a Code of Conduct violation during the event?',
    answer: 'You can report violations to any staff member wearing a DevFest lanyard, at the registration desk, or by texting our dedicated safety line (number shared at registration). All reports are handled confidentially and with urgency.',
  },
  {
    id: 'q10',
    category: 'conduct',
    dotColor: '$accent-green',
    tagLabel: 'CODE OF CONDUCT',
    question: 'Is the event accessible? What accommodations do you provide?',
    answer: 'Yes. The venue is fully wheelchair accessible. We provide live captioning for main stage talks, quiet rest areas, gender-neutral restrooms, and a nursing room. Contact us in advance at accessibility@gdg-sdq.dev for additional accommodation requests.',
  },
  {
    id: 'q11',
    category: 'all',
    dotColor: '$accent-blue',
    tagLabel: 'GENERAL',
    question: 'Will there be food and drinks? Are dietary needs covered?',
    answer: 'Pro ticket holders receive a catered lunch. All attendees have access to coffee, snacks, and refreshments throughout the day. We offer vegetarian, vegan, and gluten-free options. Please indicate dietary needs when registering.',
  },
  {
    id: 'q12',
    category: 'all',
    dotColor: '$accent-blue',
    tagLabel: 'GENERAL',
    question: 'Can I bring my laptop / charger? Is there reliable Wi-Fi?',
    answer: 'Absolutely. Bring your laptop, especially if you\'re attending workshops. The venue provides high-speed Wi-Fi to all attendees. Power strips will be available in the main hall and workshop rooms.',
  },
];

const QUICK_LINKS = [
  'quickLink1',
  'quickLink2',
  'quickLink3',
  'quickLink4',
  'quickLink5',
];

export default function FAQPage() {
  const { isDark } = useTheme();
  const t = useTokens(isDark);
  const tp = useTranslations('faqPage');

  const CATEGORIES = [
    { id: 'all' as Category, label: tp('categories.all'), count: 24, icon: LayoutGrid, color: '$neon-purple' },
    { id: 'tickets' as Category, label: tp('categories.tickets'), count: 6, icon: Ticket, color: '$neon-purple' },
    { id: 'schedule' as Category, label: tp('categories.schedule'), count: 5, icon: CalendarDays, color: '$neon-cyan' },
    { id: 'venue' as Category, label: tp('categories.venue'), count: 4, icon: MapPin, color: '$neon-pink' },
    { id: 'speakers' as Category, label: tp('categories.speakers'), count: 5, icon: Mic, color: '$accent-yellow' },
    { id: 'conduct' as Category, label: tp('categories.conduct'), count: 4, icon: ShieldCheck, color: '$accent-green' },
  ];

  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [openId, setOpenId] = useState<string | null>('q1');
  const [search, setSearch] = useState('');

  const resolveColor = (token: string) => {
    const map: Record<string, string> = {
      '$neon-purple': t.neonPurple,
      '$neon-cyan': t.neonCyan,
      '$neon-pink': t.neonPink,
      '$accent-yellow': t.accentYellow,
      '$accent-green': t.accentGreen,
      '$accent-blue': t.accentBlue,
      '$accent-red': t.accentRed,
    };
    return map[token] ?? token;
  };

  const filtered = FAQ_DATA.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory || item.category === 'all';
    const q = search.toLowerCase();
    const matchSearch = !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

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
        '--neon-purple-a35': `${t.neonPurple}59`,
        '--neon-cyan-a25': `${t.neonCyan}40`,
        '--neon-purple-a40': `${t.neonPurple}66`,
      } as React.CSSProperties}
    >
      <Header />

      {/* Hero Section */}
      <section className={`${styles.hero} py-24 px-5 md:px-[120px]`}>
        {/* Badge */}
        <div className={styles.badge}>
          <Info size={14} color={t.neonCyan} />
          <span className={styles.badgeText}>{tp('badgeText')}</span>
        </div>

        {/* Headline */}
        <h1 className={`${styles.headline} text-[48px] md:text-[84px] whitespace-pre-line`}>
          {tp('headline')}
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          {tp('subtitle')}
        </p>

        {/* Search Bar */}
        <div className={`${styles.searchBar} w-full md:w-[560px]`}>
          <Search size={18} color={t.fgMuted} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={tp('searchPlaceholder')}
            className={styles.searchInput}
          />
          <div className={styles.searchKbd}>
            <span className={styles.searchKbdText}>⌘K</span>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <nav className={`${styles.categoriesNav} flex items-center justify-center flex-wrap gap-[10px] py-8 px-5 md:px-[120px]`}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          const iconColor = resolveColor(cat.color);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles.catButton} ${isActive ? styles.catActive : ''}`}
            >
              <cat.icon size={14} color={isActive ? '#ffffff' : iconColor} />
              <span className={styles.catLabel}>{cat.label}</span>
              <span className={styles.catCount}>{cat.count}</span>
            </button>
          );
        })}
      </nav>

      {/* FAQ List Section */}
      <section className={`${styles.faqSection} flex flex-col md:flex-row gap-[80px] py-20 px-5 md:px-[120px]`}>
        {/* Sidebar */}
        <aside className="hidden md:flex w-[280px] shrink-0 flex-col gap-6">
          {/* Sidebar badge */}
          <div className={styles.sidebarBadge}>
            <div className={styles.sidebarDot} />
            <span className={styles.sidebarBadgeText}>{tp('sidebarBrowsing')}</span>
          </div>

          <h3 className={styles.sidebarHeading}>{tp('quickLinksTitle')}</h3>

          <div className={styles.quickLinks}>
            {QUICK_LINKS.map(key => (
              <div key={key} className={styles.quickLink}>
                <span className={styles.quickLinkLabel}>{tp(key as Parameters<typeof tp>[0])}</span>
                <ArrowUpRight size={14} color={t.fgMuted} />
              </div>
            ))}
          </div>
        </aside>

        {/* FAQ Accordion */}
        <div className={styles.accordion}>
          {filtered.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                style={{ '--item-dot-color': resolveColor(item.dotColor) } as React.CSSProperties}
              >
                {/* Header row */}
                <div
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className={`${styles.itemHeader} ${isOpen ? styles.itemHeaderOpen : ''}`}
                >
                  <div className={styles.itemHeaderInner}>
                    {/* Tag */}
                    <div className={styles.tag}>
                      <div className={styles.tagDot} />
                      <span className={styles.tagLabel}>{item.tagLabel}</span>
                    </div>
                    {/* Question */}
                    <span className={`${styles.question} ${isOpen ? styles.questionOpen : ''}`}>
                      {item.question}
                    </span>
                  </div>

                  {/* Toggle button */}
                  <div className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnOpen : ''}`}>
                    {isOpen
                      ? <Minus size={16} color="#ffffff" />
                      : <Plus size={16} color={t.fgPrimary} />
                    }
                  </div>
                </div>

                {/* Open content */}
                {isOpen && (
                  <div className={styles.itemBody}>
                    <div className={styles.divider} />
                    <p className={styles.answer}>{item.answer}</p>
                    <div className={styles.itemFooter}>
                      <div className={styles.itemFooterLink}>
                        <span className={styles.itemFooterLinkLabel}>{tp('seeTickets')}</span>
                        <ArrowRight size={13} color={t.fgPrimary} />
                      </div>
                      <div className={styles.helpfulHint}>
                        <span className={styles.helpfulEmoji}>👍</span>
                        <span className={styles.helpfulHintText}>{tp('helpful')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className={`${styles.ctaSection} py-20 px-5 md:px-[120px] flex flex-col gap-8`}>
        <div className={`${styles.ctaCard} flex flex-col md:flex-row items-center justify-between gap-[40px] py-8 px-6 md:py-12 md:px-14`}>
          {/* Left */}
          <div className="flex flex-col gap-[14px] max-w-[560px] w-full">
            <div className={styles.ctaBadge}>
              <MessageCircle size={14} color={t.neonCyan} />
              <span className={styles.ctaBadgeText}>{tp('stuckBadge')}</span>
            </div>
            <h2 className={`${styles.ctaHeadline} text-[36px] md:text-[48px] whitespace-pre-line`}>
              {tp('stuckHeadline')}
            </h2>
            <p className={styles.ctaBody}>
              {tp('stuckBody')}
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3 w-full md:w-[300px]">
            <button className={styles.ctaBtnPrimary}>
              <Mail size={16} color="#ffffff" />
              <span className={styles.ctaBtnPrimaryLabel}>{tp('emailBtn')}</span>
            </button>
            <button className={styles.ctaBtnSecondary}>
              <Send size={16} color={t.fgPrimary} />
              <span className={styles.ctaBtnSecondaryLabel}>{tp('discordMsg')}</span>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
