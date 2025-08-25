<script lang="ts">
  import { onMount } from 'svelte';
  import { runriotService } from "$lib/services/runriot-service";
  import type { Trail, Result } from "$lib/types/runriot-types";
  import ResultItem from "$lib/ui/ResultItem.svelte";

  // This component receives a single trail object as a prop
  let { trail } = $props<{ trail: Trail }>();
  
  // State to hold the list of results for this trail
  let results = $state<Result[]>([]);
  let message = $state("Fetching results...");

  // Fetch results from the backend when the component loads
  onMount(async () => {
    try {
      // Use the new service function to fetch results for this specific trail
      results = await runriotService.getResultsByTrailId(trail._id!);
      if (results.length === 0) {
        message = "No results found for this trail.";
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
