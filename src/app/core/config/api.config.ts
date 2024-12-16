import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  endpoints: {
    incidents: '/incidents',
    vehicles: '/vehicles',
    cities: '/cities'
  },
  headers: {
    'Content-Type': 'application/json'
  }
};