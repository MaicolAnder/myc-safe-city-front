export interface Vehicle {
  id: string;
  plate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  owner: string;
  deviceId?: string;
  lastLocation?: {
    lat: number;
    lng: number;
    timestamp: Date;
  };
}