import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavMenuComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-nav-menu />
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App {
  name = 'Incident Reporter';
}