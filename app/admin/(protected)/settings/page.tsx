import { createClient } from '../../../../lib/supabase/server';
import { SiteConfig } from '../../../../lib/supabase/types';
import SettingsClient from './SettingsClient';

export const dynamic = 'force-dynamic';

const DEFAULT_CONFIG: SiteConfig = {
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

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_config')
    .select('*')
    .eq('id', 'default')
    .single();

  const config: SiteConfig = data ?? DEFAULT_CONFIG;

  return <SettingsClient config={config} />;
}
