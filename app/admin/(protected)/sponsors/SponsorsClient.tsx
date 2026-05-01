'use client';

import { useState } from 'react';
import type { Sponsor } from '../../../../lib/supabase/types';
import { upsertSponsor, deleteSponsor } from '../../actions/crud';
import Modal from '../../components/Modal';
import * as S from '../../components/formStyles';

const TIERS: Sponsor['tier'][] = ['platinum', 'gold', 'silver', 'bronze', 'community'];

const TIER_COLORS: Record<Sponsor['tier'], string> = {
  platinum: '#E5E4E2',
  gold:     '#FBBF24',
  silver:   '#9CA3AF',
  bronze:   '#CD7F32',
  community:'#22D3EE',
};

const BLANK: Partial<Sponsor> = {
  name: '', logo_url: '', website_url: '', tier: 'community', display_order: 0, active: true,
};

export default function SponsorsClient({ initialSponsors }: { initialSponsors: Sponsor[] }) {
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [selected, setSelected] = useState<Partial<Sponsor> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = sponsors.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Group by tier for display
  const byTier = TIERS.map((tier) => ({
    tier,
    items: filtered.filter((s) => s.tier === tier),
  })).filter((g) => g.items.length > 0);

  async function handleSubmit(formData: FormData) {
    setLoading(true); setError(null);
    const res = await upsertSponsor(formData);
    if (res.error) { setError(res.error); setLoading(false); return; }
    window.location.reload();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await deleteSponsor(deleteId);
    setSponsors((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Sponsors</h1>
          <p style={{ color: '#6B6B75', fontSize: 13, marginTop: 4 }}>{sponsors.length} registrados</p>
        </div>
        <button style={S.btnPrimary} onClick={() => setSelected(BLANK)}>+ Nuevo sponsor</button>
      </div>

      {/* Search */}
      <input
        placeholder="Buscar por nombre…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...S.input, marginBottom: 20, maxWidth: 360 }}
      />

      {/* Grouped by tier */}
      {byTier.length === 0 && (
        <div style={{ textAlign: 'center', color: '#6B6B75', padding: 48 }}>Sin sponsors registrados aún</div>
      )}
      {byTier.map(({ tier, items }) => (
        <div key={tier} style={{ marginBottom: 32 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
          }}>
            <span style={{
              padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
              background: TIER_COLORS[tier] + '22', color: TIER_COLORS[tier],
              border: `1px solid ${TIER_COLORS[tier]}55`, textTransform: 'uppercase', letterSpacing: 1,
            }}>{tier}</span>
            <span style={{ color: '#6B6B75', fontSize: 12 }}>{items.length} sponsors</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2A2A35', color: '#6B6B75', textAlign: 'left' }}>
                  {['Nombre', 'Logo URL', 'Sitio web', 'Orden', 'Activo', 'Acciones'].map((h) => (
                    <th key={h} style={{ padding: '8px 12px', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((sp) => (
                  <tr key={sp.id} style={{ borderBottom: '1px solid #1A1A24' }}>
                    <td style={{ padding: '10px 12px', color: '#FFFFFF', fontWeight: 500 }}>
                      {sp.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={sp.logo_url} alt={sp.name} style={{ height: 28, maxWidth: 120, objectFit: 'contain', verticalAlign: 'middle', marginRight: 8 }} />
                      ) : null}
                      {sp.name}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#6B6B75', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sp.logo_url ?? '—'}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#6B6B75', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {sp.website_url ? <a href={sp.website_url} target="_blank" rel="noreferrer" style={{ color: '#22D3EE' }}>{sp.website_url}</a> : '—'}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#A1A1AA' }}>{sp.display_order}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 4, background: sp.active ? '#22C55E22' : '#1A1A24', color: sp.active ? '#22C55E' : '#6B6B75', fontSize: 11 }}>
                        {sp.active ? 'Activo' : 'Oculto'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button style={S.btnSecondary} onClick={() => setSelected(sp)}>Editar</button>
                        <button style={S.btnDanger} onClick={() => setDeleteId(sp.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Create / Edit Modal */}
      <Modal
        title={selected?.id ? 'Editar sponsor' : 'Nuevo sponsor'}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {selected.id && <input type="hidden" name="id" value={selected.id} />}
            <div style={S.field}>
              <label style={S.label}>Nombre *</label>
              <input name="name" required defaultValue={selected.name} style={S.input} />
            </div>
            <div style={S.field}>
              <label style={S.label}>Tier</label>
              <select name="tier" defaultValue={selected.tier ?? 'community'} style={S.select}>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <div style={S.field}>
              <label style={S.label}>URL del logo</label>
              <input name="logo_url" type="url" defaultValue={selected.logo_url ?? ''} style={S.input} placeholder="https://..." />
            </div>
            <div style={S.field}>
              <label style={S.label}>Sitio web</label>
              <input name="website_url" type="url" defaultValue={selected.website_url ?? ''} style={S.input} placeholder="https://..." />
            </div>
            <div style={S.grid2}>
              <div style={S.field}>
                <label style={S.label}>Orden de display</label>
                <input name="display_order" type="number" defaultValue={selected.display_order ?? 0} style={S.input} min={0} />
              </div>
              <div style={{ ...S.field, justifyContent: 'flex-end', paddingBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 24 }}>
                  <input
                    type="checkbox"
                    id="active"
                    name="active"
                    value="true"
                    defaultChecked={selected.active !== false}
                    style={{ width: 16, height: 16 }}
                  />
                  <label htmlFor="active" style={{ ...S.label, margin: 0 }}>Visible en el sitio</label>
                </div>
              </div>
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
      <Modal title="Eliminar sponsor" isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <p style={{ color: '#A1A1AA', marginBottom: 24 }}>¿Estás seguro? Esta acción no se puede deshacer.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={S.btnSecondary} onClick={() => setDeleteId(null)}>Cancelar</button>
          <button style={S.btnDanger} onClick={handleDelete}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}
