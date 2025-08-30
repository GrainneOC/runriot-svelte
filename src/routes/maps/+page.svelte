<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { runriotService } from "$lib/services/runriot-service";
  import type { PopulatedResult } from "$lib/types/runriot-types";
  import Card from "$lib/ui/Card.svelte";
  import LeafletMap from "$lib/ui/LeafletMap.svelte";

  subTitle.text = "Running Locations";

  let map: LeafletMap;
  let results: PopulatedResult[] = [];

  onMount(async () => {
    try {
      results = await runriotService.getResults();
      
      // Add markers for each running result
      results.forEach((result) => {
        if (result.lat && result.lng) {
          const popupText = `${result.distance}km run on ${new Date(result.date).toLocaleDateString()}`;
          map.addMarker(result.lat, result.lng, popupText);
        }
      });

      // Move to last result if available
      const lastResult = results[results.length - 1];
      if (lastResult && lastResult.lat && lastResult.lng) {
        map.moveTo(lastResult.lat, lastResult.lng);
      }
    } catch (error) {
      console.error("Failed to load results:", error);
    }
  });
</script>

<Card title="Running Locations">
  <LeafletMap height={60} bind:this={map} />
</Card>

{#if results.length === 0}
  <Card title="No Data">
    <p>No running results found. Add some results to see them on the map!</p>
  </Card>
{/if}
