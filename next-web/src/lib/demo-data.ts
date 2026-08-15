export type DemoCar = {
    id: number;
    name: string;
    slug: string;
    subtitle: string;
    photo_url: string;
    is_dark_mode: boolean;
    price: number;
};

export const DEMO_CARS: DemoCar[] = [
    {
        id: 1,
        name: 'an RS6',
        slug: 'an-RS6',
        subtitle: 'Rent...',
        photo_url: 'assets/WLR_CAR_RS6.png',
        is_dark_mode: false,
        price: 120,
    },
    {
        id: 2,
        name: 'an EVO',
        slug: 'an-EVO',
        subtitle: 'Rent...',
        photo_url: 'assets/WLR_CAR_EVO.png',
        is_dark_mode: true,
        price: 150,
    },
];

export const DEFAULT_NAVBAR = [
    { title: 'Welrent Act', url: '/act' },
    { title: 'Locations', url: '/locations' },
    { title: 'Vehicles', url: '/offerlist' },
];

export const DEFAULT_FOOTER = {
    Places: [
        { title: 'Rent in Amsterdam', url: '/locations/amsterdam' },
        { title: 'Rent in Rotterdam', url: '/locations/rotterdam' },
        { title: 'All destinations', url: '/locations' },
    ],
    'Special Cars': [
        { title: 'Electric Cars', url: '/offerlist?type=car' },
        { title: 'Motorbikes', url: '/offerlist?type=motorcycle' },
        { title: 'Boats & Yachts', url: '/offerlist?type=boat' },
    ],
    Conditions: [
        { title: 'Insurance', url: '/terms' },
        { title: 'Privacy', url: '/privacy' },
        { title: 'Terms', url: '/terms' },
    ],
    About: [
        { title: 'Welrent Act', url: '/act' },
        { title: 'F1 Sponsorship', url: '/sponsorship/f1/wr/designed' },
        { title: 'Our Mission', url: '/act#mission' },
    ],
};

export const DEFAULT_CONTENT = {
    footer_brand_desc:
        'Welcome to Welrent, the smartest auto sharing and rental app. We guarantee the perfect car for every moment.',
    footer_copyright: '© 2026 Welrent App. Smart Agreements.',
};

export function getDemoVehicle(slug: string): DemoCar | null {
    return (
        DEMO_CARS.find(
            (car) =>
                car.slug === slug ||
                car.name === slug.replace(/-/g, ' ')
        ) || null
    );
}
