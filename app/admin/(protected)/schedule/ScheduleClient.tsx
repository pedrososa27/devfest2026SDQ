'use client';

import { useState } from 'react';
import type { Talk } from '../../../../lib/supabase/types';
import { upsertTalk, deleteTalk } from '../../actions/crud';
import Modal from '../../components/Modal';
import * as S from '../../components/formStyles';

type TalkWithSpeaker = Talk & { speakers?: { name: string } | null };
type SpeakerOption = { id: string; name: string };

const TALK_TYPES = ['talk', 'workshop', 'keynote', 'panel', 'break'] as const;
const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
const TRACKS = [
  'General', 'AI', 'AI/ML', 'Testing', 'DevOps', 'UX', 'Community',
  'Development', 'Web', 'Android', 'mobile', 'Mobile', 'Flutter',
  'gRPC', 'Cybersecurity', 'Security', 'Data Engineering', 'Cloud',
  'Workshop', 'Firebase', 'Other',
];

const BLANK: Partial<Talk> = {
  title: '',
  description: '',
  track: '',
  room: '',
  talk_type: 'talk',
  level: null,
  language: 'es',
  speaker_id: null,
  starts_at: '',
  ends_at: '',
};

function formatDatetimeLocal(iso: string) {
  if (!iso) return '';
  return iso.slice(0, 16); // "YYYY-MM-DDTHH:mm"
}

export default function ScheduleClient({
  initialTalks,
  speakers,
}: {
  initialTalks: TalkWithSpeaker[];
  speakers: SpeakerOption[];
}) {
  const [talks, setTalks] = useState(initialTalks);
  const [selected, setSelected] = useState<Partial<Talk> | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = talks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    (t.track ?? '').toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(fd: FormData) {
    setLoading(true); setError(null);
    const res = await upsertTalk(fd);
    if (res.error) { setError(res.error); setLoading(false); return; }
    window.location.reload();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteTalk(deleteId);
    setTalks((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  }

  function speakerName(t: TalkWithSpeaker) {
    return t.speakers?.name ?? speakers.find((s) => s.id === t.speaker_id)?.name ?? '—';
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Schedule / Charlas</h1>
          <p style={{ color: '#6B6B75', fontSize: 13, marginTop: 4 }}>{talks.length} charlas</p>
        </div>
        <button style={S.btnPrimary} onClick={() => setSelected(BLANK)}>+ Nueva charla</button>
      </div>

      {/* Search */}
      <input
        placeholder="Buscar por título o track…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...S.input, marginBottom: 20, maxWidth: 360 }}
      />

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Título', 'Speaker', 'Track', 'Tipo', 'Inicio', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{speakerName(t)}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{t.track ?? '—'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: '#A855F722', color: '#A855F7', fontSize: 11, fontWeight: 600 }}>
                    {t.talk_type}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', color: '#6B6B75', whiteSpace: 'nowrap' }}>
                  {t.starts_at ? new Date(t.starts_at).toLocaleString('es-GT', { dateStyle: 'short', timeStyle: 'short' }) : '—'}
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSecondary} onClick={() => setSelected(t)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteId(t.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#6B6B75' }}>Sin charlas</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal title={selected?.id ? 'Editar charla' : 'Nueva charla'} isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {selected.id && <input type="hidden" name="id" value={selected.id} />}
            <div style={S.field}>
              <label style={S.label}>Título *</label>
              <input name="title" required defaultValue={selected.title} style={S.input} />
            </div>
            <div style={S.field}>
              <label style={S.label}>Descripción</label>
              <textarea name="description" defaultValue={selected.description ?? ''} style={S.textarea} />
            </div>
            <div style={S.field}>
              <label style={S.label}>Speaker</label>
              <select name="speaker_id" defaultValue={selected.speaker_id ?? ''} style={S.select}>
                <option value="">— Sin speaker —</option>
                {speakers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Track</label>
                <select name="track" defaultValue={selected.track ?? ''} style={S.select}>
                  <option value="">— Sin track —</option>
                  {TRACKS.map((tr) => <option key={tr} value={tr}>{tr}</option>)}
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>Sala / Room</label>
                <input name="room" defaultValue={selected.room ?? ''} style={S.input} placeholder="Main Stage, Room A…" />
              </div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Tipo *</label>
                <select name="talk_type" defaultValue={selected.talk_type ?? 'talk'} style={S.select}>
                  {TALK_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={S.field}>
                <label style={S.label}>Nivel</label>
                <select name="level" defaultValue={selected.level ?? ''} style={S.select}>
                  <option value="">— Sin nivel —</option>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Inicio *</label>
                <input name="starts_at" type="datetime-local" required defaultValue={formatDatetimeLocal(selected.starts_at ?? '')} style={S.input} />
              </div>
              <div style={S.field}>
                <label style={S.label}>Fin *</label>
                <input name="ends_at" type="datetime-local" required defaultValue={formatDatetimeLocal(selected.ends_at ?? '')} style={S.input} />
              </div>
            </div>
            <div style={S.field}>
              <label style={S.label}>Idioma</label>
              <select name="language" defaultValue={selected.language ?? 'es'} style={S.select}>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" style={S.btnSecondary} onClick={() => setSelected(null)}>Cancelar</button>
              <button type="submit" disabled={loading} style={S.btnPrimary}>{loading ? 'Guardando…' : 'Guardar'}</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal title="Eliminar charla" isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <p style={{ color: '#A1A1AA', marginBottom: 20 }}>¿Seguro que deseas eliminar esta charla? Esta acción no se puede deshacer.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={S.btnSecondary} onClick={() => setDeleteId(null)}>Cancelar</button>
          <button style={S.btnDanger} onClick={handleDelete}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
