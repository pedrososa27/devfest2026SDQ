import { createClient } from '../../../../lib/supabase/server';
import TeamClient from './TeamClient';

export default async function AdminTeamPage() {
  const supabase = await createClient();

  const [{ data: coreTeam }, { data: committee }, { data: volunteers }] = await Promise.all([
    supabase.from('core_team').select('*').order('display_order'),
    supabase.from('committee_members').select('*').order('display_order'),
    supabase.from('volunteers').select('*').order('area').order('display_order'),
  ]);

  return (
    <TeamClient
      initialCore={coreTeam ?? []}
      initialCommittee={committee ?? []}
      initialVolunteers={volunteers ?? []}
    />
  );
}
