/* Shared admin form styles */
export const field: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6 };
export const label: React.CSSProperties = { fontSize: 12, color: '#A1A1AA', fontWeight: 500 };
export const input: React.CSSProperties = {
  padding: '9px 12px', background: '#0A0A0F', border: '1px solid #2A2A35',
  borderRadius: 8, color: '#FFFFFF', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box',
};
export const textarea: React.CSSProperties = { ...input, resize: 'vertical', minHeight: 80, fontFamily: 'inherit' };
export const select: React.CSSProperties = { ...input, cursor: 'pointer' };
export const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 };
export const errorBox: React.CSSProperties = {
  padding: '10px 12px', background: '#EF444422', border: '1px solid #EF444466',
  borderRadius: 8, color: '#EF4444', fontSize: 13,
};
export const btnPrimary: React.CSSProperties = {
  padding: '10px 20px', background: '#A855F7', border: 'none', borderRadius: 8,
  color: '#FFFFFF', fontSize: 14, fontWeight: 600, cursor: 'pointer',
};
export const btnDanger: React.CSSProperties = {
  padding: '6px 12px', background: 'transparent', border: '1px solid #EF444466',
  borderRadius: 6, color: '#EF4444', fontSize: 12, cursor: 'pointer',
};
export const btnSecondary: React.CSSProperties = {
  padding: '6px 12px', background: 'transparent', border: '1px solid #2A2A35',
  borderRadius: 6, color: '#A1A1AA', fontSize: 12, cursor: 'pointer',
};
