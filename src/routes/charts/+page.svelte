<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { runriotService } from "$lib/services/runriot-service";
  import type { PopulatedResult } from "$lib/types/runriot-types";
  import Card from "$lib/ui/Card.svelte";
  import RunningChart from "$lib/ui/RunningChart.svelte";

  subTitle.text = "Running Charts";

  let results: PopulatedResult[] = [];
  let message = "Loading results...";

  // Simple chart data like in college notes
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        values: [5, 8, 3, 10, 6, 12, 7]
      }
    ]
  };

  onMount(async () => {
    try {
      results = await runriotService.getResults();
      if (results.length === 0) {
        message = "No running results found. Add some results to see charts!";
      }
    } catch (error) {
      console.error("Failed to load results:", error);
      message = "Failed to load results.";
    }
  });
</script>

<div class="columns">
  <div class="column">
    <Card title="Weekly Running Distance">
      <RunningChart {results} chartType="line" title="This Week's Runs" />
    </Card>
  </div>
  <div class="column">
    <Card title="Running Progress">
      <RunningChart {results} chartType="bar" title="All Time Progress" />
    </Card>
  </div>
</div>

{#if results.length === 0}
  <Card title="No Data">
    <p>{message}</p>
  </Card>
{/if}
