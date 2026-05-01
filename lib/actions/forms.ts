'use server';

/**
 * Server Actions para enviar formularios a Supabase.
 * Llama a estas funciones desde Client Components con el hook useActionState
 * o con un <form action={...}>.
 */
import { createClient } from '../supabase/server';
import type { Database } from '../supabase/types';

type VolunteerInsert =
  Database['public']['Tables']['volunteer_applications']['Insert'];
type ContactInsert =
  Database['public']['Tables']['contact_messages']['Insert'];

// ─── Voluntarios ─────────────────────────────────────────────────────────────

export async function submitVolunteerApplication(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const payload: VolunteerInsert = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    phone: formData.get('phone') ? String(formData.get('phone')).trim() : null,
    preferred_area: formData.get('preferred_area')
      ? String(formData.get('preferred_area'))
      : null,
    message: formData.get('message')
      ? String(formData.get('message')).trim()
      : null,
  };

  if (!payload.full_name || !payload.email) {
    return { success: false, error: 'Nombre y email son obligatorios.' };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('volunteer_applications')
    .insert(payload);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

// ─── Contacto ────────────────────────────────────────────────────────────────

export async function submitContactMessage(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const payload: ContactInsert = {
    name: String(formData.get('name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    subject: formData.get('subject')
      ? String(formData.get('subject')).trim()
      : null,
    message: String(formData.get('message') ?? '').trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return {
      success: false,
      error: 'Nombre, email y mensaje son obligatorios.',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('contact_messages')
    .insert(payload);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
