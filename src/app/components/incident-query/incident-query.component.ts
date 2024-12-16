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
    IncidentFiltersComponent,
  ],
  template: `
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <app-incident-filters
          (filtersChanged)="applyFilters($event)"
          (nearbyRequested)="findNearbyIncidents()"
        />
        
        <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <app-incident-map [incidents]="filteredIncidents" />
          <app-incident-list [incidents]="filteredIncidents" />
        </div>
      </div>
    </div>
  `,
})
export class IncidentQueryComponent implements OnInit {
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.loadIncidents();
  }

  private loadIncidents() {
    this.isLoading = true;
    this.incidentService.getIncidents().subscribe({
      next: (incidents) => {
        this.incidents = incidents;
        this.filteredIncidents = incidents;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading incidents';
        this.isLoading = false;
        console.error('Error loading incidents:', error);
      },
    });
  }

  applyFilters(filters: any) {
    this.filteredIncidents = this.incidents.filter((incident) => {
      const typeMatch = !filters.type || incident.type === filters.type;
      const dateMatch =
        !filters.dateRange ||
        (new Date(incident.timestamp) >= new Date(filters.dateRange.start) &&
          new Date(incident.timestamp) <= new Date(filters.dateRange.end));
      return typeMatch && dateMatch;
    });
  }

  findNearbyIncidents() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const nearby = this.incidentService.getNearbyIncidents(
          position.coords.latitude,
          position.coords.longitude
        );
        this.filteredIncidents = nearby;
      });
    }
  }
}
