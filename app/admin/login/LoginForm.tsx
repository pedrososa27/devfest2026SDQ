'use client';

import { useState } from 'react';
import { adminLogin } from '../actions/auth';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  background: '#0A0A0F',
  border: '1px solid #2A2A35',
  borderRadius: 8,
  color: '#FFFFFF',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
};

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await adminLogin(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ display: 'block', fontSize: 12, color: '#A1A1AA', marginBottom: 6 }}>Email</label>
        <input name="email" type="email" required autoComplete="email" style={inputStyle} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 12, color: '#A1A1AA', marginBottom: 6 }}>Contraseña</label>
        <input name="password" type="password" required autoComplete="current-password" style={inputStyle} />
      </div>

      {error && (
        <div style={{ padding: '10px 12px', background: '#EF444422', border: '1px solid #EF444466', borderRadius: 8, color: '#EF4444', fontSize: 13 }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '11px',
          background: loading ? '#6B21A8' : '#A855F7',
          border: 'none',
          borderRadius: 8,
          color: '#FFFFFF',
          fontSize: 14,
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          marginTop: 4,
        }}
      >
        {loading ? 'Iniciando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
