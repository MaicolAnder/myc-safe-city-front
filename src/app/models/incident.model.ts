export interface Incident {
  id?: string;
  type: 'ROBBERY' | 'VANDALISM' | 'EMERGENCY';
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  description?: string;
  mediaUrl?: string;
  timestamp: Date;
  city?: string;
  department?: string;
  address?: string;
  nombreUsuario?: string;
  telefono?: string;
}
