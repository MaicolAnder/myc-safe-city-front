import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Incident } from '../models/incident.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseAPI } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private incidents = new BehaviorSubject<Incident[]>([]);

  constructor(private http: HttpClient) {
    
  }

  getIncidents(): Observable<Incident[]> {
    return this.incidents.asObservable();
  }

  reportIncident(incident: Incident): void {
    const currentIncidents = this.incidents.getValue();
    this.incidents.next([...currentIncidents, { ...incident, id: Date.now().toString() }]);
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

  saveIncident(incident: Incident): void {
    this.http.post(`${environment.apiUrl}/sc-safe-incidents`, incident).subscribe(res => {
      console.log(res);
    });
  }

  getDBIncidents(): Observable<ResponseAPI> {
    return this.http.get<ResponseAPI>(`${environment.apiUrl}/sc-get-incidents`);
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