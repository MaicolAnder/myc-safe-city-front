import { SearchFilters } from '../models/search.model';
import { Vehicle } from '../models/vehicle.model';

export function filterVehicles(vehicles: Vehicle[], filters: SearchFilters): Vehicle[] {
  return vehicles.filter(vehicle => {
    if (filters.plate && !vehicle.plate.toLowerCase().includes(filters.plate.toLowerCase())) {
      return false;
    }
    if (filters.make && !vehicle.make.toLowerCase().includes(filters.make.toLowerCase())) {
      return false;
    }
    if (filters.model && !vehicle.model.toLowerCase().includes(filters.model.toLowerCase())) {
      return false;
    }
    if (filters.owner && !vehicle.owner.toLowerCase().includes(filters.owner.toLowerCase())) {
      return false;
    }
    return true;
  });
}

export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase();
}

export function validatePlateFormat(plate: string): boolean {
  // Add your plate validation logic here
  // Example: ABC123 format
  const plateRegex = /^[A-Z]{3}\d{3}$/;
  return plateRegex.test(plate);
}