'use server';

import { createClient } from '../../../lib/supabase/server';
import { redirect } from 'next/navigation';

export async function adminLogin(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) return { error: 'Email y contraseña son requeridos.' };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: 'Credenciales incorrectas.' };

  redirect('/admin');
}

export async function adminLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
