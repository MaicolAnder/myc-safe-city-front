import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent {
  @Input() incidents: Incident[] = [];

  getTypeClass(type: string): string {
    const classes = {
      'ROBBERY': 'bg-red-100 text-red-800',
      'VANDALISM': 'bg-yellow-100 text-yellow-800',
      'EMERGENCY': 'bg-purple-100 text-purple-800'
    };
    return classes[type as keyof typeof classes] || 'bg-gray-100 text-gray-800';
  }
}