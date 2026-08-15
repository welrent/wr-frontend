/**
 * Connection to the public Welrent Act repository / deployment.
 * Source: https://github.com/welrent/Act
 */
export const ACT_REPO_URL = 'https://github.com/welrent/Act';

export const ACT_BASE_URL = (
  process.env.NEXT_PUBLIC_ACT_BASE_URL || 'https://act.welrent.com'
).replace(/\/$/, '');

export type ActPageLink = {
  title: string;
  body: string;
  path: string;
};

/** Catalog mirrored from Act next-app home + sidebar */
export const ACT_PAGES: ActPageLink[] = [
  {
    title: 'Car rental agreement',
    body: 'Smart contract template for passenger vehicles.',
    path: '/pages/car-rental-agreement',
  },
  {
    title: 'Boat rental agreement',
    body: 'Agreements for boats and yachts on Welrent Act.',
    path: '/pages/boat-rental-agreement',
  },
  {
    title: 'Equipment rental agreement',
    body: 'Gear and equipment rental terms powered by Act.',
    path: '/pages/equipment-rental-agreement',
  },
  {
    title: 'Terms of Service',
    body: 'Platform rules published from the Act legal pages.',
    path: '/pages/terms',
  },
  {
    title: 'Privacy Statement',
    body: 'How Welrent Act collects and protects personal data.',
    path: '/pages/privacy',
  },
  {
    title: 'Cookie Statement',
    body: 'Cookie and tracking disclosures from Act.',
    path: '/pages/cookie',
  },
  {
    title: 'Accessibility',
    body: 'Act accessibility commitment.',
    path: '/pages/accessibility',
  },
  {
    title: 'Agreements desk',
    body: 'Browse and manage rental agreements in Act.',
    path: '/agreements',
  },
];

export function actUrl(path = '/'): string {
  if (!path || path === '/') return ACT_BASE_URL;
  return `${ACT_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
