import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private jsonURL = 'assets/js/ciudades_colombia.json';

  constructor(private http: HttpClient) { }

  getCiudades(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  getDepartamentos(): Observable<{ [key: string]: string[] }> {
    return this.http.get<{ [key: string]: string[] }>(this.jsonURL);
  }
}
