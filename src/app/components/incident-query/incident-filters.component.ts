import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button.component';

@Component({
  selector: 'app-incident-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './incident-filters.component.html',
  styleUrls: ['./incident-filters.component.css']
})
export class IncidentFiltersComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  @Output() nearbyRequested = new EventEmitter<void>();

  filters = {
    type: '',
    dateRange: {
      start: '',
      end: ''
    }
  };

  updateFilters() {
    this.filtersChanged.emit(this.filters);
  }

  findNearby() {
    this.nearbyRequested.emit();
  }
}