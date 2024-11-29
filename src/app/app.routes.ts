import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IncidentQueryComponent } from './components/incident-query/incident-query.component';
import { GraficosComponent } from './components/graficos/graficos.component';
//import { VehicleTrackingComponent } from './pages/vehicle-tracking/vehicle-tracking.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'consulta',
    component: IncidentQueryComponent
  },
  /*{
    path: 'vehiculos',
    component: VehicleTrackingComponent
  }*/
 {
  path: 'analisis',
  component: GraficosComponent
 }
];