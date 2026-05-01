/**
 * Helpers del lado del servidor para obtener datos desde Supabase.
 * Úsalos en Server Components o Route Handlers (no en Client Components).
 */
import { cache } from 'react';
import { createClient } from './server';
import type { Speaker, Talk, Sponsor, CoreTeamMember, CommitteeMember, Volunteer, SiteConfig } from './types';

// ─── Speakers ────────────────────────────────────────────────────────────────

export async function getSpeakers(): Promise<Speaker[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('speakers')
    .select('*')
    .order('name');

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getFeaturedSpeakers(): Promise<Speaker[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('speakers')
    .select('*')
    .eq('featured', true)
    .order('name');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Schedule ────────────────────────────────────────────────────────────────

export async function getTalks(): Promise<Talk[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('talks')
    .select('*')
    .order('starts_at');

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getTalksByTrack(track: string): Promise<Talk[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('talks')
    .select('*')
    .eq('track', track)
    .order('starts_at');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Sponsors ────────────────────────────────────────────────────────────────

export async function getSponsors(): Promise<Sponsor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('active', true)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getSponsorsByTier(
  tier: Sponsor['tier']
): Promise<Sponsor[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('active', true)
    .eq('tier', tier)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Core Team ───────────────────────────────────────────────────────────────

export async function getCoreTeam(): Promise<CoreTeamMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('core_team')
    .select('*')
    .eq('active', true)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Organizing Committee ────────────────────────────────────────────────────

export async function getCommitteeMembers(): Promise<CommitteeMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('committee_members')
    .select('*')
    .eq('active', true)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCommitteeMembersByArea(
  area: string
): Promise<CommitteeMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('committee_members')
    .select('*')
    .eq('active', true)
    .eq('area', area)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Volunteers ──────────────────────────────────────────────────────────────

export async function getVolunteers(): Promise<Volunteer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .eq('active', true)
    .order('area')
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getVolunteersByArea(
  area: Volunteer['area']
): Promise<Volunteer[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('volunteers')
    .select('*')
    .eq('active', true)
    .eq('area', area)
    .order('display_order');

  if (error) throw new Error(error.message);
  return data ?? [];
}

// ─── Site Config (feature flags) ─────────────────────────────────────────────

/**
 * Devuelve la fila única de configuración del sitio.
 * Envuelto con React cache() para deduplicar llamadas dentro de un mismo request
 * (layout + landing page pueden llamarla sin doble fetch).
 * Si por algún motivo no existe, retorna todos los flags en true (safe default).
 */
export const getSiteConfig = cache(async function (): Promise<SiteConfig> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .eq('id', 'default')
    .single();

  if (error || !data) {
    return {
      id: 'default',
      show_schedule: true,
      show_speakers: true,
      show_team: true,
      show_sponsors: true,
      show_cfp: false,
      show_pricing: true,
      show_past_talks: true,
      show_map: true,
      schedule_coming_soon_msg: null,
      speakers_coming_soon_msg: null,
      team_coming_soon_msg: null,
      updated_at: new Date().toISOString(),
    };
  }

  return data;
});
