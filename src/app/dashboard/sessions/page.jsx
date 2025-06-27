import { CONFIG } from 'src/global-config';

import { SessionsView } from 'src/sections/overview/sessions/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <SessionsView />;
}