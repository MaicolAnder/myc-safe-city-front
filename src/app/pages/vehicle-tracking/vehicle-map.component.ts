import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { Vehicle } from '../../models/vehicle.model';
import { CardComponent } from '../../components/shared/card.component';

@Component({
  selector: 'app-vehicle-map',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <app-card>
      <div class="h-[600px]">
        <div id="vehicle-map" class="h-full w-full rounded-lg"></div>
      </div>
    </app-card>
  `,
  styles: [
    `
    :host ::ng-deep .leaflet-popup-content {
      @apply p-2;
    }
    :host ::ng-deep .leaflet-popup-content h3 {
      @apply font-bold text-lg mb-2;
    }
    :host ::ng-deep .leaflet-popup-content p {
      @apply text-sm text-gray-600 mb-1;
    }
  `,
  ],
})
export class VehicleMapComponent implements AfterViewInit, OnChanges {
  @Input() vehicles: Vehicle[] = [];
  private map!: L.Map;
  private markers: L.Marker[] = [];
  private defaultCenter = { lat: 0, lng: 0 };

  ngAfterViewInit() {
    this.initializeMap();
    this.updateVehicleMarkers();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicles'] && this.map) {
      this.updateVehicleMarkers();
    }
  }

  private initializeMap() {
    this.map = L.map('vehicle-map').setView(
      [this.defaultCenter.lat, this.defaultCenter.lng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    // Try to center map on user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.defaultCenter.lat = latitude;
        this.defaultCenter.lng = longitude;

        this.map.setView([latitude, longitude], 13);
      });
    }
  }

  private updateVehicleMarkers() {
    // Clear existing markers
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    // Add new markers for each vehicle
    this.vehicles.forEach((vehicle) => {
      if (vehicle.lastLocation) {
        const marker = L.marker([
          vehicle.lastLocation.lat,
          vehicle.lastLocation.lng,
        ])
          .bindPopup(this.createPopupContent(vehicle))
          .addTo(this.map);
        this.markers.push(marker);
      }
    });

    // Adjust map bounds if we have markers
    if (this.markers.length > 0) {
      const group = L.featureGroup(this.markers);
      this.map.fitBounds(group.getBounds().pad(0.1));
    }
  }

  private createPopupContent(vehicle: Vehicle): string {
    return `
      <div>
        <h3>${vehicle.plate}</h3>
        <p>${vehicle.make} ${vehicle.model} ${vehicle.year}</p>
        <p>Color: ${vehicle.color}</p>
        <p>Propietario: ${vehicle.owner}</p>
        ${
          vehicle.lastLocation
            ? `
          <p>Última actualización:<br>
          ${new Date(vehicle.lastLocation.timestamp).toLocaleString()}</p>
        `
            : ''
        }
      </div>
    `;
  }
}
