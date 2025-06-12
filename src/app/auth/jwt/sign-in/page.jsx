import { CONFIG } from 'src/global-config';

import { SupabaseSignInView } from 'src/auth/view/supabase';


// ----------------------------------------------------------------------

export const metadata = { title: `Sign in | Jwt - ${CONFIG.appName}` };

export default function Page() {
  return <SupabaseSignInView />;
}
