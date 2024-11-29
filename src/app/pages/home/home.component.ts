import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentFormComponent } from '../../components/incident-form/incident-form.component';
import { IncidentMapComponent } from '../../components/incident-map/incident-map.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IncidentFormComponent, IncidentMapComponent],
  template: `
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Sistema de Reporte de Incidentes
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Ayuda a mantener tu comunidad segura reportando incidentes en tiempo real
        </p>
      </header>

      <div class="grid grid-cols-2 gap-4">
        <app-incident-form />
        <app-incident-map />
      </div>
    </div>
  `,
  styles: [
  ],
})
export class HomeComponent {}