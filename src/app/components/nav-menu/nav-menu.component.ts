import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo and Brand -->
          <div class="flex">
            <div class="flex-shrink-0 flex items-center space-x-3">
              <img src="assets/logo.png" alt="Safe City" class="h-10 w-auto" />
              <a routerLink="/" class="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                Safe City
              </a>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex md:items-center md:space-x-6">
            <a *ngFor="let item of menuItems" 
               [routerLink]="item.route"
               routerLinkActive="text-blue-600 border-blue-600"
               class="border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors duration-200">
              {{ item.label }}
            </a>
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center md:hidden">
            <button
              type="button"
              (click)="toggleMenu()"
              class="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              [attr.aria-expanded]="isMenuOpen"
            >
              <span class="sr-only">Abrir menú principal</span>
              <svg
                [class.hidden]="isMenuOpen"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              <svg
                [class.hidden]="!isMenuOpen"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        class="md:hidden transition-all duration-200 ease-in-out"
        [class.hidden]="!isMenuOpen"
        [class.opacity-100]="isMenuOpen"
        [class.opacity-0]="!isMenuOpen"
      >
        <div class="pt-2 pb-3 space-y-1 px-4">
          <a *ngFor="let item of menuItems"
             [routerLink]="item.route"
             routerLinkActive="bg-blue-50 border-blue-500 text-blue-700"
             class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-colors duration-200"
             (click)="closeMenu()">
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      @apply sticky top-0 z-50;
    }
  `]
})
export class NavMenuComponent {
  isMenuOpen = false;
  menuItems = [
    { label: 'Reportar', route: '/', exact: true },
    { label: 'Consulta de Reportes', route: '/consulta', exact: false },
    { label: 'Seguimiento de Vehículos', route: '/vehiculos', exact: false },
    { label: 'Análisis de Incidentes', route: '/analisis', exact: false }
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}