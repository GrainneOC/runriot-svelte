<script lang="ts">
  import { onMount } from 'svelte';
  import { runriotService } from "$lib/services/runriot-service";
  import type { Trail, Result } from "$lib/types/runriot-types";
  import ResultItem from "$lib/ui/ResultItem.svelte";
  import Chart from "svelte-frappe-charts";

  // This component receives a single trail object as a prop
  let { trail } = $props<{ trail: Trail }>();
  
  // State to hold the list of results for this trail
  let results = $state<Result[]>([]);
  let message = $state("Fetching results...");

  // Data for the chart
  let chartData = $state({
    labels: [] as string[],
    datasets: [{
      name: "Duration",
      values: [] as number[],
    }]
  });

  // Fetch results from the backend when the component loads
  onMount(async () => {
    try {
      results = await runriotService.getResultsByTrailId(trail._id!);
      if (results.length === 0) {
        message = "No results found for this trail.";
      } else {
        // Prepare data for the chart
        chartData.labels = results.map(result => new Date(result.date).toLocaleDateString());
        chartData.datasets[0].values = results.map(result => result.duration);
      }
    } catch (error) {
      console.error("Failed to fetch results:", error);
      message = "Failed to load results. Please try again later.";
    }
  });
</script>

<div class="box">
  <h1 class="title is-3">{trail.title}</h1>
  <p class="subtitle is-5">{trail.location}</p>
  
  <hr>

  <!-- Section for the chart -->
  <h2 class="subtitle is-4">Performance Chart</h2>
  {#if results.length > 0}
    <div class="card">
        <Chart
          type="bar"
          data={chartData}
          colors={['#48c78e']}
          axis-y-legend="Duration (minutes)"
          axis-x-legend="Date"
        />
    </div>
  {:else}
    <p>No results available to generate a chart.</p>
  {/if}

  <hr>

  <!-- Section for the results list -->
  <h2 class="subtitle is-4">Results</h2>
  {#if results.length > 0}
    <div class="list is-hoverable">
      {#each results as result}
        <ResultItem {result} />
      {/each}
    </div>
  {:else}
    <p>{message}</p>
  {/if}
</div>
