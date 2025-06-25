import { CONFIG } from 'src/global-config';

import { MarketInsiderView } from 'src/sections/overview/market-insider/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <MarketInsiderView />;
}
