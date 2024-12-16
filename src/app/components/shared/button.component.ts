import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getButtonClasses()"
      (click)="onClick.emit($event)"
      [disabled]="disabled"
      [type]="type"
    >
      <div class="flex items-center justify-center space-x-2">
        <span *ngIf="loading" class="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent"></span>
        <ng-content></ng-content>
      </div>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<MouseEvent>();

  getButtonClasses(): string {
    const baseClasses = 'btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    const widthClass = this.fullWidth ? 'w-full' : '';
    
    const variantClasses = {
      primary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200',
      danger: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white',
      success: 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${widthClass}`;
  }
}