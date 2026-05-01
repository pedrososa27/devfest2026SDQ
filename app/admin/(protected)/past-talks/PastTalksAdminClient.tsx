'use client';

import { useState, useTransition } from 'react';
import { PastTalk } from '../../../../lib/supabase/types';
import { upsertPastTalk, deletePastTalk } from '../../actions/crud';

const BLANK: Omit<PastTalk, 'id' | 'created_at'> = {
  youtube_video_id: '',
  title: '',
  speaker: null,
  year: String(new Date().getFullYear()),
  display_order: 0,
  active: true,
};

function extractVideoId(input: string): string {
  const match = input.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : input.trim();
}

async function fetchOEmbedData(videoId: string): Promise<{ title: string; author: string } | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return { title: data.title ?? '', author: data.author_name ?? '' };
  } catch {
    return null;
  }
}

export default function PastTalksAdminClient({ initialTalks }: { initialTalks: PastTalk[] }) {
  const [talks, setTalks] = useState<PastTalk[]>(initialTalks);
  const [modal, setModal] = useState<(Omit<PastTalk, 'id' | 'created_at'> & { id?: string }) | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [fetching, setFetching] = useState(false);

  // Bulk import state
  const [bulkModal, setBulkModal] = useState(false);
  const [bulkLinks, setBulkLinks] = useState('');
  const [bulkYear, setBulkYear] = useState(String(new Date().getFullYear()));
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);
  const [bulkImporting, setBulkImporting] = useState(false);

  function showToast(text: string, ok: boolean) {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 3500);
  }

  function openNew() { setModal({ ...BLANK }); }
  function openEdit(t: PastTalk) { setModal({ ...t }); }

  async function fetchOEmbedModal(input: string) {
    const vid = extractVideoId(input);
    if (!vid || vid.length < 5) return;
    setFetching(true);
    try {
      const data = await fetchOEmbedData(vid);
      if (data) {
        setModal((prev) =>
          prev ? { ...prev, youtube_video_id: vid, title: prev.title || data.title } : prev
        );
      }
    } finally {
      setFetching(false);
    }
  }

  async function handleSave() {
    if (!modal) return;
    const fd = new FormData();
    if (modal.id) fd.append('id', modal.id);
    fd.append('youtube_video_id', extractVideoId(modal.youtube_video_id));
    fd.append('title', modal.title);
    fd.append('year', modal.year ?? '');
    fd.append('display_order', String(modal.display_order));
    fd.append('active', String(modal.active));
    startTransition(async () => {
      const res = await upsertPastTalk(fd);
      if (res.error) { showToast(res.error, false); return; }
      setModal(null);
      showToast('Guardado correctamente', true);
      window.location.reload();
    });
  }

  async function handleBulkImport() {
    const raw = bulkLinks.split(',').map((s) => s.trim()).filter(Boolean);
    if (raw.length === 0) return;
    setBulkImporting(true);
    const maxOrder = talks.length > 0 ? Math.max(...talks.map((t) => t.display_order)) : -1;
    for (let i = 0; i < raw.length; i++) {
      const vid = extractVideoId(raw[i]);
      if (!vid || vid.length < 5) continue;
      setBulkProgress(`Procesando ${i + 1} de ${raw.length}: ${vid}`);
      const meta = await fetchOEmbedData(vid);
      const fd = new FormData();
      fd.append('youtube_video_id', vid);
      fd.append('title', meta?.title ?? vid);
      fd.append('year', bulkYear);
      fd.append('display_order', String(maxOrder + i + 1));
      fd.append('active', 'true');
      await upsertPastTalk(fd);
    }
    setBulkImporting(false);
    setBulkProgress(null);
    setBulkModal(false);
    setBulkLinks('');
    showToast(`${raw.length} video(s) importados`, true);
    window.location.reload();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const res = await deletePastTalk(deleteTarget);
      if (res.error) { showToast(res.error, false); return; }
      setTalks((prev) => prev.filter((t) => t.id !== deleteTarget));
      setDeleteTarget(null);
      showToast('Eliminado', true);
    });
  }

  const S = {
    btn: { padding: '8px 16px', borderRadius: 8, border: 'none', background: '#A855F7', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' } as React.CSSProperties,
    btnOutline: { padding: '8px 16px', borderRadius: 8, border: '1px solid #A855F7', background: 'transparent', color: '#A855F7', fontWeight: 600, fontSize: 13, cursor: 'pointer' } as React.CSSProperties,
    btnSm: { padding: '5px 12px', borderRadius: 6, border: '1px solid #2A2A35', background: 'transparent', color: '#A1A1AA', fontSize: 12, cursor: 'pointer' } as React.CSSProperties,
    btnDanger: { padding: '5px 12px', borderRadius: 6, border: '1px solid #EF444433', background: 'transparent', color: '#F87171', fontSize: 12, cursor: 'pointer' } as React.CSSProperties,
    input: { width: '100%', boxSizing: 'border-box' as const, padding: '9px 12px', background: '#0A0A0F', border: '1px solid #2A2A35', borderRadius: 8, color: '#fff', fontSize: 13, outline: 'none' },
    label: { display: 'block', color: '#A1A1AA', fontSize: 12, fontWeight: 600, marginBottom: 6 } as React.CSSProperties,
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>🎬 Past Talks</h1>
          <p style={{ margin: '4px 0 0', color: '#6B6B75', fontSize: 13 }}>{talks.length} videos archivados</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={S.btnOutline} onClick={() => setBulkModal(true)}>+ Importar varios</button>
          <button style={S.btn} onClick={openNew}>+ Agregar uno</button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Preview', 'Título', 'Año', 'Orden', 'Activo', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '10px 12px', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {talks.map((talk) => (
              <tr key={talk.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '8px 12px' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${talk.youtube_video_id}/default.jpg`}
                    alt={talk.title}
                    style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 4, border: '1px solid #2A2A35' }}
                  />
                </td>
                <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 500, maxWidth: 240 }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{talk.title}</div>
                  <div style={{ fontSize: 11, color: '#6B6B75', marginTop: 2 }}>{talk.youtube_video_id}</div>
                </td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{talk.year ?? '—'}</td>
                <td style={{ padding: '10px 12px', color: '#6B6B75' }}>{talk.display_order}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: talk.active ? '#34A85322' : '#1A1A24', color: talk.active ? '#34A853' : '#6B6B75', fontSize: 11 }}>
                    {talk.active ? 'Sí' : 'No'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSm} onClick={() => openEdit(talk)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteTarget(talk.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {talks.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#6B6B75' }}>Sin videos. Agrega el primero.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk Import Modal */}
      {bulkModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: 16, padding: 28, width: '100%', maxWidth: 560 }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#fff' }}>Importar varios videos</h2>
            <p style={{ margin: '0 0 24px', color: '#6B6B75', fontSize: 13 }}>
              Pega los links de YouTube separados por coma. El título se detecta automáticamente y el orden se asigna en secuencia.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>Links de YouTube (separados por coma) *</label>
                <textarea
                  style={{ ...S.input, minHeight: 120, resize: 'vertical', fontFamily: 'monospace', lineHeight: 1.6 } as React.CSSProperties}
                  placeholder="https://youtu.be/abc123, https://www.youtube.com/watch?v=xyz456, ..."
                  value={bulkLinks}
                  onChange={(e) => setBulkLinks(e.target.value)}
                  disabled={bulkImporting}
                />
                {bulkLinks.trim() && (
                  <div style={{ fontSize: 11, color: '#A855F7', marginTop: 4 }}>
                    {bulkLinks.split(',').map((s) => s.trim()).filter(Boolean).length} link(s) detectado(s)
                  </div>
                )}
              </div>
              <div style={{ maxWidth: 160 }}>
                <label style={S.label}>Año (aplica a todos)</label>
                <input
                  style={S.input}
                  placeholder="2025"
                  value={bulkYear}
                  onChange={(e) => setBulkYear(e.target.value)}
                  disabled={bulkImporting}
                />
              </div>
              {bulkProgress && (
                <div style={{ padding: '10px 14px', background: '#0A0A0F', border: '1px solid #2A2A35', borderRadius: 8, color: '#A855F7', fontSize: 12 }}>
                  ⏳ {bulkProgress}
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...S.btnSm, padding: '9px 18px' }} onClick={() => { setBulkModal(false); setBulkLinks(''); }} disabled={bulkImporting}>
                Cancelar
              </button>
              <button
                style={{ ...S.btn, opacity: bulkImporting ? 0.7 : 1 }}
                onClick={handleBulkImport}
                disabled={bulkImporting || !bulkLinks.trim()}
              >
                {bulkImporting ? 'Importando…' : 'Importar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Edit Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div style={{ background: '#13131A', border: '1px solid #2A2A35', borderRadius: 16, padding: 28, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 18, fontWeight: 700, color: '#fff' }}>
              {modal.id ? 'Editar video' : 'Agregar video'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={S.label}>Link o ID de YouTube *</label>
                <input
                  style={S.input}
                  placeholder="https://www.youtube.com/watch?v=... o solo el ID"
                  value={modal.youtube_video_id}
                  onChange={(e) => setModal({ ...modal, youtube_video_id: e.target.value })}
                  onBlur={(e) => fetchOEmbedModal(e.target.value)}
                />
                {fetching && <div style={{ fontSize: 11, color: '#A855F7', marginTop: 4 }}>Obteniendo datos de YouTube…</div>}
              </div>
              {modal.youtube_video_id && extractVideoId(modal.youtube_video_id).length >= 11 && (
                <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #2A2A35', aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${extractVideoId(modal.youtube_video_id)}/hqdefault.jpg`}
                    alt="preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div>
                <label style={S.label}>Título *</label>
                <input
                  style={S.input}
                  placeholder="Título de la charla"
                  value={modal.title}
                  onChange={(e) => setModal({ ...modal, title: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={S.label}>Año</label>
                  <input
                    style={S.input}
                    placeholder="2024"
                    value={modal.year ?? ''}
                    onChange={(e) => setModal({ ...modal, year: e.target.value })}
                  />
                </div>
                <div>
                  <label style={S.label}>Orden</label>
                  <input
                    type="number"
                    style={S.input}
                    value={modal.display_order}
                    onChange={(e) => setModal({ ...modal, display_order: Number(e.target.value) })}
                  />
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', color: '#A1A1AA', fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={modal.active}
                  onChange={(e) => setModal({ ...modal, active: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#A855F7' }}
                />
                Activo (visible en el sitio)
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 24 }}>
              <button style={{ ...S.btnSm, padding: '9px 18px' }} onClick={() => setModal(null)}>Cancelar</button>
              <button
                style={{ ...S.btn, opacity: isPending || fetching ? 0.7 : 1 }}
                onClick={handleSave}
                disabled={isPending || fetching}
              >
                {isPending ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#13131A', border: '1px solid #EF444433', borderRadius: 16, padding: 28, maxWidth: 380, width: '100%', margin: 20 }}>
            <h3 style={{ margin: '0 0 12px', color: '#fff' }}>¿Eliminar video?</h3>
            <p style={{ margin: '0 0 24px', color: '#A1A1AA', fontSize: 14 }}>Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button style={{ ...S.btnSm, padding: '9px 18px' }} onClick={() => setDeleteTarget(null)}>Cancelar</button>
              <button
                style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? 'Eliminando…' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, padding: '12px 20px', borderRadius: 10,
          background: toast.ok ? '#14532D' : '#7F1D1D',
          border: `1px solid ${toast.ok ? '#22C55E44' : '#EF444444'}`,
          color: toast.ok ? '#86EFAC' : '#FCA5A5',
          fontSize: 13, fontWeight: 500, zIndex: 9999, boxShadow: '0 4px 24px #00000055',
        }}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
