import { createClient } from '../../../../lib/supabase/server';
import SponsorsClient from './SponsorsClient';

export default async function SponsorsAdminPage() {
  const supabase = await createClient();
  const { data: sponsors } = await supabase
    .from('sponsors')
    .select('*')
    .order('tier')
    .order('display_order');

  return <SponsorsClient initialSponsors={sponsors ?? []} />;
}
