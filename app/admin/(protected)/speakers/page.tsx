import { createClient } from '../../../../lib/supabase/server';
import SpeakersClient from './SpeakersClient';

export default async function AdminSpeakersPage() {
  const supabase = await createClient();
  const { data: speakers } = await supabase.from('speakers').select('*').order('name');

  return <SpeakersClient initialSpeakers={speakers ?? []} />;
}
