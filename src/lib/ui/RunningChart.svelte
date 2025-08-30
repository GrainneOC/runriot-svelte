<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart } from 'frappe-charts';
  import type { PopulatedResult } from '$lib/types/runriot-types';

  export let results: PopulatedResult[] = [];
  export let chartType: 'line' | 'bar' | 'pie' = 'line';
  export let title: string = 'Running Progress';

  let chartContainer: HTMLDivElement;
  let chart: Chart;

  onMount(() => {
    if (results.length > 0) {
      createChart();
    }
  });

  $: if (results.length > 0 && chartContainer && chartType) {
    createChart();
  }

  function createChart() {
    console.log('Creating chart:', chartType);
    
    if (chart) {
      chart.destroy();
    }

    const chartData = prepareChartData();
    
         chart = new Chart(chartContainer, {
       title: title,
       data: chartData,
       type: chartType,
       height: 250,
       colors: ['#4CAF50', '#2196F3', '#FF9800'],
       axisOptions: {
         xAxisMode: 'tick',
         yAxisMode: 'span',
         xIsSeries: true
       },
       lineOptions: {
         hideDots: false,
         heatline: false,
         spline: false
       }
     });
  }

  function prepareChartData() {
    // Simple data like in college notes
    if (results.length === 0) {
      return {
        labels: ["No data"],
        datasets: [
          {
            name: 'Distance (km)',
            values: [0]
          }
        ]
      };
    }

    // Sort results by date
    const sortedResults = [...results].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      labels: sortedResults.map(r => formatDate(r.date)),
      datasets: [
        {
          name: 'Distance (km)',
          values: sortedResults.map(r => r.distance)
        }
      ]
    };
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short' 
    });
  }
</script>

<div class="chart-container">
  <div class="chart-wrapper">
    <div bind:this={chartContainer} class="chart"></div>
  </div>
</div>

<style>
  .chart-container {
    margin: 15px 0;
  }

  .chart-wrapper {
    background: white;
    padding: 10px;
    border: 1px solid #ddd;
  }

  .chart {
    width: 100%;
    height: 200px;
  }
</style>
