import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehicleMapComponent } from './vehicle-map.component';
import { VehicleListComponent } from './vehicle-list.component';
import { VehicleSearchComponent } from '../../components/vehicle-search/vehicle-search.component';
import { VehicleDetailsComponent } from '../../components/vehicle-details/vehicle-details.component';
import { Vehicle } from '../../models/vehicle.model';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { normalizeSearchTerm } from '../../utils/search.utils';

@Component({
  selector: 'app-vehicle-tracking',
  standalone: true,
  imports: [
    CommonModule,
    VehicleFormComponent,
    VehicleMapComponent,
    VehicleListComponent,
    VehicleSearchComponent,
    VehicleDetailsComponent
  ],
  template: `
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Seguimiento de Vehículos
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Monitorea la ubicación de vehículos en tiempo real
        </p>
      </header>

      <div class="mb-6">
        <app-vehicle-search (onSearch)="searchVehicle($event)" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
          <app-vehicle-form *ngIf="!selectedVehicle" />
          <app-vehicle-details 
            *ngIf="selectedVehicle"
            [vehicle]="selectedVehicle"
            class="mb-6"
          />
          <div class="mt-6" *ngIf="!selectedVehicle">
            <app-vehicle-list [vehicles]="(vehicles$ | async) || []" />
          </div>
        </div>
        <div class="lg:col-span-2">
          <app-vehicle-map 
            [vehicles]="selectedVehicle ? [selectedVehicle] : ((vehicles$ | async) || [])" 
          />
        </div>
      </div>
    </div>
  `
})
export class VehicleTrackingComponent implements OnInit, OnDestroy {
  private searchPlate = new BehaviorSubject<string>('');
  private destroy$ = new Subject<void>();
  
  vehicles$ = this.vehicleService.getVehicles();
  selectedVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchVehicle(plate: string) {
    this.searchPlate.next(normalizeSearchTerm(plate));
  }

  private setupSearchSubscription() {
    combineLatest([this.vehicles$, this.searchPlate])
      .pipe(
        takeUntil(this.destroy$),
        map(([vehicles, plate]) => {
          if (!plate) {
            this.selectedVehicle = null;
            return;
          }
          this.selectedVehicle = vehicles.find(v => 
            v.plate.toLowerCase() === plate.toLowerCase()
          ) || null;
        })
      )
      .subscribe();
  }
}