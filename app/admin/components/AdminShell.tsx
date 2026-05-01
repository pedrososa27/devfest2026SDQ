'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogout } from '../actions/auth';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/speakers', label: 'Speakers', icon: '🎤' },
  { href: '/admin/team', label: 'Team', icon: '👥' },
  { href: '/admin/schedule', label: 'Schedule', icon: '📅' },
  { href: '/admin/sponsors', label: 'Sponsors', icon: '🤝' },
  { href: '/admin/past-talks', label: 'Past Talks', icon: '🎬' },
  { href: '/admin/translations', label: 'Traducciones', icon: '🌐' },
  { href: '/admin/settings', label: 'Configuración', icon: '⚙️' },
];

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', background: '#0F0F13', color: '#E5E5E5' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 220 : 60,
        background: '#13131A',
        borderRight: '1px solid #2A2A35',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #2A2A35', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>{'<>'}</span>
          {sidebarOpen && <span style={{ fontSize: 14, fontWeight: 700, color: '#A855F7', whiteSpace: 'nowrap' }}>DevFest Admin</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(({ href, label, icon }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 10px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  background: isActive ? '#A855F722' : 'transparent',
                  color: isActive ? '#A855F7' : '#A1A1AA',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ flexShrink: 0, fontSize: 16 }}>{icon}</span>
                {sidebarOpen && <span style={{ whiteSpace: 'nowrap' }}>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid #2A2A35' }}>
          {sidebarOpen && (
            <div style={{ fontSize: 11, color: '#6B6B75', padding: '4px 10px', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userEmail}
            </div>
          )}
          <form action={adminLogout}>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: '#EF4444',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textAlign: 'left',
              }}
            >
              <span>↩</span>
              {sidebarOpen && 'Cerrar sesión'}
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{
          height: 56,
          borderBottom: '1px solid #2A2A35',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 12,
          background: '#13131A',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            style={{ background: 'none', border: 'none', color: '#A1A1AA', cursor: 'pointer', fontSize: 18, padding: 4 }}
          >
            ☰
          </button>
          <span style={{ color: '#6B6B75', fontSize: 13 }}>
            {NAV.find((n) => (n.href === '/admin' ? pathname === '/admin' : pathname.startsWith(n.href)))?.label ?? 'Admin'}
          </span>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
