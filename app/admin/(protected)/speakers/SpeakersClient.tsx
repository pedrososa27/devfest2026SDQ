'use client';

import { useState } from 'react';
import type { Speaker } from '../../../../lib/supabase/types';
import { upsertSpeaker, deleteSpeaker } from '../../actions/crud';
import Modal from '../../components/Modal';
import * as S from '../../components/formStyles';

const SKILLS = [
  'General', 'Testing', 'DevOps', 'UX', 'AI', 'Community', 'Development',
  'Android', 'mobile', 'Flutter', 'gRPC', 'Cybersecurity', 'Data Engineering',
  'Cloud', 'Workshop', 'Firebase', 'Mobile', 'Security', 'Web', 'AI/ML',
] as const;

const BLANK: Partial<Speaker> = { name: '', title: '', company: '', city: '', country: '', bio: '', photo_url: '', social_twitter: '', social_linkedin: '', social_github: '', featured: false, topics: [] };

export default function SpeakersClient({ initialSpeakers }: { initialSpeakers: Speaker[] }) {
  const [speakers, setSpeakers] = useState(initialSpeakers);
  const [selected, setSelected] = useState<Partial<Speaker> | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  function openModal(sp: Partial<Speaker>) {
    setSelected(sp);
    setSelectedSkills(sp.topics?.slice(0, 1) ?? []);
  }

  function toggleSkill(skill: string) {
    setSelectedSkills((prev) =>
      prev[0] === skill ? [] : [skill]
    );
  }

  const filtered = speakers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.company ?? '').toLowerCase().includes(search.toLowerCase())
  );

  async function handleSubmit(formData: FormData) {
    setLoading(true); setError(null);
    const res = await upsertSpeaker(formData);
    if (res.error) { setError(res.error); setLoading(false); return; }
    // Refresh list
    const resp = await fetch('/api/admin/speakers');
    if (resp.ok) setSpeakers(await resp.json());
    else window.location.reload();
    setSelected(null); setLoading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteSpeaker(deleteId);
    setSpeakers((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Speakers</h1>
          <p style={{ color: '#6B6B75', fontSize: 13, marginTop: 4 }}>{speakers.length} registrados</p>
        </div>
        <button style={S.btnPrimary} onClick={() => openModal(BLANK)}>+ Nuevo speaker</button>
      </div>

      {/* Search */}
      <input
        placeholder="Buscar por nombre o empresa…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...S.input, marginBottom: 20, maxWidth: 360 }}
      />

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Nombre', 'Empresa', 'Título', 'Featured', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((sp) => (
              <tr key={sp.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500 }}>{sp.name}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{sp.company ?? '—'}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sp.title ?? '—'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: sp.featured ? '#A855F722' : '#1A1A24', color: sp.featured ? '#A855F7' : '#6B6B75', fontSize: 11 }}>
                    {sp.featured ? 'Sí' : 'No'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSecondary} onClick={() => openModal(sp)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteId(sp.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#6B6B75' }}>Sin resultados</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      <Modal title={selected?.id ? 'Editar speaker' : 'Nuevo speaker'} isOpen={!!selected} onClose={() => { setSelected(null); setSelectedSkills([]); }}>
        {selected && (
          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {selected.id && <input type="hidden" name="id" value={selected.id} />}
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Nombre *</label>
                <input name="name" required defaultValue={selected.name} style={S.input} />
              </div>
              <div style={S.field}>
                <label style={S.label}>Empresa</label>
                <input name="company" defaultValue={selected.company ?? ''} style={S.input} />
              </div>
            </div>
            <div style={S.field}>
              <label style={S.label}>Título / cargo</label>
              <input name="title" defaultValue={selected.title ?? ''} style={S.input} />
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Ciudad</label>
                <input name="city" defaultValue={selected.city ?? ''} style={S.input} placeholder="Lima" />
              </div>
              <div style={S.field}>
                <label style={S.label}>País (código ISO)</label>
                <input name="country" defaultValue={selected.country ?? ''} style={S.input} placeholder="PE" maxLength={2} />
              </div>
            </div>
            <div style={S.field}>
              <label style={S.label}>Bio</label>
              <textarea name="bio" defaultValue={selected.bio ?? ''} style={S.textarea} />
            </div>
            <div style={S.field}>
              <label style={S.label}>URL de foto</label>
              <input name="photo_url" type="url" defaultValue={selected.photo_url ?? ''} style={S.input} placeholder="https://..." />
            </div>
            {/* Hidden inputs to send selected skills as multiple form values */}
            {selectedSkills.map((s) => (
              <input key={s} type="hidden" name="topics" value={s} />
            ))}
            <div style={S.field}>
              <label style={S.label}>Track principal</label>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8,
                padding: '10px 12px', background: '#0A0A0F',
                border: '1px solid #2A2A35', borderRadius: 8,
              }}>
                {SKILLS.map((skill) => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      style={{
                        padding: '4px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
                        border: active ? '1px solid #A855F7' : '1px solid #2A2A35',
                        background: active ? '#A855F722' : 'transparent',
                        color: active ? '#A855F7' : '#6B6B75',
                        fontWeight: active ? 600 : 400,
                        transition: 'all 0.15s',
                      }}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Twitter / X</label>
                <input name="social_twitter" defaultValue={selected.social_twitter ?? ''} style={S.input} placeholder="@handle" />
              </div>
              <div style={S.field}>
                <label style={S.label}>LinkedIn URL</label>
                <input name="social_linkedin" defaultValue={selected.social_linkedin ?? ''} style={S.input} />
              </div>
            </div>
            <div style={S.field}>
              <label style={S.label}>GitHub URL</label>
              <input name="social_github" defaultValue={selected.social_github ?? ''} style={S.input} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" id="featured" name="featured" value="true" defaultChecked={selected.featured} style={{ width: 16, height: 16 }} />
              <label htmlFor="featured" style={{ ...S.label, margin: 0 }}>Speaker destacado (featured)</label>
            </div>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" style={S.btnSecondary} onClick={() => { setSelected(null); setSelectedSkills([]); }}>Cancelar</button>
              <button type="submit" disabled={loading} style={S.btnPrimary}>{loading ? 'Guardando…' : 'Guardar'}</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal title="Eliminar speaker" isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <p style={{ color: '#A1A1AA', marginBottom: 20 }}>¿Seguro que deseas eliminar este speaker? Esta acción no se puede deshacer.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={S.btnSecondary} onClick={() => setDeleteId(null)}>Cancelar</button>
          <button style={S.btnDanger} onClick={handleDelete}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
