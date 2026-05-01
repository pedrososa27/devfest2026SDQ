import { createClient } from '../../../../lib/supabase/server';
import ScheduleClient from './ScheduleClient';

export default async function AdminSchedulePage() {
  const supabase = await createClient();

  const [{ data: talks }, { data: speakers }] = await Promise.all([
    supabase.from('talks').select('*, speakers(name)').order('starts_at'),
    supabase.from('speakers').select('id, name').order('name'),
  ]);

  return <ScheduleClient initialTalks={talks ?? []} speakers={speakers ?? []} />;
}
