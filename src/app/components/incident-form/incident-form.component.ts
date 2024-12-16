import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button.component';
import { IncidentService } from '../../services/incident.service';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css'],
})
export class IncidentFormComponent implements OnInit {
  incidentTypes = ['ROBBERY', 'VANDALISM', 'EMERGENCY'];
  selectedType: string | null = null;
  description: string = '';
  location: { lat: number; lng: number } | null = null;
  departments: string[] = [];
  cities: string[] = [];
  selectedDepartment: string = '';
  city: string = '';
  address: string = '';
  nombreUsuario: string = '';
  telefono: string = '';
  isSubmitting = false;

  constructor(
    private incidentService: IncidentService,
    private citiesService: CitiesService
  ) {}

  ngOnInit() {
    this.loadDepartments();
    this.getCurrentLocation();
  }

  loadDepartments() {
    this.citiesService.getDepartamentos().subscribe((departments) => {
      this.departments = Object.keys(departments);
    });
  }

  onDepartamentoChange(department: string) {
    if (department) {
      this.citiesService.getDepartamentos().subscribe((data) => {
        this.cities = data[department] || [];
      });
    } else {
      this.cities = [];
      this.city = '';
    }
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  get canSubmit(): boolean {
    return !!this.selectedType && !!this.location && !this.isSubmitting;
  }

  submitReport() {
    if (this.canSubmit && this.location) {
      this.isSubmitting = true;

      const incident = {
        type: this.selectedType as 'ROBBERY' | 'VANDALISM' | 'EMERGENCY',
        location: this.location,
        description: this.description,
        timestamp: new Date(),
        department: this.selectedDepartment,
        city: this.city,
        address: this.address,
        nombreUsuario: this.nombreUsuario,
        telefono: this.telefono,
      };

      this.incidentService.reportIncident(incident).subscribe({
        next: () => {
          this.resetForm();
          // Here you could add a success notification
        },
        error: (error) => {
          console.error('Error submitting incident:', error);
          // Here you could add an error notification
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    }
  }

  private resetForm() {
    this.selectedType = null;
    this.description = '';
    this.location = null;
    this.selectedDepartment = '';
    this.city = '';
    this.address = '';
    this.nombreUsuario = '';
    this.telefono = '';
  }
}
