import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehicleMapComponent } from './vehicle-map.component';
import { VehicleListComponent } from './vehicle-list.component';

@Component({
  selector: 'app-vehicle-tracking',
  standalone: true,
  imports: [
    CommonModule,
    VehicleFormComponent,
    VehicleMapComponent,
    VehicleListComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Seguimiento de Vehículos
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Monitorea la ubicación de vehículos en tiempo real
        </p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
          <app-vehicle-form />
          <div class="mt-6">
            <app-vehicle-list [vehicles]="vehicles$ | async" />
          </div>
        </div>
        <div class="lg:col-span-2">
          <app-vehicle-map [vehicles]="vehicles$ | async" />
        </div>
      </div>
    </div>
  `
})
export class VehicleTrackingComponent implements OnInit {
  vehicles$ = this.vehicleService.getVehicles();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {}
}