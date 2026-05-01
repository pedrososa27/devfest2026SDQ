import { createClient } from '../../../../lib/supabase/server';
import PastTalksAdminClient from './PastTalksAdminClient';

export const dynamic = 'force-dynamic';

export default async function PastTalksAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('past_talks')
    .select('*')
    .order('display_order', { ascending: true });

  return <PastTalksAdminClient initialTalks={data ?? []} />;
}
