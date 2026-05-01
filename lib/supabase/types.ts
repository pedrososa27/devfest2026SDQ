export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// ─── Tablas principales ──────────────────────────────────────────────────────

export interface Speaker {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  city: string | null;
  country: string | null;
  bio: string | null;
  photo_url: string | null;
  topics: string[] | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_github: string | null;
  featured: boolean;
  created_at: string;
}

export interface Talk {
  id: string;
  speaker_id: string | null;
  title: string;
  description: string | null;
  track: string | null;       // "AI/ML" | "Web" | "Mobile" | "Cloud" | etc.
  room: string | null;
  starts_at: string;          // ISO timestamp
  ends_at: string;
  talk_type: 'talk' | 'workshop' | 'keynote' | 'panel' | 'break';
  level: 'beginner' | 'intermediate' | 'advanced' | null;
  language: string | null;    // "es" | "en"
  created_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'community';
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface VolunteerApplication {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  preferred_area: string | null;   // "logistics" | "hospitality" | "tech" | "design" | "comms"
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'waitlist';
  created_at: string;
}

export interface CoreTeamMember {
  id: string;
  name: string;
  role_label: string;           // "GDG LEAD" | "PROGRAM CHAIR" | …
  accent_label: string;         // "LEAD" | "PROG" | "OPS" | "CONT"
  title: string | null;
  bio: string | null;
  photo_url: string | null;
  handle: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_github: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  initials: string;
  badge: string;                // "AI" | "SEC" | "DATA" | …
  role: string;                 // "Track Captain — AI/ML"
  area: string | null;
  handle: string | null;
  photo_url: string | null;
  social_twitter: string | null;
  social_linkedin: string | null;
  social_github: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface Volunteer {
  id: string;
  full_name: string;
  initials: string;
  area: 'logistics' | 'hospitality' | 'tech' | 'design' | 'comms';
  photo_url: string | null;
  handle: string | null;
  social_linkedin: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface PastTalk {
  id: string;
  youtube_video_id: string;
  title: string;
  speaker: string | null;
  year: string | null;
  display_order: number;
  active: boolean;
  created_at: string;
}

export interface SiteConfig {
  id: string;
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
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

// ─── Database schema para el cliente tipado ──────────────────────────────────

export interface Database {
  public: {
    Tables: {
      speakers: {
        Row: Speaker;
        Insert: Omit<Speaker, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Speaker, 'id' | 'created_at'>>;
      };
      talks: {
        Row: Talk;
        Insert: Omit<Talk, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Talk, 'id' | 'created_at'>>;
      };
      sponsors: {
        Row: Sponsor;
        Insert: Omit<Sponsor, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Sponsor, 'id' | 'created_at'>>;
      };
      volunteer_applications: {
        Row: VolunteerApplication;
        Insert: Omit<VolunteerApplication, 'id' | 'created_at' | 'status'> & {
          id?: string;
          created_at?: string;
          status?: VolunteerApplication['status'];
        };
        Update: Partial<Omit<VolunteerApplication, 'id' | 'created_at'>>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, 'id' | 'created_at' | 'read'> & {
          id?: string;
          created_at?: string;
          read?: boolean;
        };
        Update: Partial<Omit<ContactMessage, 'id' | 'created_at'>>;
      };
      core_team: {
        Row: CoreTeamMember;
        Insert: Omit<CoreTeamMember, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<CoreTeamMember, 'id' | 'created_at'>>;
      };
      committee_members: {
        Row: CommitteeMember;
        Insert: Omit<CommitteeMember, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<CommitteeMember, 'id' | 'created_at'>>;
      };
      volunteers: {
        Row: Volunteer;
        Insert: Omit<Volunteer, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<Volunteer, 'id' | 'created_at'>>;
      };
      past_talks: {
        Row: PastTalk;
        Insert: Omit<PastTalk, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Omit<PastTalk, 'id' | 'created_at'>>;
      };
      site_config: {
        Row: SiteConfig;
        Insert: Partial<SiteConfig> & { id?: string };
        Update: Partial<Omit<SiteConfig, 'id'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
