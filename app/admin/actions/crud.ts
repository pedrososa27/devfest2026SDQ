'use server';

import { createClient } from '../../../lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ─── Speakers ─────────────────────────────────────────────────────────────────

export async function upsertSpeaker(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const topicsRaw = formData.getAll('topics') as string[];
  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    title: formData.get('title') ? String(formData.get('title')).trim() : null,
    company: formData.get('company') ? String(formData.get('company')).trim() : null,
    city: formData.get('city') ? String(formData.get('city')).trim() : null,
    country: formData.get('country') ? String(formData.get('country')).trim() : null,
    bio: formData.get('bio') ? String(formData.get('bio')).trim() : null,
    photo_url: formData.get('photo_url') ? String(formData.get('photo_url')).trim() : null,
    topics: topicsRaw.length > 0 ? topicsRaw.filter(Boolean) : null,
    social_twitter: formData.get('social_twitter') ? String(formData.get('social_twitter')).trim() : null,
    social_linkedin: formData.get('social_linkedin') ? String(formData.get('social_linkedin')).trim() : null,
    social_github: formData.get('social_github') ? String(formData.get('social_github')).trim() : null,
    featured: formData.get('featured') === 'true',
  };

  if (!payload.name) return { error: 'El nombre es requerido.' };

  const { error } = id
    ? await supabase.from('speakers').update(payload).eq('id', id)
    : await supabase.from('speakers').insert(payload);

  if (error) return { error: error.message };

  revalidatePath('/admin/speakers');
  revalidatePath('/[locale]/speakers', 'page');
  return {};
}

export async function deleteSpeaker(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('speakers').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/speakers');
  revalidatePath('/[locale]/speakers', 'page');
  return {};
}

// ─── Talks ────────────────────────────────────────────────────────────────────

export async function upsertTalk(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    title: String(formData.get('title') ?? '').trim(),
    description: formData.get('description') ? String(formData.get('description')).trim() : null,
    speaker_id: formData.get('speaker_id') ? String(formData.get('speaker_id')) : null,
    track: formData.get('track') ? String(formData.get('track')).trim() : null,
    room: formData.get('room') ? String(formData.get('room')).trim() : null,
    starts_at: String(formData.get('starts_at') ?? ''),
    ends_at: String(formData.get('ends_at') ?? ''),
    talk_type: String(formData.get('talk_type') ?? 'talk') as 'talk' | 'workshop' | 'keynote' | 'panel' | 'break',
    level: formData.get('level') ? String(formData.get('level')) as 'beginner' | 'intermediate' | 'advanced' : null,
    language: formData.get('language') ? String(formData.get('language')).trim() : null,
  };

  if (!payload.title || !payload.starts_at || !payload.ends_at)
    return { error: 'Título, hora de inicio y fin son requeridos.' };

  const { error } = id
    ? await supabase.from('talks').update(payload).eq('id', id)
    : await supabase.from('talks').insert(payload);

  if (error) return { error: error.message };

  revalidatePath('/admin/schedule');
  revalidatePath('/[locale]/schedule', 'page');
  return {};
}

export async function deleteTalk(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('talks').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/schedule');
  revalidatePath('/[locale]/schedule', 'page');
  return {};
}

// ─── Core Team ───────────────────────────────────────────────────────────────

export async function upsertCoreTeamMember(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    role_label: String(formData.get('role_label') ?? '').trim(),
    accent_label: String(formData.get('accent_label') ?? '').trim(),
    title: formData.get('title') ? String(formData.get('title')).trim() : null,
    bio: formData.get('bio') ? String(formData.get('bio')).trim() : null,
    photo_url: formData.get('photo_url') ? String(formData.get('photo_url')).trim() : null,
    handle: formData.get('handle') ? String(formData.get('handle')).trim() : null,
    social_twitter: formData.get('social_twitter') ? String(formData.get('social_twitter')).trim() : null,
    social_linkedin: formData.get('social_linkedin') ? String(formData.get('social_linkedin')).trim() : null,
    social_github: formData.get('social_github') ? String(formData.get('social_github')).trim() : null,
    display_order: Number(formData.get('display_order') ?? 0),
    active: formData.get('active') !== 'false',
  };

  if (!payload.name || !payload.role_label) return { error: 'Nombre y rol son requeridos.' };

  const { error } = id
    ? await supabase.from('core_team').update(payload).eq('id', id)
    : await supabase.from('core_team').insert(payload);

  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/[locale]/team', 'page');
  return {};
}

export async function deleteCoreTeamMember(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('core_team').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  return {};
}

// ─── Committee Members ───────────────────────────────────────────────────────

