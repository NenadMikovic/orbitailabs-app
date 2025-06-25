import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <Iconify icon="material-symbols:space-dashboard-rounded" />,
  },
  {
    label: 'Licenses & Plans',
    href: '/dashboard/manage-licenses',
    icon: <Iconify icon="solar:key-linear" />,
  },
  {
    label: 'Downloads',
    href: '/dashboard/downloads',
    icon: <Iconify icon="bi:box" />,
  },
  {
    label: 'Subscriptions',
    href: '/dashboard/user/account/billing',
    icon: <Iconify icon="streamline:subscription-cashflow" />,
  },
  {
    label: 'Account settings',
    href: '/dashboard/user/account',
    icon: <Iconify icon="material-symbols:settings-outline" />,
  },
  {
    label: 'Security',
    href: '/dashboard/user/account/change-password',
    icon: <Iconify icon="material-symbols:security" />,
  },
  
];
