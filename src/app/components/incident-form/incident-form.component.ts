import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button.component';
import { IncidentService } from '../../services/incident.service';
import { CiudadesService } from '../../services/ciudades.service';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.css']
})
export class IncidentFormComponent {
  incidentTypes = ['ROBBERY', 'VANDALISM', 'EMERGENCY'];
  selectedType: string | null = null;
  description: string = '';
  location: { lat: number; lng: number } | null = null;
  
  departamentos: string[] = [];
  ciudades: string[] = [];
  data: { [key: string]: string[] } = {};

  neighborhood : string = ''
  ciudad : string = ''
  address: string = ''
  selectedDepartamento: string = '';
  selectedCiudad: string = '';
  nombreUsuario: string = '';
  telefono: string = '';

  constructor(
    private incidentService: IncidentService,
    private ciudadesService: CiudadesService
  ) {
    this.ciudadesService.getDepartamentos().subscribe(data => {
      this.data = data;
      this.departamentos = Object.keys(data);
    });
    setTimeout(() => {
      this.getCurrentLocation();
    }, 3000);
  }

  onDepartamentoChange(departamento: any): void {
    this.selectedDepartamento = departamento.value;
    this.ciudades = this.data[this.selectedDepartamento];
    console.log(this.data[departamento], this.ciudades);
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }

  get canSubmit(): boolean {
    return !!this.selectedType && !!this.location;
  }

  submitReport() {
    if (this.canSubmit && this.location) {
      let incident: Incident = {
        nombreUsuario: this.nombreUsuario,
        telefono: this.telefono,
        type: this.selectedType as 'ROBBERY' | 'VANDALISM' | 'EMERGENCY',
        location: this.location,
        description: this.description,
        timestamp: new Date(),
        city: this.selectedCiudad,
        neighborhood: this.neighborhood,
        department: this.selectedDepartamento,
        address: this.address
      }
      this.incidentService.reportIncident(incident);
      this.incidentService.saveIncident(incident);
      
      this.selectedType = null;
      this.description = '';
      this.location = null;

      console.log('Submitted incident', incident);
    }
  }
}