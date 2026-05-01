import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export default async function AdminLoginPage() {
  // If already logged in, go to admin
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/admin');

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0F',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 380,
        background: '#13131A',
        border: '1px solid #2A2A35',
        borderRadius: 16,
        padding: '36px 32px',
      }}>
        <div style={{ marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{'<>'}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF' }}>DevFest Admin</div>
          <div style={{ fontSize: 13, color: '#6B6B75', marginTop: 4 }}>Acceso restringido</div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
