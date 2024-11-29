import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../components/shared/button.component';
import { CardComponent } from '../../components/shared/card.component';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent],
  template: `
    <app-card>
      <h2 class="text-lg font-semibold mb-4">Registrar Vehículo</h2>
      <form (ngSubmit)="onSubmit()" #form="ngForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Placa</label>
          <input
            type="text"
            [(ngModel)]="vehicle.plate"
            name="plate"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              [(ngModel)]="vehicle.make"
              name="make"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              [(ngModel)]="vehicle.model"
              name="model"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Año</label>
            <input
              type="number"
              [(ngModel)]="vehicle.year"
              name="year"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              [(ngModel)]="vehicle.color"
              name="color"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Propietario</label>
          <input
            type="text"
            [(ngModel)]="vehicle.owner"
            name="owner"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <br>
        <app-button
          type="submit"
          [disabled]="!form.valid"
          [fullWidth]="true"
        >
          Registrar Vehículo
        </app-button>
      </form>
    </app-card>
  `
})
export class VehicleFormComponent {
  vehicle = {
    plate: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    owner: ''
  };

  constructor(private vehicleService: VehicleService) {}

  onSubmit() {
    this.vehicleService.registerVehicle(this.vehicle);
    this.resetForm();
  }

  private resetForm() {
    this.vehicle = {
      plate: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      owner: ''
    };
  }
}