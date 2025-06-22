import { CONFIG } from 'src/global-config';

import { OverviewDownloadsView } from 'src/sections/overview/downloads/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewDownloadsView />;
}
