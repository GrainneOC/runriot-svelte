<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { runriotService } from '$lib/services/runriot-service';
  import type { Trail, Result } from '$lib/types/runriot-types';
  import { goto } from '$app/navigation';

  let trail = $state<Trail | null>(null);
  let results = $state<Result[]>([]);
  let loading = $state(true);
  let error = $state("");

  onMount(async () => {
    const trailId = $page.params.id;
    if (trailId) {
      await loadTrailAndResults(trailId);
    }
  });

  async function loadTrailAndResults(trailId: string) {
    try {
      loading = true;
      // Load trail details
      trail = await runriotService.getTrail(trailId);
      if (!trail) {
        error = "Trail not found";
        return;
      }
      
      // Load results for this trail
      results = await runriotService.getResultsByTrailId(trailId);
    } catch (err) {
      console.error('Error loading trail:', err);
      error = "Failed to load trail";
    } finally {
      loading = false;
    }
  }

  function addResult() {
    goto(`/result?trail=${trail?._id}`);
  }

  function goBack() {
    goto('/trail');
  }
</script>

<div class="container">
  {#if loading}
    <div class="box">
      <p>Loading trail...</p>
    </div>
  {:else if error}
    <div class="box">
      <p class="has-text-danger">{error}</p>
      <button class="button" on:click={goBack}>Go Back</button>
    </div>
  {:else if trail}
    <div class="box">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <h1 class="title">{trail.title}</h1>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <button class="button is-primary" on:click={addResult}>
              Add Result
            </button>
            <button class="button" on:click={goBack}>
              Back to Trails
            </button>
          </div>
        </div>
      </div>
      
      <p class="subtitle">{trail.location}</p>
      
      <hr>
      
      <h2 class="title is-4">Results</h2>
      
      {#if results.length === 0}
        <p>No results yet. Add your first result!</p>
      {:else}
        <div class="table-container">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Date</th>
                <th>Distance (km)</th>
                <th>Duration (min)</th>
                <th>Pace (min/km)</th>
              </tr>
            </thead>
            <tbody>
              {#each results as result}
                <tr>
                  <td>{result.date}</td>
                  <td>{result.distance}</td>
                  <td>{result.duration}</td>
                  <td>{(result.duration / result.distance).toFixed(1)}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  {/if}
</div>
