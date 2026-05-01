'use client';

import { useState } from 'react';
import type { CoreTeamMember, CommitteeMember, Volunteer } from '../../../../lib/supabase/types';
import {
  upsertCoreTeamMember, deleteCoreTeamMember,
  upsertCommitteeMember, deleteCommitteeMember,
  upsertVolunteer, deleteVolunteer,
} from '../../actions/crud';
import Modal from '../../components/Modal';
import * as S from '../../components/formStyles';

type Tab = 'core' | 'committee' | 'volunteers';

const AREA_OPTIONS = ['logistics', 'hospitality', 'tech', 'design', 'comms'] as const;

export default function TeamClient({
  initialCore,
  initialCommittee,
  initialVolunteers,
}: {
  initialCore: CoreTeamMember[];
  initialCommittee: CommitteeMember[];
  initialVolunteers: Volunteer[];
}) {
  const [tab, setTab] = useState<Tab>('core');
  const [core, setCore] = useState(initialCore);
  const [committee, setCommittee] = useState(initialCommittee);
  const [volunteers, setVolunteers] = useState(initialVolunteers);

  // Modal state
  const [coreModal, setCoreModal] = useState<Partial<CoreTeamMember> | null>(null);
  const [committeeModal, setCommitteeModal] = useState<Partial<CommitteeMember> | null>(null);
  const [volModal, setVolModal] = useState<Partial<Volunteer> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ type: Tab; id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCoreSubmit(fd: FormData) {
    setLoading(true); setError(null);
    const res = await upsertCoreTeamMember(fd);
    if (res.error) { setError(res.error); setLoading(false); return; }
    window.location.reload();
  }

  async function handleCommitteeSubmit(fd: FormData) {
    setLoading(true); setError(null);
    const res = await upsertCommitteeMember(fd);
    if (res.error) { setError(res.error); setLoading(false); return; }
    window.location.reload();
  }

  async function handleVolSubmit(fd: FormData) {
    setLoading(true); setError(null);
    const res = await upsertVolunteer(fd);
    if (res.error) { setError(res.error); setLoading(false); return; }
    window.location.reload();
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'core') { await deleteCoreTeamMember(deleteTarget.id); setCore((p) => p.filter((m) => m.id !== deleteTarget.id)); }
    if (deleteTarget.type === 'committee') { await deleteCommitteeMember(deleteTarget.id); setCommittee((p) => p.filter((m) => m.id !== deleteTarget.id)); }
    if (deleteTarget.type === 'volunteers') { await deleteVolunteer(deleteTarget.id); setVolunteers((p) => p.filter((m) => m.id !== deleteTarget.id)); }
    setDeleteTarget(null);
  }

  const tabStyle = (t: Tab): React.CSSProperties => ({
    padding: '8px 16px', border: 'none', borderRadius: 8, cursor: 'pointer',
    fontSize: 13, fontWeight: tab === t ? 600 : 400,
    background: tab === t ? '#A855F722' : 'transparent',
    color: tab === t ? '#A855F7' : '#A1A1AA',
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Team</h1>
          <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
            <button style={tabStyle('core')} onClick={() => setTab('core')}>Core Team ({core.length})</button>
            <button style={tabStyle('committee')} onClick={() => setTab('committee')}>Comité ({committee.length})</button>
            <button style={tabStyle('volunteers')} onClick={() => setTab('volunteers')}>Voluntarios ({volunteers.length})</button>
          </div>
        </div>
        <button style={S.btnPrimary} onClick={() => {
          if (tab === 'core') setCoreModal({ name: '', role_label: '', accent_label: '', display_order: 0, active: true });
          if (tab === 'committee') setCommitteeModal({ name: '', badge: '', initials: '', role: '', display_order: 0, active: true });
          if (tab === 'volunteers') setVolModal({ full_name: '', initials: '', area: 'logistics', display_order: 0, active: true });
        }}>+ Nuevo</button>
      </div>

      {/* ── Core Team ── */}
      {tab === 'core' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Foto', 'Nombre', 'Rol', 'Etiqueta', 'Activo', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {core.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500 }}>{m.name}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{m.role_label}</td>
                <td style={{ padding: '10px 12px', color: '#A855F7', fontWeight: 700 }}>{m.accent_label}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: m.active ? '#34A85322' : '#1A1A24', color: m.active ? '#34A853' : '#6B6B75', fontSize: 11 }}>
                    {m.active ? 'Sí' : 'No'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSecondary} onClick={() => setCoreModal(m)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteTarget({ type: 'core', id: m.id })}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {core.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#6B6B75' }}>Sin miembros</td></tr>}
          </tbody>
        </table>
      )}

      {/* ── Committee ── */}
      {tab === 'committee' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Foto', 'Nombre', 'Badge', 'Rol', 'Área', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {committee.map((m) => (
              <tr key={m.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '8px 12px' }}>
                  {m.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo_url} alt={m.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #2A2A35' }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#22D3EE22', border: '1px solid #22D3EE33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#22D3EE', fontWeight: 700 }}>
                      {m.initials}
                    </div>
                  )}
                </td>
                <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500 }}>{m.name}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: '#22D3EE22', color: '#22D3EE', fontSize: 11, fontWeight: 700 }}>{m.badge}</span>
                </td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{m.role}</td>
                <td style={{ padding: '10px 12px', color: '#6B6B75' }}>{m.area ?? '—'}</td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSecondary} onClick={() => setCommitteeModal(m)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteTarget({ type: 'committee', id: m.id })}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {committee.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#6B6B75' }}>Sin miembros</td></tr>}
          </tbody>
        </table>
      )}

      {/* ── Volunteers ── */}
      {tab === 'volunteers' && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
              {['Foto', 'Nombre', 'Iniciales', 'Área', 'Activo', 'Acciones'].map((h) => (
                <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v) => (
              <tr key={v.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                <td style={{ padding: '8px 12px' }}>
                  {v.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={v.photo_url} alt={v.full_name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #2A2A35' }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#34A85322', border: '1px solid #34A85333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#34A853', fontWeight: 700 }}>
                      {v.initials}
                    </div>
                  )}
                </td>
                <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500 }}>{v.full_name}</td>
                <td style={{ padding: '10px 12px', color: '#A855F7', fontWeight: 700 }}>{v.initials}</td>
                <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{v.area}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ padding: '2px 8px', borderRadius: 4, background: v.active ? '#34A85322' : '#1A1A24', color: v.active ? '#34A853' : '#6B6B75', fontSize: 11 }}>
                    {v.active ? 'Sí' : 'No'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={S.btnSecondary} onClick={() => setVolModal(v)}>Editar</button>
                    <button style={S.btnDanger} onClick={() => setDeleteTarget({ type: 'volunteers', id: v.id })}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {volunteers.length === 0 && <tr><td colSpan={5} style={{ padding: 32, textAlign: 'center', color: '#6B6B75' }}>Sin voluntarios</td></tr>}
          </tbody>
        </table>
      )}

      {/* Core Team Modal */}
      <Modal title={coreModal?.id ? 'Editar miembro core' : 'Nuevo miembro core'} isOpen={!!coreModal} onClose={() => setCoreModal(null)}>
        {coreModal && (
          <form action={handleCoreSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {coreModal.id && <input type="hidden" name="id" value={coreModal.id} />}
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Nombre *</label><input name="name" required defaultValue={coreModal.name} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Etiqueta corta (LEAD, PROG…)</label><input name="accent_label" defaultValue={coreModal.accent_label ?? ''} style={S.input} /></div>
            </div>
            <div style={S.field}><label style={S.label}>Rol *</label><input name="role_label" required defaultValue={coreModal.role_label ?? ''} style={S.input} placeholder="GDG LEAD, PROGRAM CHAIR…" /></div>
            <div style={S.field}><label style={S.label}>Título / cargo</label><input name="title" defaultValue={coreModal.title ?? ''} style={S.input} /></div>
            <div style={S.field}><label style={S.label}>Bio</label><textarea name="bio" defaultValue={coreModal.bio ?? ''} style={S.textarea} /></div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>URL foto</label><input name="photo_url" defaultValue={coreModal.photo_url ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Handle (@)</label><input name="handle" defaultValue={coreModal.handle ?? ''} style={S.input} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Twitter</label><input name="social_twitter" defaultValue={coreModal.social_twitter ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>LinkedIn</label><input name="social_linkedin" defaultValue={coreModal.social_linkedin ?? ''} style={S.input} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>GitHub</label><input name="social_github" defaultValue={coreModal.social_github ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Orden</label><input name="display_order" type="number" defaultValue={coreModal.display_order ?? 0} style={S.input} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" name="active" value="true" defaultChecked={coreModal.active !== false} id="active_core" style={{ width: 16, height: 16 }} />
              <label htmlFor="active_core" style={{ ...S.label, margin: 0 }}>Activo</label>
            </div>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" style={S.btnSecondary} onClick={() => setCoreModal(null)}>Cancelar</button>
              <button type="submit" disabled={loading} style={S.btnPrimary}>{loading ? 'Guardando…' : 'Guardar'}</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Committee Modal */}
      <Modal title={committeeModal?.id ? 'Editar miembro comité' : 'Nuevo miembro comité'} isOpen={!!committeeModal} onClose={() => setCommitteeModal(null)}>
        {committeeModal && (
          <form action={handleCommitteeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {committeeModal.id && <input type="hidden" name="id" value={committeeModal.id} />}
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Nombre *</label><input name="name" required defaultValue={committeeModal.name} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Iniciales</label><input name="initials" defaultValue={committeeModal.initials ?? ''} style={S.input} placeholder="AB" maxLength={3} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Badge (AI, SEC…)</label><input name="badge" defaultValue={committeeModal.badge ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Área</label><input name="area" defaultValue={committeeModal.area ?? ''} style={S.input} placeholder="track, comms, dei…" /></div>
            </div>
            <div style={S.field}><label style={S.label}>Rol *</label><input name="role" required defaultValue={committeeModal.role ?? ''} style={S.input} placeholder="Track Captain — AI/ML" /></div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Handle</label><input name="handle" defaultValue={committeeModal.handle ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>URL foto</label><input name="photo_url" defaultValue={committeeModal.photo_url ?? ''} style={S.input} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>LinkedIn</label><input name="social_linkedin" defaultValue={committeeModal.social_linkedin ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>GitHub</label><input name="social_github" defaultValue={committeeModal.social_github ?? ''} style={S.input} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Orden</label><input name="display_order" type="number" defaultValue={committeeModal.display_order ?? 0} style={S.input} /></div>
              <div style={{ ...S.field, justifyContent: 'flex-end', paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" name="active" value="true" defaultChecked={committeeModal.active !== false} id="active_committee" style={{ width: 16, height: 16 }} />
                  <label htmlFor="active_committee" style={{ ...S.label, margin: 0 }}>Activo</label>
                </div>
              </div>
            </div>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" style={S.btnSecondary} onClick={() => setCommitteeModal(null)}>Cancelar</button>
              <button type="submit" disabled={loading} style={S.btnPrimary}>{loading ? 'Guardando…' : 'Guardar'}</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Volunteer Modal */}
      <Modal title={volModal?.id ? 'Editar voluntario' : 'Nuevo voluntario'} isOpen={!!volModal} onClose={() => setVolModal(null)}>
        {volModal && (
          <form action={handleVolSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {volModal.id && <input type="hidden" name="id" value={volModal.id} />}
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Nombre completo *</label><input name="full_name" required defaultValue={volModal.full_name} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Iniciales</label><input name="initials" defaultValue={volModal.initials ?? ''} style={S.input} maxLength={3} /></div>
            </div>
            <div style={S.field}>
              <label style={S.label}>Área *</label>
              <select name="area" defaultValue={volModal.area ?? 'logistics'} style={S.select}>
                {AREA_OPTIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>Handle</label><input name="handle" defaultValue={volModal.handle ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>LinkedIn</label><input name="social_linkedin" defaultValue={volModal.social_linkedin ?? ''} style={S.input} /></div>
            </div>
            <div style={S.grid2}>
              <div style={S.field}><label style={S.label}>URL foto</label><input name="photo_url" defaultValue={volModal.photo_url ?? ''} style={S.input} /></div>
              <div style={S.field}><label style={S.label}>Orden</label><input name="display_order" type="number" defaultValue={volModal.display_order ?? 0} style={S.input} /></div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="checkbox" name="active" value="true" defaultChecked={volModal.active !== false} id="active_vol" style={{ width: 16, height: 16 }} />
              <label htmlFor="active_vol" style={{ ...S.label, margin: 0 }}>Activo</label>
            </div>
            {error && <div style={S.errorBox}>{error}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" style={S.btnSecondary} onClick={() => setVolModal(null)}>Cancelar</button>
              <button type="submit" disabled={loading} style={S.btnPrimary}>{loading ? 'Guardando…' : 'Guardar'}</button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirm */}
      <Modal title="Eliminar miembro" isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <p style={{ color: '#A1A1AA', marginBottom: 20 }}>¿Seguro que deseas eliminar este miembro? Esta acción no se puede deshacer.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={S.btnSecondary} onClick={() => setDeleteTarget(null)}>Cancelar</button>
          <button style={S.btnDanger} onClick={handleDelete}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
