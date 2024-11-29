import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncidentService } from '../../services/incident.service';
import { IncidentMapComponent } from '../incident-map/incident-map.component';
import { IncidentListComponent } from './incident-list.component';
import { IncidentFiltersComponent } from './incident-filters.component';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-query',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IncidentMapComponent,
    IncidentListComponent,
    IncidentFiltersComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <app-incident-filters
          (filtersChanged)="applyFilters($event)"
          (nearbyRequested)="findNearbyIncidents()"
        />
        
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-1 gap-6">
          <app-incident-map [incidents]="filteredIncidents" />
        </div>
        <div class="scroll max-h-[50vh] overflow-y-auto pt-12">
          <app-incident-list [incidents]="filteredIncidents" />
        </div>
      </div>
    </div>
  `
})
export class IncidentQueryComponent implements OnInit {
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    console.log('Buscador de incidentes',  this.incidents );
    this.incidentService.getIncidents().subscribe(incidents => {
      this.incidents = incidents;
      this.filteredIncidents = incidents;
    });

    if (this.incidents.length === 0) {
      console.log('Cargando incidentes desde la base de datos...');
      this.incidentService.getDBIncidents().subscribe(response => {
        this.incidents = response.data;
        this.filteredIncidents = this.incidents;
      });
    }
  }

  applyFilters(filters: any) {
    if(filters.type && filters.dateRange.start && filters.dateRange.end){
      if(new Date(filters.dateRange.start) > new Date(filters.dateRange.end)){
        alert('Valide las fechas');
        filters.dateRange.start = null;
        filters.dateRange.end   = null;
      }
      this.filteredIncidents = this.incidents.filter(incident => {
        const typeMatch = !filters.type || incident.type === filters.type;
        const dateMatch = !filters.dateRange || (
          new Date(incident.timestamp) >= new Date(filters.dateRange.start) &&
          new Date(incident.timestamp) <= new Date(filters.dateRange.end)
        );
        return typeMatch && dateMatch;
      });
    }
  }

  findNearbyIncidents() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const nearby = this.incidentService.getNearbyIncidents(
          position.coords.latitude,
          position.coords.longitude
        );
        console.log('Nearby:', nearby);
        this.filteredIncidents = nearby;
      });
    }
  }
}