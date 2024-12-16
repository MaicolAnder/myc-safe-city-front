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
    // Add some mock vehicles for testing
    this.addMockVehicles();
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles.asObservable();
  }

  findByPlate(plate: string): Observable<Vehicle | undefined> {
    return this.vehicles.pipe(
      map(vehicles => vehicles.find(v => 
        v.plate.toLowerCase() === plate.toLowerCase()
      ))
    );
  }

  registerVehicle(vehicle: Omit<Vehicle, 'id' | 'lastLocation'>): void {
    const newVehicle: Vehicle = {
      ...vehicle,
      id: Date.now().toString(),
      lastLocation: {
        lat: (Math.random() * 0.1) - 0.05,  // Random starting position
        lng: (Math.random() * 0.1) - 0.05,
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
        lat: (vehicle.lastLocation?.lat || 0) + (Math.random() - 0.5) * 0.001,
        lng: (vehicle.lastLocation?.lng || 0) + (Math.random() - 0.5) * 0.001,
        timestamp: new Date()
      }
    }));
    this.vehicles.next(updatedVehicles);
  }

  private addMockVehicles() {
    const mockVehicles = [
      {
        plate: 'ABC123',
        make: 'Toyota',
        model: 'Corolla',
        year: 2020,
        color: 'Rojo',
        owner: 'Juan Pérez'
      },
      {
        plate: 'XYZ789',
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        color: 'Azul',
        owner: 'María García'
      }
    ];

    mockVehicles.forEach(vehicle => this.registerVehicle(vehicle));
  }
}