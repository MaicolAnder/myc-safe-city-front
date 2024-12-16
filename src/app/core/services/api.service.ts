import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    return this.http.get<T>(url, { params });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    return this.http.post<T>(url, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    return this.http.put<T>(url, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    return this.http.delete<T>(url);
  }
}