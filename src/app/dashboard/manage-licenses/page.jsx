import { CONFIG } from 'src/global-config';

import { OverviewManageLicensesView } from 'src/sections/overview/manage-licenses/view';

// ----------------------------------------------------------------------

export const metadata = { title: `E-commerce | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewManageLicensesView />;
}
