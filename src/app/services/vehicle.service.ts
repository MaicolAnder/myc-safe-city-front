import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicles = new BehaviorSubject<Vehicle[]>([]);
  private mockLocationUpdate = interval(5000).pipe(
    map(() => this.updateMockLocations())
  );

  constructor() {
    this.mockLocationUpdate.subscribe();
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles.asObservable();
  }

  registerVehicle(vehicle: Omit<Vehicle, 'id'>): void {
    const newVehicle = {
      ...vehicle,
      id: Date.now().toString(),
      lastLocation: {
        lat: 0,
        lng: 0,
        timestamp: new Date()
      }
    };
    
    const currentVehicles = this.vehicles.getValue();
    this.vehicles.next([...currentVehicles, newVehicle]);
  }

  private updateMockLocations(): void {
    const currentVehicles = this.vehicles.getValue();
    const updatedVehicles = currentVehicles.map(vehicle => ({
      ...vehicle,
      lastLocation: {
        lat: vehicle.lastLocation?.lat || 0 + (Math.random() - 0.5) * 0.001,
        lng: vehicle.lastLocation?.lng || 0 + (Math.random() - 0.5) * 0.001,
        timestamp: new Date()
      }
    }));
    this.vehicles.next(updatedVehicles);
  }
}