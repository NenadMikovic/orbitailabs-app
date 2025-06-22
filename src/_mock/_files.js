import { _mock } from './_mock';
import { _tags } from './assets';

// ----------------------------------------------------------------------

const GB = 1000000000 * 24;

const FOLDERS = ['Docs', 'Projects', 'Work', 'Training', 'Sport', 'Foods'];

const URLS = [
  _mock.image.cover(1),
  'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
  'https://www.cloud.com/s/c218bo6kjuqyv66/expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
  'https://www.cloud.com/s/c218bo6kjuqyv66/money-popup-crack.pdf',
  _mock.image.cover(3),
  _mock.image.cover(5),
  'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
  'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
  'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
  'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/vintage_bahrain_saipan.xls',
  'https://www.cloud.com/s/c218bo6kjuqyv66/indonesia-quito-nancy-grace-left-glad.xlsx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/legislation-grain.zip',
  'https://www.cloud.com/s/c218bo6kjuqyv66/large_energy_dry_philippines.rar',
  'https://www.cloud.com/s/c218bo6kjuqyv66/footer-243-ecuador.iso',
  'https://www.cloud.com/s/c218bo6kjuqyv66/kyrgyzstan-04795009-picabo-street-guide-style.ai',
  'https://www.cloud.com/s/c218bo6kjuqyv66/india-data-large-gk-chesterton-mother.esp',
  'https://www.cloud.com/s/c218bo6kjuqyv66/footer-barbados-celine-dion.ppt',
  'https://www.cloud.com/s/c218bo6kjuqyv66/socio_respectively_366996.pptx',
  'https://www.cloud.com/s/c218bo6kjuqyv66/socio_ahead_531437_sweden_popup.wav',
  'https://www.cloud.com/s/c218bo6kjuqyv66/trinidad_samuel-morse_bring.m4v',
  _mock.image.cover(11),
  _mock.image.cover(17),
  'https://www.cloud.com/s/c218bo6kjuqyv66/xl_david-blaine_component_tanzania_books.pdf',
];

const SHARED_PERSONS = Array.from({ length: 20 }, (_, index) => ({
  id: _mock.id(index),
  name: _mock.fullName(index),
  email: _mock.email(index),
  avatarUrl: _mock.image.avatar(index),
  permission: index % 2 ? 'view' : 'edit',
}));

export const FILE_TYPE_OPTIONS = [
  'folder',
  'txt',
  'zip',
  'audio',
  'image',
  'video',
  'word',
  'excel',
  'powerpoint',
  'pdf',
  'photoshop',
  'illustrator',
];

// ----------------------------------------------------------------------

const shared = (index) =>
  (index === 0 && SHARED_PERSONS.slice(0, 5)) ||
  (index === 1 && SHARED_PERSONS.slice(5, 9)) ||
  (index === 2 && SHARED_PERSONS.slice(9, 11)) ||
  (index === 3 && SHARED_PERSONS.slice(11, 12)) ||
  [];

export const _folders = FOLDERS.map((name, index) => ({
  id: `${_mock.id(index)}_folder`,
  name,
  type: 'folder',
  url: URLS[index],
  shared: shared(index),
  tags: _tags.slice(0, 5),
  size: GB / ((index + 1) * 10),
  totalFiles: (index + 1) * 100,
  createdAt: _mock.time(index),
  modifiedAt: _mock.time(index),
  isFavorited: _mock.boolean(index + 1),
}));

export const _files = [
  {
    id: 'starter_file',
    name: 'Stellaris_Starter_Bot.zip',
    url: '/downloads/stellaris-starter.zip',
    size: 3_200_000, // size in bytes
    type: 'zip',
    requiredPlan: 'starter',
    version: '1.3',
    preview: '/assets/icons/files/ic-word.svg',
    createdAt: new Date('2025-06-20'),
    modifiedAt: new Date('2025-06-21'),
    shared: [],
    tags: [],
    isFavorited: false,
  },
  {
    id: 'pro_file',
    name: 'Stellaris_Pro_Bot.zip',
    url: '/downloads/stellaris-pro.zip',
    size: 4_500_000,
    type: 'zip',
    requiredPlan: 'pro',
    version: '1.5',
    preview: '/assets/icons/files/ic-folder-pink.svg',
    createdAt: new Date('2025-06-20'),
    modifiedAt: new Date('2025-06-22'),
    shared: [],
    tags: [],
    isFavorited: false,
  },
  {
    id: 'elite_file',
    name: 'Stellaris_Elite_Bot.zip',
    url: '/downloads/stellaris-elite.zip',
    size: 6_000_000,
    type: 'zip',
    requiredPlan: 'elite',
    version: '1.8',
    preview: '/assets/icons/files/ic-folder-purple.svg',
    createdAt: new Date('2025-06-20'),
    modifiedAt: new Date('2025-06-23'),
    shared: [],
    tags: [],
    isFavorited: false,
  },
];


export const _allFiles = [..._folders, ..._files];
