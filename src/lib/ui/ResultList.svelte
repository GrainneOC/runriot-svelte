<script lang="ts">
  import { onMount } from 'svelte';
  import { runriotService } from '$lib/services/runriot-service';
  import { isAuthenticated } from '$lib/runes.svelte';
  import type { PopulatedResult } from '$lib/types/runriot-types';

  let results = $state<PopulatedResult[]>([]);
  let loading = $state(true);
  let error = $state("");

  onMount(async () => {
    if (isAuthenticated()) {
      await fetchResults();
    } else {
      error = "Authentication required. Please log in.";
      loading = false;
    }
  });

  async function fetchResults() {
    try {
      loading = true;
      results = await runriotService.getResults();
      // Dispatch event with results for parent components
      const event = new CustomEvent('resultsLoaded', { detail: results });
      document.dispatchEvent(event);
    } catch (err) {
      console.error('Error fetching results:', err);
      error = "Failed to load results";
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <p>Loading results...</p>
{:else if error}
  <p class="has-text-danger">{error}</p>
{:else if results.length === 0}
  <p>No results found. Add some results to see them here!</p>
{:else}
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Distance (km)</th>
        <th>Duration (min)</th>
        <th>Date</th>
        <th>Pace (min/km)</th>
        <th>Trail</th>
      </tr>
    </thead>
    <tbody>
      {#each results as result}
        <tr>
          <td>{result.distance}</td>
          <td>{result.duration}</td>
          <td>{result.date}</td>
          <td>{(result.duration / result.distance).toFixed(1)}</td>
          <td>{result.trailid?.title || 'Unknown Trail'}, {result.trailid?.location || 'Unknown Location'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}