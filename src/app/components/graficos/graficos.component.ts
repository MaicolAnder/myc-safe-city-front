import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.model';
import { ChartJsUtils } from '../../utils/ChartJsUtils';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  template: `
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Análisis de Incidentes</h1>
      
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Distribución por Tipo de Incidente</h2>
        <div class="relative" style="height: 400px;">
          <canvas #chartCanvas></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class GraficosComponent implements OnInit, AfterViewInit, OnDestroy {
  private incidents: Incident[] = [];
  private utils: ChartJsUtils;
  private chart: Chart | null = null;

  constructor(private incidentService: IncidentService) {
    this.utils = new ChartJsUtils();
  }

  ngOnInit(): void {
    this.loadIncidents();
  }

  ngAfterViewInit(): void {
    // Wait for the next tick to ensure the canvas is ready
    setTimeout(() => {
      this.initializeChart();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private loadIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incidents) => {
        this.incidents = incidents;
        this.updateChartData();
      },
      error: (error) => {
        console.error('Error loading incidents:', error);
      }
    });
  }

  private initializeChart(): void {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    try {
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [
              this.utils.transparentize(this.utils.CHART_COLORS.red, 0.5),
              this.utils.transparentize(this.utils.CHART_COLORS.blue, 0.5),
              this.utils.transparentize(this.utils.CHART_COLORS.green, 0.5),
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Distribución de Incidentes'
            }
          }
        }
      });

      this.updateChartData();
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }

  private updateChartData(): void {
    if (!this.chart || !this.incidents.length) return;

    const incidentTypes = this.incidents.map(incident => incident.type);
    const typeCounts = this.countOccurrences(incidentTypes);

    this.chart.data.labels = Object.keys(typeCounts);
    this.chart.data.datasets[0].data = Object.values(typeCounts);
    this.chart.update();
  }

  private countOccurrences(types: string[]): { [key: string]: number } {
    return types.reduce((acc: { [key: string]: number }, type: string) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  }
}