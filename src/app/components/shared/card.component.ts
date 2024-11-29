import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}