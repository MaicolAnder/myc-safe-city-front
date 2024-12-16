import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getCardClasses()">
      <div [class]="getPaddingClasses()">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() noPadding = false;
  @Input() hover = true;

  getCardClasses(): string {
    return `card ${this.hover ? 'hover:shadow-lg' : ''}`;
  }

  getPaddingClasses(): string {
    return this.noPadding ? '' : 'p-6';
  }
}