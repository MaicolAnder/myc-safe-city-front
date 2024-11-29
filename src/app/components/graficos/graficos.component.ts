import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { IncidentService } from '../../services/incident.service';
import { Incident } from '../../models/incident.model';
import { response } from 'express';
import { ChartJsUtils } from '../../utils/ChartJsUtils';


@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent implements OnInit {

  private indicendts: Incident[] = [];
  private utils: ChartJsUtils;

  public chartDoughnut: any = null;

  constructor(
    private incidentService: IncidentService
  ){
    this.utils = new ChartJsUtils();
    this.getIncidents()
  }

  ngOnInit(): void {
  }

  setGraphicDoungnot(){
    console.log('Hola mundo')
    let tiposIncidentes = this.indicendts.map(incident => incident.type);

    const contador =this.countOccurrences(tiposIncidentes);
    console.log(Object.keys(contador))
    const data = {
      labels: Object.keys(contador),
      datasets: [
        {
          label: 'Dataset 1',
          data: Object.values(contador),
          backgroundColor: [
            this.utils.transparentize(this.utils.CHART_COLORS.red, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.orange, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.yellow, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.green, 0.5),
            this.utils.transparentize(this.utils.CHART_COLORS.blue, 0.5),
          ]
        }
      ]
    };
    // Creamos la gráfica
    this.chartDoughnut = new Chart(
      'chart',
      {
        type: 'doughnut',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  getIncidents(){
    this.incidentService.getDBIncidents().subscribe(
      response => {
        this.indicendts = response.data;
        this.setGraphicDoungnot()
      }
    )
  }

  countOccurrences(typeIncident: string[]): { [key: string]: number } {
    return typeIncident.reduce((acc: any, type: string) => {
      acc[type] = (acc[type] || 0) + 1; // Incrementa el contador si existe, si no, lo inicializa en 1
      return acc;
    }, {}); // El objeto vacío es el acumulador inicial
  }
  
}
