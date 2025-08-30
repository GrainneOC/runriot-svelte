<script lang="ts">
  import { onMount } from 'svelte';
  import { subTitle, loggedInUser, isAuthenticated } from "$lib/runes.svelte";
  import { runriotService } from "$lib/services/runriot-service";
  import type { Trail } from "$lib/types/runriot-types";
  import Card from "$lib/ui/Card.svelte";
  import TrailItem from "$lib/ui/TrailItem.svelte";
  import TrailMap from "$lib/ui/TrailMap.svelte";
  import { goto } from "$app/navigation";

  // Set the subtitle for this page
  subTitle.text = "Your Trail Dashboard";
  
  // State to hold the list of trails
  let trails = $state<Trail[]>([]);
  let message = $state("Fetching trails...");

  // Function to fetch trails
  async function fetchTrails() {
    try {
      trails = await runriotService.getTrails();
      if (trails.length === 0) {
        message = "No trails found. Add some to get started!";
      }
    } catch (error) {
      console.error("Failed to fetch trails:", error);
      message = "Failed to load trails. Please try again later.";
    }
  }

  // Fetch trails from the backend when the component loads
  onMount(() => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      fetchTrails();
    } else {
      message = "Authentication required. Please log in.";
    }
    
    // Listen for trail deletion events
    const handleTrailDeleted = () => {
      fetchTrails(); // Refresh the trails list
    };
    
    document.addEventListener('trailDeleted', handleTrailDeleted);
    
    // Cleanup event listener on component destroy
    return () => {
      document.removeEventListener('trailDeleted', handleTrailDeleted);
    };
  });

  function addResult() {
    goto("/result");
  }

  function addTrail() {
    goto("/trail/add");
  }
</script>

<Card title="🗺️ Trail Map">
  <TrailMap {trails} />
</Card>

<Card title="📍 Running Locations">
  <div style="height: 300px; background: #e8f4f8; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
    <div>
      <h4>Map View</h4>
      <p>Click "Maps" in the menu to see your running locations</p>
    </div>
  </div>
</Card>

<Card title="All Trails">
  <div class="mb-4">
    <button class="button is-primary mr-2" on:click={addResult}>
      Add Result
    </button>
    <button class="button is-info" on:click={addTrail}>
      Add Trail
    </button>
  </div>
  
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
