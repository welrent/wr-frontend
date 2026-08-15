export type WelrentCar = {
  id: number;
  name: string;
  slug: string;
  subtitle?: string;
  photo_url?: string;
  is_dark_mode?: boolean;
  price?: number;
};

export type WelrentLoginResult = {
  token: string;
  user: { id: number; email: string };
};

export type WelrentClientOptions = {
  baseUrl?: string;
  fetchImpl?: typeof fetch;
};

export declare class WelrentClient {
  constructor(options?: WelrentClientOptions);
  request(path: string, init?: RequestInit): Promise<any>;
  health(): Promise<{ status: string; message: string }>;
  getCars(): Promise<WelrentCar[]>;
  getVehicle(slug: string): Promise<WelrentCar>;
  getContent(): Promise<Record<string, string>>;
  getNavFooter(): Promise<{ navbar: Array<{ title: string; url: string }>; footer: Record<string, Array<{ title: string; url: string }>> }>;
  login(credentials: { email: string; password: string }): Promise<WelrentLoginResult>;
  getRentals(uid: string): Promise<{ rentals: unknown[] }>;
  createRental(payload: Record<string, unknown>): Promise<{ booking_ref: string; id: number | string }>;
}

export default WelrentClient;
