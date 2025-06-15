import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Home',
    href: '/',
    icon: <Iconify icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'Profile',
    href: '/dashboard/user',
    icon: <Iconify icon="custom:profile-duotone" />,
  },
  {
    label: 'Downloads',
    href: '#',
    icon: <Iconify icon="solar:notes-bold-duotone" />,
    info: 'Coming soon',
  },
  {
    label: 'Subscriptions',
    href: '/dashboard/user/account/billing',
    icon: <Iconify icon="custom:invoice-duotone" />,
  },
  {
    label: 'Security',
    href: '/dashboard/user/account/change-password',
    icon: <Iconify icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Account settings',
    href: '/dashboard/user/account',
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
