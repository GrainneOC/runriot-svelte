<script lang="ts">
  import { onMount } from 'svelte';
  import { subTitle } from "$lib/runes.svelte";
  import { runriotService } from "$lib/services/runriot-service";
  import type { Trail } from "$lib/types/runriot-types";
  import Card from "$lib/ui/Card.svelte";
  import TrailItem from "$lib/ui/TrailItem.svelte";

  // Set the subtitle for this page
  subTitle.text = "Your Trail Dashboard";
  
  // State to hold the list of trails
  let trails = $state<Trail[]>([]);
  let message = $state("Fetching trails...");

  // Fetch trails from the backend when the component loads
  onMount(async () => {
    try {
      trails = await runriotService.getTrails();
      if (trails.length === 0) {
        message = "No trails found. Add some to get started!";
      }
    } catch (error) {
      console.error("Failed to fetch trails:", error);
      message = "Failed to load trails. Please try again later.";
    }
  });
</script>

<Card title="All Trails">
  {#if trails.length > 0}
    <div class="list is-hoverable">
      <!-- Loop through the trails and display each one -->
      {#each trails as trail}
        <TrailItem {trail} />
      {/each}
    </div>
  {:else}
    <p>{message}</p>
  {/if}
</Card>
