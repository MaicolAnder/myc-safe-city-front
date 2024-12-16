import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Incident } from '../models/incident.model';
import { ApiResponse } from '../models/api-response.model';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private incidents = new BehaviorSubject<Incident[]>([]);
  private readonly INCIDENTS_ENDPOINT = '/sc-safe-incidents';
  private readonly GET_INCIDENTS_ENDPOINT = '/sc-get-incidents';

  constructor(private apiService: ApiService) {
    this.loadIncidents();
  }

  getIncidents(): Observable<Incident[]> {
    return this.incidents.asObservable();
  }

  loadIncidents(): void {
    this.apiService.get<ApiResponse<Incident>>(this.GET_INCIDENTS_ENDPOINT)
      .pipe(
        tap(response => {
          if (response.data) {
            this.incidents.next(response.data);
          }
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Error loading incidents:', error);
          // Here you could add error handling logic
        }
      });
  }

  reportIncident(incident: Incident): Observable<Incident> {
    return this.apiService.post<Incident>(this.INCIDENTS_ENDPOINT, incident).pipe(
      tap(newIncident => {
        const currentIncidents = this.incidents.getValue();
        this.incidents.next([...currentIncidents, newIncident]);
      })
    );
  }

  getNearbyIncidents(lat: number, lng: number, radiusKm: number = 5): Incident[] {
    return this.incidents.getValue().filter(incident => {
      const distance = this.calculateDistance(
        lat,
        lng,
        incident.location.lat,
        incident.location.lng
      );
      return distance <= radiusKm;
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}