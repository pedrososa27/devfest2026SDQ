'use client';

import { useState, useTransition } from 'react';
import { SiteConfig } from '../../../../lib/supabase/types';
import { updateSiteConfig } from '../../actions/crud';

type BoolFlag = {
  key: keyof Pick<SiteConfig,
    'show_schedule' | 'show_speakers' | 'show_team' |
    'show_sponsors' | 'show_cfp' | 'show_pricing' |
    'show_past_talks' | 'show_map'
  >;
  label: string;
  description: string;
  icon: string;
};

const FLAGS: BoolFlag[] = [
  { key: 'show_speakers', label: 'Speakers', description: 'Sección y página de speakers', icon: '🎤' },
  { key: 'show_schedule', label: 'Schedule', description: 'Sección y página de agenda', icon: '📅' },
  { key: 'show_team', label: 'Team', description: 'Sección y página del equipo', icon: '👥' },
  { key: 'show_sponsors', label: 'Sponsors', description: 'Sección de patrocinadores en el landing', icon: '🤝' },
  { key: 'show_cfp', label: 'CFP', description: 'Sección de Call for Papers', icon: '📢' },
  { key: 'show_pricing', label: 'Pricing', description: 'Sección de precios / tickets', icon: '🎟️' },
  { key: 'show_past_talks', label: 'Past Talks', description: 'Sección de charlas anteriores', icon: '🎬' },
  { key: 'show_map', label: 'Mapa', description: 'Sección de ubicación del evento', icon: '📍' },
];

type MsgKey = 'schedule_coming_soon_msg' | 'speakers_coming_soon_msg' | 'team_coming_soon_msg';

const MSG_FIELDS: { key: MsgKey; label: string }[] = [
  { key: 'schedule_coming_soon_msg', label: 'Mensaje "próximamente" — Schedule' },
  { key: 'speakers_coming_soon_msg', label: 'Mensaje "próximamente" — Speakers' },
  { key: 'team_coming_soon_msg', label: 'Mensaje "próximamente" — Team' },
];

export default function SettingsClient({ config }: { config: SiteConfig }) {
  const [flags, setFlags] = useState<Pick<SiteConfig,
    'show_schedule' | 'show_speakers' | 'show_team' |
    'show_sponsors' | 'show_cfp' | 'show_pricing' |
    'show_past_talks' | 'show_map'
  >>({
    show_schedule: config.show_schedule,
    show_speakers: config.show_speakers,
    show_team: config.show_team,
    show_sponsors: config.show_sponsors,
    show_cfp: config.show_cfp,
    show_pricing: config.show_pricing,
    show_past_talks: config.show_past_talks,
    show_map: config.show_map,
  });

  const [msgs, setMsgs] = useState<Record<MsgKey, string>>({
    schedule_coming_soon_msg: config.schedule_coming_soon_msg ?? '',
    speakers_coming_soon_msg: config.speakers_coming_soon_msg ?? '',
    team_coming_soon_msg: config.team_coming_soon_msg ?? '',
  });

  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  function showToast(text: string, ok: boolean) {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function toggleFlag(key: BoolFlag['key']) {
    const next = !flags[key];
    setFlags((prev) => ({ ...prev, [key]: next }));
    startTransition(async () => {
      const res = await updateSiteConfig({ [key]: next });
      if (res.error) {
        setFlags((prev) => ({ ...prev, [key]: !next }));
        showToast(res.error, false);
      } else {
        showToast('Configuración guardada', true);
      }
    });
  }

  async function saveMsgs() {
    startTransition(async () => {
      const res = await updateSiteConfig({
        schedule_coming_soon_msg: msgs.schedule_coming_soon_msg.trim() || null,
        speakers_coming_soon_msg: msgs.speakers_coming_soon_msg.trim() || null,
        team_coming_soon_msg: msgs.team_coming_soon_msg.trim() || null,
      });
      if (res.error) showToast(res.error, false);
      else showToast('Mensajes guardados', true);
    });
  }

  const updatedAt = new Date(config.updated_at).toLocaleString('es-MX', {
    dateStyle: 'medium', timeStyle: 'short',
  });

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#FFFFFF' }}>⚙️ Configuración del sitio</h1>
        <p style={{ margin: '6px 0 0', color: '#6B6B75', fontSize: 13 }}>
          Última actualización: {updatedAt}
        </p>
      </div>

      {/* Feature flags */}
      <div style={{
        background: '#13131A',
        border: '1px solid #2A2A35',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 28,
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2A2A35' }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Secciones visibles
          </h2>
        </div>

        {FLAGS.map((flag, i) => {
          const active = flags[flag.key];
          return (
            <div
              key={flag.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderBottom: i < FLAGS.length - 1 ? '1px solid #1A1A24' : undefined,
                opacity: isPending ? 0.7 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20 }}>{flag.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: 14 }}>{flag.label}</div>
                  <div style={{ color: '#6B6B75', fontSize: 12, marginTop: 2 }}>{flag.description}</div>
                </div>
              </div>

              {/* Toggle */}
              <button
                onClick={() => toggleFlag(flag.key)}
                disabled={isPending}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  border: 'none',
                  cursor: isPending ? 'not-allowed' : 'pointer',
                  background: active ? '#A855F7' : '#2A2A35',
                  position: 'relative',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
                aria-label={`${active ? 'Desactivar' : 'Activar'} ${flag.label}`}
              >
                <span style={{
                  position: 'absolute',
                  top: 3,
                  left: active ? 25 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  transition: 'left 0.2s',
                  display: 'block',
                }} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Coming soon messages */}
      <div style={{
        background: '#13131A',
        border: '1px solid #2A2A35',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 28,
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #2A2A35' }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Mensajes &quot;Próximamente&quot;
          </h2>
          <p style={{ margin: '4px 0 0', color: '#6B6B75', fontSize: 12 }}>
            Se muestran cuando una sección está activa pero aún no tiene contenido. Déjalo vacío para no mostrar ningún mensaje.
          </p>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MSG_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label style={{ display: 'block', color: '#A1A1AA', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                {label}
              </label>
              <input
                type="text"
                value={msgs[key]}
                onChange={(e) => setMsgs((prev) => ({ ...prev, [key]: e.target.value }))}
                placeholder="Ej: ¡Muy pronto anunciamos los speakers!"
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '9px 12px',
                  background: '#0A0A0F',
                  border: '1px solid #2A2A35',
                  borderRadius: 8,
                  color: '#FFFFFF',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
            <button
              onClick={saveMsgs}
              disabled={isPending}
              style={{
                padding: '9px 20px',
                borderRadius: 8,
                border: 'none',
                background: '#A855F7',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: 13,
                cursor: isPending ? 'not-allowed' : 'pointer',
                opacity: isPending ? 0.7 : 1,
              }}
            >
              {isPending ? 'Guardando…' : 'Guardar mensajes'}
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          padding: '12px 20px',
          borderRadius: 10,
          background: toast.ok ? '#14532D' : '#7F1D1D',
          border: `1px solid ${toast.ok ? '#22C55E44' : '#EF444444'}`,
          color: toast.ok ? '#86EFAC' : '#FCA5A5',
          fontSize: 13,
          fontWeight: 500,
          zIndex: 9999,
          boxShadow: '0 4px 24px #00000055',
        }}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
