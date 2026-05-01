'use client';

import { CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ComingSoonProps {
  message?: string | null;
  isDark: boolean;
}

export default function ComingSoon({ message, isDark }: ComingSoonProps) {
  const t = useTranslations('comingSoon');

  return (
    <section
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '6rem 1.25rem',
        textAlign: 'center',
        color: isDark ? '#FFFFFF' : '#141413',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: isDark ? '#1A1A24' : '#F1F1F1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CalendarClock size={24} color={isDark ? '#A855F7' : '#7C3AED'} />
      </div>

      <div style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
        {t('title')}
      </div>

      <p style={{ maxWidth: 400, fontSize: '1rem', opacity: 0.6, lineHeight: 1.6 }}>
        {message ?? t('subtitle')}
      </p>
    </section>
  );
}
