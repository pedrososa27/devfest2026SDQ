'use client';

import { createContext, useContext } from 'react';
import type { SiteConfig } from '../../lib/supabase/types';

const defaultConfig: SiteConfig = {
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
  updated_at: '',
};

const SiteConfigContext = createContext<SiteConfig>(defaultConfig);

export function SiteConfigProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: SiteConfig;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}
