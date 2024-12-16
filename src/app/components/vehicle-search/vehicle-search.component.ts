import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/button.component';

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex gap-2">
        <input
          type="text"
          [(ngModel)]="searchPlate"
          (keyup.enter)="search()"
          placeholder="Buscar por placa..."
          class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <app-button (onClick)="search()">
          Buscar
        </app-button>
      </div>
    </div>
  `
})
export class VehicleSearchComponent {
  @Output() onSearch = new EventEmitter<string>();
  searchPlate: string = '';

  search(): void {
    const trimmedPlate = this.searchPlate.trim();
    if (trimmedPlate) {
      this.onSearch.emit(trimmedPlate.toUpperCase());
    }
  }
}