import { DEMO_CARS, getDemoVehicle, type DemoCar } from './demo-data';

const apiBase = () => process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function fetchCars(): Promise<DemoCar[]> {
    const base = apiBase();
    if (!base) return DEMO_CARS;

    try {
        const res = await fetch(`${base}/api/cars`, { cache: 'no-store' });
        if (!res.ok) return DEMO_CARS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data : DEMO_CARS;
    } catch {
        return DEMO_CARS;
    }
}

export async function fetchVehicle(slug: string): Promise<DemoCar | null> {
    const base = apiBase();
    if (!base) return getDemoVehicle(slug);

    try {
        const res = await fetch(`${base}/api/vehicle/${slug}`, { cache: 'no-store' });
        if (res.ok) return await res.json();
    } catch {
        // fall through to demo data
    }
    return getDemoVehicle(slug);
}
