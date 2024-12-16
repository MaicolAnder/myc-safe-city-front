import colorLib from '@kurkle/color';
import { valueOrDefault } from 'chart.js/helpers';

export class ChartJsUtils {
  public readonly CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  public transparentize(value: string, opacity: number): string {
    return colorLib(value).alpha(1 - opacity).rgbString();
  }
}