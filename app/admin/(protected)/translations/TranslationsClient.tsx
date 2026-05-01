'use client';

import { useState, useTransition, useRef } from 'react';
import { saveTranslationSection, TranslationsData } from '../../actions/translations';

// ─── Flatten / Unflatten ──────────────────────────────────────────────────────

function flatten(obj: unknown, prefix = ''): Record<string, string> {
  if (typeof obj !== 'object' || obj === null) return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = String(value ?? '');
    }
  }
  return result;
}

function unflatten(flat: Record<string, string>): TranslationsData {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split('.');
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current)) current[parts[i]] = {};
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// ─── Section labels ───────────────────────────────────────────────────────────

const SECTION_LABELS: Record<string, string> = {
  nav: 'Navegación',
  hero: 'Hero / Portada',
  eventInfo: 'Info del Evento',
  about: 'Sobre GDG',
  cfp: 'Call for Papers',
  features: 'Features',
  pricing: 'Precios / Tickets',
  pastTalks: 'Past Talks',
  videoRecap: 'Video Recap',
  mapLocation: 'Ubicación / Mapa',
  sponsors: 'Sponsors',
  footer: 'Footer',
  faqPage: 'FAQ (página)',
  schedulePage: 'Schedule (página)',
  speakersPage: 'Speakers (página)',
  teamPage: 'Team (página)',
  conductPage: 'Código de Conducta',
  languageSwitcher: 'Selector de Idioma',
  comingSoon: 'Coming Soon',
};

const SECTION_ICONS: Record<string, string> = {
  nav: '🔗',
  hero: '🏠',
  eventInfo: '📋',
  about: 'ℹ️',
  cfp: '📢',
  features: '✨',
  pricing: '🎟️',
  pastTalks: '🎬',
  videoRecap: '▶️',
  mapLocation: '📍',
  sponsors: '🤝',
  footer: '📄',
  faqPage: '❓',
  schedulePage: '📅',
  speakersPage: '🎤',
  teamPage: '👥',
  conductPage: '📜',
  languageSwitcher: '🌐',
  comingSoon: '⏳',
};

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  en: TranslationsData;
  es: TranslationsData;
};

