import { createClient } from '../../../lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [speakers, talks, coreTeam, committee, volunteers, sponsors, pastTalks] = await Promise.all([
    supabase.from('speakers').select('id', { count: 'exact', head: true }),
    supabase.from('talks').select('id', { count: 'exact', head: true }),
    supabase.from('core_team').select('id', { count: 'exact', head: true }),
    supabase.from('committee_members').select('id', { count: 'exact', head: true }),
    supabase.from('volunteers').select('id', { count: 'exact', head: true }),
    supabase.from('sponsors').select('id', { count: 'exact', head: true }),
    supabase.from('past_talks').select('id', { count: 'exact', head: true }),
  ]);

  const stats = [
    { label: 'Speakers', count: speakers.count ?? 0, icon: '🎤', href: '/admin/speakers', color: '#A855F7' },
    { label: 'Charlas', count: talks.count ?? 0, icon: '📅', href: '/admin/schedule', color: '#22D3EE' },
    { label: 'Sponsors', count: sponsors.count ?? 0, icon: '🤝', href: '/admin/sponsors', color: '#FBBF24' },
    { label: 'Past Talks', count: pastTalks.count ?? 0, icon: '🎬', href: '/admin/past-talks', color: '#F97316' },
    { label: 'Core Team', count: coreTeam.count ?? 0, icon: '⭐', href: '/admin/team', color: '#EC4899' },
    { label: 'Comité', count: committee.count ?? 0, icon: '👥', href: '/admin/team', color: '#34A853' },
    { label: 'Voluntarios', count: volunteers.count ?? 0, icon: '🙌', href: '/admin/team', color: '#FBBC04' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: '#6B6B75', fontSize: 14, marginBottom: 32 }}>Resumen del contenido del sitio</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {stats.map((s) => (
          <a
            key={s.label}
            href={s.href}
            style={{
              display: 'block',
              padding: 20,
              background: '#16161F',
              border: `1px solid ${s.color}33`,
              borderRadius: 12,
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 13, color: '#A1A1AA', marginTop: 4 }}>{s.label}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
