import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.css']
})
export class IncidentMapComponent implements AfterViewInit, OnChanges {
  @Input() incidents?: Incident[];
  private map!: L.Map;
  private markers: L.Marker[] = [];

  constructor(private incidentService: IncidentService) {}

  ngAfterViewInit() {
    this.initializeMap();
    //if (!this.incidents) {
      this.loadIncidents();
    //}
    //this.incidentService.getDBIncidents().subscribe(response => {
    //  this.incidents = response.data;
    //});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['incidents'] && this.map) {
      this.updateMarkers();
    }
  }

  private initializeMap() {
    this.map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([0,0]).addTo(this.map)
        .bindPopup('Tu ubicación')
        .openPopup();


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.map.setView([latitude, longitude], 13);
      });
    }
  }

  private loadIncidents() {
    /*this.incidentService.getIncidents().subscribe(incidents => {
      this.incidents = incidents;
      this.updateMarkers();
    }); */
    this.incidentService.getDBIncidents().subscribe(response => {
      this.incidents = response.data;
      this.updateMarkers();
    });
  }

  private updateMarkers() {
    // Clear existing markers
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    console.log('Updating markers...', this.incidents);
    // Add new markers
    if (this.incidents) {
      this.incidents.forEach(incident => {
        console.log(incident.location.lat, incident.location.lng);
        const marker = L.marker([incident.location.lat, incident.location.lng])
          .bindPopup(`
            <div>
              <h3>${incident.type}</h3>
              <p>${incident.description || 'No description'}</p>
              <p>Reported: ${new Date(incident.timestamp).toLocaleString()}</p>
            </div>
          `)
          .addTo(this.map);
        this.markers.push(marker);
      });
    }
  }
}