export default function TranslationsClient({ en: initialEn, es: initialEs }: Props) {
  const sections = Object.keys(initialEn);

  // Keep a full mutable copy of both locales in state
  const [en, setEn] = useState<TranslationsData>(initialEn);
  const [es, setEs] = useState<TranslationsData>(initialEs);

  const [activeSection, setActiveSection] = useState(sections[0]);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enFlat = flatten(en[activeSection]);
  const esFlat = flatten(es[activeSection] ?? {});
  const keys = Object.keys(enFlat);

  function updateEnKey(key: string, value: string) {
    const updated = { ...enFlat, [key]: value };
    setEn((prev) => ({ ...prev, [activeSection]: unflatten(updated) }));
  }

  function updateEsKey(key: string, value: string) {
    const updated = { ...esFlat, [key]: value };
    setEs((prev) => ({ ...prev, [activeSection]: unflatten(updated) }));
  }

  function showToast(text: string, ok: boolean) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ text, ok });
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }

  function handleSave() {
    startTransition(async () => {
      const result = await saveTranslationSection(
        activeSection,
        en[activeSection] as TranslationsData,
        (es[activeSection] ?? {}) as TranslationsData,
      );
      if (result.error) {
        showToast(result.error, false);
      } else {
        showToast('Guardado correctamente ✓', true);
      }
    });
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: '#0F0F13',
    border: '1px solid #2A2A35',
    borderRadius: 6,
    color: '#E5E5E5',
    fontSize: 13,
    padding: '7px 10px',
    fontFamily: 'system-ui, sans-serif',
    resize: 'vertical',
    boxSizing: 'border-box',
    lineHeight: 1.5,
    outline: 'none',
  };

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: 0 }}>
      {/* ── Section sidebar ── */}
      <aside
        style={{
          width: 200,
          flexShrink: 0,
          borderRight: '1px solid #2A2A35',
          paddingRight: 0,
          paddingBottom: 24,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 140px)',
        }}
      >
        {sections.map((s) => {
          const active = s === activeSection;
          return (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '9px 12px',
                background: active ? '#1A1A2E' : 'transparent',
                borderLeft: `3px solid ${active ? '#A855F7' : 'transparent'}`,
                border: 'none',
                borderLeftWidth: 3,
                borderLeftStyle: 'solid',
                borderLeftColor: active ? '#A855F7' : 'transparent',
                color: active ? '#FFFFFF' : '#A1A1AA',
                fontSize: 13,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s, color 0.1s',
              }}
            >
              <span style={{ fontSize: 14 }}>{SECTION_ICONS[s] ?? '📝'}</span>
              <span>{SECTION_LABELS[s] ?? s}</span>
            </button>
          );
        })}
      </aside>

      {/* ── Editor ── */}
      <div style={{ flex: 1, paddingLeft: 24, overflow: 'auto', maxHeight: 'calc(100vh - 140px)' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            position: 'sticky',
            top: 0,
            background: '#0F0F13',
            paddingBottom: 12,
            zIndex: 10,
            borderBottom: '1px solid #2A2A35',
          }}
        >
          <div>
            <span style={{ fontSize: 11, color: '#6B6B75', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Sección
            </span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', margin: '2px 0 0' }}>
              {SECTION_ICONS[activeSection]} {SECTION_LABELS[activeSection] ?? activeSection}
            </h2>
          </div>
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              padding: '9px 20px',
              background: isPending ? '#2A2A35' : '#A855F7',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.6 : 1,
              transition: 'opacity 0.15s, background 0.15s',
            }}
          >
            {isPending ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>

        {/* Column headers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 1fr',
            gap: 12,
            marginBottom: 8,
            padding: '0 4px',
          }}
        >
          <span style={{ fontSize: 11, color: '#6B6B75', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Clave
          </span>
          <span style={{ fontSize: 11, color: '#6B6B75', letterSpacing: '0.08em' }}>🇺🇸 English</span>
          <span style={{ fontSize: 11, color: '#6B6B75', letterSpacing: '0.08em' }}>🇪🇸 Español</span>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {keys.map((key) => {
            const enVal = enFlat[key] ?? '';
            const esVal = esFlat[key] ?? '';
            const isLong = enVal.length > 80 || enVal.includes('\n') || esVal.length > 80;

            return (
              <div
                key={key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr 1fr',
                  gap: 12,
                  alignItems: 'start',
                  padding: '10px 4px',
                  borderBottom: '1px solid #1A1A24',
                }}
              >
                <code
                  style={{
                    fontSize: 11,
                    color: '#A855F7',
                    background: '#1A1A2E',
                    padding: '4px 6px',
                    borderRadius: 4,
                    wordBreak: 'break-all',
                    display: 'block',
                  }}
                >
                  {key}
                </code>
                {isLong ? (
                  <textarea
                    value={enVal}
                    onChange={(e) => updateEnKey(key, e.target.value)}
                    rows={3}
                    style={inputBase}
                  />
                ) : (
                  <input
                    type="text"
                    value={enVal}
                    onChange={(e) => updateEnKey(key, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    style={inputBase}
                  />
                )}
                {isLong ? (
                  <textarea
                    value={esVal}
                    onChange={(e) => updateEsKey(key, e.target.value)}
                    rows={3}
                    style={inputBase}
                  />
                ) : (
                  <input
                    type="text"
                    value={esVal}
                    onChange={(e) => updateEsKey(key, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    style={inputBase}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom save */}
        <div style={{ marginTop: 24, paddingBottom: 24 }}>
          <button
            onClick={handleSave}
            disabled={isPending}
            style={{
              padding: '10px 24px',
              background: isPending ? '#2A2A35' : '#A855F7',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.6 : 1,
            }}
          >
            {isPending ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: toast.ok ? '#16A34A' : '#DC2626',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            zIndex: 9999,
          }}
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
