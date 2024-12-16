import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/shared/card.component';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <h2 class="text-lg font-semibold mb-4">Vehículos Registrados</h2>
      <div class="divide-y divide-gray-200">
        <div *ngFor="let vehicle of vehicles" class="py-4 first:pt-0 last:pb-0">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                {{ vehicle.plate }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ vehicle.make }} {{ vehicle.model }} {{ vehicle.year }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                Propietario: {{ vehicle.owner }}
              </p>
            </div>
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              [class]="getStatusClass(vehicle)"
            >
              {{ getStatusText(vehicle) }}
            </span>
          </div>
          <div *ngIf="vehicle.lastLocation" class="mt-2">
            <p class="text-xs text-gray-500">
              Última ubicación: {{ formatLocation(vehicle.lastLocation) }}
              <br>
              {{ vehicle.lastLocation.timestamp | date:'medium' }}
            </p>
          </div>
        </div>
      </div>
    </app-card>
  `
})
export class VehicleListComponent {
  @Input() vehicles: Vehicle[] = [];

  getStatusClass(vehicle: Vehicle): string {
    return vehicle.lastLocation 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  }

  getStatusText(vehicle: Vehicle): string {
    return vehicle.lastLocation 
      ? 'Activo'
      : 'Sin datos';
  }

  formatLocation(location: { lat: number; lng: number }): string {
    return `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
  }
}