export async function upsertCommitteeMember(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    initials: String(formData.get('initials') ?? '').trim().toUpperCase(),
    badge: String(formData.get('badge') ?? '').trim().toUpperCase(),
    role: String(formData.get('role') ?? '').trim(),
    area: formData.get('area') ? String(formData.get('area')).trim() : null,
    handle: formData.get('handle') ? String(formData.get('handle')).trim() : null,
    photo_url: formData.get('photo_url') ? String(formData.get('photo_url')).trim() : null,
    social_twitter: formData.get('social_twitter') ? String(formData.get('social_twitter')).trim() : null,
    social_linkedin: formData.get('social_linkedin') ? String(formData.get('social_linkedin')).trim() : null,
    social_github: formData.get('social_github') ? String(formData.get('social_github')).trim() : null,
    display_order: Number(formData.get('display_order') ?? 0),
    active: formData.get('active') !== 'false',
  };

  if (!payload.name || !payload.role) return { error: 'Nombre y rol son requeridos.' };

  const { error } = id
    ? await supabase.from('committee_members').update(payload).eq('id', id)
    : await supabase.from('committee_members').insert(payload);

  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/[locale]/team', 'page');
  return {};
}

export async function deleteCommitteeMember(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('committee_members').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  return {};
}

// ─── Volunteers ──────────────────────────────────────────────────────────────

export async function upsertVolunteer(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    initials: String(formData.get('initials') ?? '').trim().toUpperCase(),
    area: String(formData.get('area') ?? '') as 'logistics' | 'hospitality' | 'tech' | 'design' | 'comms',
    photo_url: formData.get('photo_url') ? String(formData.get('photo_url')).trim() : null,
    handle: formData.get('handle') ? String(formData.get('handle')).trim() : null,
    social_linkedin: formData.get('social_linkedin') ? String(formData.get('social_linkedin')).trim() : null,
    display_order: Number(formData.get('display_order') ?? 0),
    active: formData.get('active') !== 'false',
  };

  if (!payload.full_name || !payload.area) return { error: 'Nombre y área son requeridos.' };

  const { error } = id
    ? await supabase.from('volunteers').update(payload).eq('id', id)
    : await supabase.from('volunteers').insert(payload);

  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/[locale]/team', 'page');
  return {};
}

export async function deleteVolunteer(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('volunteers').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/team');
  return {};
}

// ─── Sponsors ─────────────────────────────────────────────────────────────────

export async function upsertSponsor(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    name: String(formData.get('name') ?? '').trim(),
    logo_url: formData.get('logo_url') ? String(formData.get('logo_url')).trim() : null,
    website_url: formData.get('website_url') ? String(formData.get('website_url')).trim() : null,
    tier: String(formData.get('tier') ?? 'community') as 'platinum' | 'gold' | 'silver' | 'bronze' | 'community',
    display_order: Number(formData.get('display_order') ?? 0),
    active: formData.get('active') === 'true',
  };

  if (!payload.name) return { error: 'El nombre es requerido.' };

  const { error } = id
    ? await supabase.from('sponsors').update(payload).eq('id', id)
    : await supabase.from('sponsors').insert(payload);

  if (error) return { error: error.message };
  revalidatePath('/admin/sponsors');
  revalidatePath('/[locale]', 'page');
  return {};
}

export async function deleteSponsor(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('sponsors').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/sponsors');
  revalidatePath('/[locale]', 'page');
  return {};
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export async function updateSiteConfig(
  updates: Partial<{
    show_schedule: boolean;
    show_speakers: boolean;
    show_team: boolean;
    show_sponsors: boolean;
    show_cfp: boolean;
    show_pricing: boolean;
    show_past_talks: boolean;
    show_map: boolean;
    schedule_coming_soon_msg: string | null;
    speakers_coming_soon_msg: string | null;
    team_coming_soon_msg: string | null;
  }>
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('site_config')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', 'default');
  if (error) return { error: error.message };
  revalidatePath('/admin/settings');
  revalidatePath('/[locale]', 'layout');
  return {};
}

// ─── Past Talks ───────────────────────────────────────────────────────────────

export async function upsertPastTalk(formData: FormData): Promise<{ error?: string }> {
  const supabase = await createClient();
  const id = formData.get('id') as string | null;

  const payload = {
    youtube_video_id: String(formData.get('youtube_video_id') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    speaker: formData.get('speaker') ? String(formData.get('speaker')).trim() : null,
    year: formData.get('year') ? String(formData.get('year')).trim() : null,
    display_order: Number(formData.get('display_order') ?? 0),
    active: formData.get('active') === 'true',
  };

  if (!payload.youtube_video_id) return { error: 'El ID de YouTube es requerido.' };
  if (!payload.title) return { error: 'El título es requerido.' };

  const { error } = id
    ? await supabase.from('past_talks').update(payload).eq('id', id)
    : await supabase.from('past_talks').insert(payload);

  if (error) return { error: error.message };
  revalidatePath('/admin/past-talks');
  revalidatePath('/[locale]', 'page');
  return {};
}

export async function deletePastTalk(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from('past_talks').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/past-talks');
  revalidatePath('/[locale]', 'page');
  return {};
}
