declare module 'frappe-charts' {
  export interface ChartData {
    labels: string[];
    datasets: Array<{
      name: string;
      values: (number | string)[];
    }>;
  }

  export interface ChartOptions {
    title?: string;
    data: ChartData;
    type: 'line' | 'bar' | 'pie' | 'percentage' | 'heatmap';
    height?: number;
    colors?: string[];
    axisOptions?: {
      xAxisMode?: 'tick' | 'span';
      yAxisMode?: 'tick' | 'span';
      xIsSeries?: boolean;
    };
    lineOptions?: {
      hideDots?: boolean;
      heatline?: boolean;
      spline?: boolean;
    };
  }

  export class Chart {
    constructor(element: HTMLElement, options: ChartOptions);
    destroy(): void;
    update(data: ChartData): void;
  }
}
