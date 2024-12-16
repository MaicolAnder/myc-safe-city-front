import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle.model';
import { formatTimeAgo } from '../../utils/date.utils';
import { formatCoordinates } from '../../utils/map.utils';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="vehicle" class="bg-white rounded-lg shadow-md p-4">
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">
              {{ vehicle.plate }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ vehicle.make }} {{ vehicle.model }} {{ vehicle.year }}
            </p>
          </div>
          <span 
            [class]="getStatusClass()"
            class="px-2 py-1 rounded-full text-xs font-medium"
          >
            {{ getStatusText() }}
          </span>
        </div>

        <div class="border-t border-gray-200 pt-4">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">Color</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ vehicle.color }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Propietario</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ vehicle.owner }}</dd>
            </div>
          </dl>
        </div>

        <div *ngIf="vehicle.lastLocation" class="border-t border-gray-200 pt-4">
          <h4 class="text-sm font-medium text-gray-500">Última ubicación</h4>
          <p class="mt-1 text-sm text-gray-900">
            {{ formatCoordinates(vehicle.lastLocation.lat, vehicle.lastLocation.lng) }}
          </p>
          <p class="mt-1 text-xs text-gray-500">
            Actualizado {{ formatTimeAgo(vehicle.lastLocation.timestamp) }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class VehicleDetailsComponent {
  @Input() vehicle: Vehicle | null = null;

  formatTimeAgo = formatTimeAgo;
  formatCoordinates = formatCoordinates;

  getStatusClass(): string {
    return this.vehicle?.lastLocation 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  }

  getStatusText(): string {
    return this.vehicle?.lastLocation 
      ? 'Activo'
      : 'Sin datos';
  }
}