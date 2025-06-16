import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import Divider from '@mui/material/Divider';
import { Tooltip } from '@mui/material';



// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: <Iconify icon="fa-solid:blog" />,
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  params: icon('ic-params'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  market: <Iconify icon="solar:chart-bold-duotone" />,
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  help: <Iconify icon="streamline-ultimate:laptop-help-message" />,
  guide: <Iconify icon="solar:book-linear" />,
  analytics: icon('ic-analytics'),
  downloads: <Iconify icon="bi:box" />,
  licenses: <Iconify icon="solar:key-linear" />,
  dashboard: <Iconify icon="material-symbols:space-dashboard-rounded" />,
  sessions: <Iconify icon="mingcute:time-line" />,
  insider: <Iconify icon="fluent-mdl2:insights" />,
  fundamental: <Iconify icon="heroicons:scale" />,
  calculator: <Iconify icon="mdi:calculator" />,
  community: <Iconify icon="fluent:people-community-add-20-regular" />,
  request: <Iconify icon="material-symbols:feedback-outline" />,
};

// ----------------------------------------------------------------------

/**
 * Input nav data is an array of navigation section items used to define the structure and content of a navigation bar.
 * Each section contains a subheader and an array of items, which can include nested children items.
 *
 * Each item can have the following properties:
 * - `title`: The title of the navigation item.
 * - `path`: The URL path the item links to.
 * - `icon`: An optional icon component to display alongside the title.
 * - `info`: Optional additional information to display, such as a label.
 * - `allowedRoles`: An optional array of roles that are allowed to see the item.
 * - `caption`: An optional caption to display below the title.
 * - `children`: An optional array of nested navigation items.
 * - `disabled`: An optional boolean to disable the item.
 * - `deepMatch`: An optional boolean to indicate if the item should match subpaths.
 */
export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Manage Licenses', path: paths.dashboard.general.ecommerce, icon: ICONS.licenses },
      { title: 'Downloads', path: paths.dashboard.general.analytics, icon: ICONS.downloads },
      /**{ title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
      { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
      { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
      { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },*/
       {
        title: 'Guides',
        path: paths.dashboard.product.root,
        icon: ICONS.guide,
        children: [
          { title: 'Stellaris Installation', path: paths.dashboard.product.root },
          { title: 'How-to-Use Stellaris', path: paths.dashboard.product.demo.details },
          { title: 'Using Dashboard AI Tools', path: paths.dashboard.product.new },
        ],
      },
      { title: 'Help Desk', path: paths.dashboard.general.analytics, icon: ICONS.help },
      { title: 'Stellaris Performance', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
    ],
  },

  /**
   * Management
   */
  

  {
    subheader: 'AI Trading Tools',
    items: [
    /**   {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: paths.dashboard.user.root },
          { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'List', path: paths.dashboard.user.list },
          { title: 'Create', path: paths.dashboard.user.new },
          { title: 'Edit', path: paths.dashboard.user.demo.edit },
          { title: 'Account', path: paths.dashboard.user.account, deepMatch: true },
        ],
      },*/
      {
        title: 'Market Insider',
        path: paths.dashboard.mail,
        icon: ICONS.insider,
      },
      {
        title: 'Session Times',
        path: paths.dashboard.product.root,
        icon: ICONS.sessions,
      },
      {
        title: 'Economic Calendar',
        path: paths.dashboard.order.root,
        icon: ICONS.calendar,
      },
      {
        title: 'Technicals - Live Charts',
        path: paths.dashboard.invoice.root,
        icon: ICONS.market,
      },
      
      {
        title: 'Fundamental Analysis',
        path: paths.dashboard.tour.root,
        icon: ICONS.fundamental,
      },
      {
        title: 'Position Size Calculator',
        path: paths.dashboard.job.root,
        icon: ICONS.calculator,
      },
      /**{ title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
      {
        title: 'Mail',
        path: paths.dashboard.mail,
        icon: ICONS.mail,
        info: (
          <Label color="error" variant="inverted">
            +32
          </Label>
        ),
      },
      { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },*/
    ],
  },
  /**
   * Item state
   */
  {
    subheader: 'Community',
    items: [
      {
        title: 'Blog',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
      },
    
      {
        title: 'OrbitNet',
        path: paths.dashboard.mail,
        icon: ICONS.community,
        info: (
          <Label color="error" variant="inverted">
            Coming Soon
          </Label>
        ),
        caption: 'Trading Community',
        disabled: true,
      },
    ],
  },
      /**{
        
         * Permissions can be set for each item by using the `allowedRoles` property.
         * - If `allowedRoles` is not set (default), all roles can see the item.
         * - If `allowedRoles` is an empty array `[]`, no one can see the item.
         * - If `allowedRoles` contains specific roles, only those roles can see the item.
         *
         * Examples:
         * - `allowedRoles: ['user']` - only users with the 'user' role can see this item.
         * - `allowedRoles: ['admin']` - only users with the 'admin' role can see this item.
         * - `allowedRoles: ['admin', 'manager']` - only users with the 'admin' or 'manager' roles can see this item.
         *
         * Combine with the `checkPermissions` prop to build conditional expressions.
         * Example usage can be found in: src/sections/_examples/extra/navigation-bar-view/nav-vertical.{jsx | tsx}
         
        title: 'Permission',
        path: paths.dashboard.permission,
        icon: ICONS.lock,
        allowedRoles: ['admin', 'manager'],
        caption: 'Only admin can see this item.',
      },
      {
        title: 'Level',
        path: '#/dashboard/menu-level',
        icon: ICONS.menuItem,
        children: [
          {
            title: 'Level 1a',
            path: '#/dashboard/menu-level/1a',
            children: [
              { title: 'Level 2a', path: '#/dashboard/menu-level/1a/2a' },
              {
                title: 'Level 2b',
                path: '#/dashboard/menu-level/1a/2b',
                children: [
                  {
                    title: 'Level 3a',
                    path: '#/dashboard/menu-level/1a/2b/3a',
                  },
                  {
                    title: 'Level 3b',
                    path: '#/dashboard/menu-level/1a/2b/3b',
                  },
                ],
              },
            ],
          },
          { title: 'Level 1b', path: '#/dashboard/menu-level/1b' },
        ],
      },
      {
        title: 'Disabled',
        path: '#disabled',
        icon: ICONS.disabled,
        disabled: true,
      },
      {
        title: 'Label',
        path: '#label',
        icon: ICONS.label,
        info: (
          <Label
            color="info"
            variant="inverted"
            startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
          >
            NEW
          </Label>
        ),
      },
      {
        title: 'Caption',
        path: '#caption',
        icon: ICONS.menuItem,
        caption:
          'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      },
      {
        title: 'Params',
        path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        icon: ICONS.params,
      },
      {
        title: 'Subpaths',
        path: '/dashboard/subpaths',
        icon: ICONS.subpaths,
        deepMatch: true,
      },
      {
        title: 'External link',
        path: 'https://www.google.com/',
        icon: ICONS.external,
        info: <Iconify width={18} icon="eva:external-link-fill" />,
      },
      { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },*/
       {
    subheader: 'Feedback',
    items: [
      { title: 'Request a Feature', path: paths.dashboard.general.ecommerce, icon: ICONS.request }
    ],
  },   
]
