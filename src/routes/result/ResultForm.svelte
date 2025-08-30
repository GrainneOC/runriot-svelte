<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { runriotService } from '$lib/services/runriot-service';
  import { loggedInUser, isAuthenticated } from '$lib/runes.svelte';
  import type { Result, Trail } from '$lib/types/runriot-types';
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let distance = $state(0);
  let duration = $state(0);
  let date = $state(new Date().toISOString().slice(0, 10)); // Use ISO format for consistency
  let trail = $state("");
  let lat = $state(0);
  let lng = $state(0);

  // State to hold the trails fetched from the API
  let trailList = $state<Trail[]>([]);
  let loading = $state(true);
  let errorMessage = $state("");

  onMount(async () => {
    // Check if user is authenticated
    if (isAuthenticated()) {
      await fetchTrails();
      
      // Check if trail ID is passed via query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const trailId = urlParams.get('trail');
      if (trailId) {
        trail = trailId;
      }
    } else {
      errorMessage = "Authentication required. Please log in.";
      loading = false;
    }
  });

  async function fetchTrails() {
    try {
      trailList = await runriotService.getTrails();
      if (trailList.length > 0) {
        trail = trailList[0]._id!; // Set the default selected trail to the first one in the list
      }
    } catch (error) {
      console.error("Failed to fetch trails:", error);
      errorMessage = "Failed to load trails. Please check the backend server.";
    } finally {
      loading = false;
    }
  }

  async function addResult() {
    // Prevent adding a result if no trail is selected
    if (!trail) {
      alert("Please select a trail before adding a result.");
      return;
    }

    console.log(`Ran: ${distance} in ${duration} minutes on ${date} at ${trail}!`);
    console.log(`lat: ${lat}, lng: ${lng}`);

    // Create the result object to send to the backend
    const newResult: Result = {
      distance: distance,
      duration: duration,
      date: date,
      // trailid removed - backend gets it from URL parameter
      lat: Number(lat), // Ensure it's a number
      lng: Number(lng)  // Ensure it's a number
    };
    
    // Call the API service to add the result
    const success = await runriotService.addResult(newResult, trail);
    if (success) {
      console.log("Result successfully added!");
      // Redirect to the trail view to see the new result
      goto(`/trail/${trail}`);
    } else {
      console.error("Failed to add result.");
      alert("Failed to add result. Please try again.");
    }
  }
</script>

<div>
  <div class="field">
    <label class="label" for="distance">Enter Distance in KM:</label>
    <input bind:value={distance} class="input" id="distance" name="distance" type="number" />
  </div>
  <div class="field">
    <label class="label" for="duration">Enter Duration in minutes:</label>
    <input bind:value={duration} class="input" id="duration" name="duration" type="number" />
  </div>
  <div class="field">
    <label class="label" for="date">Enter Date:</label>
    <input bind:value={date} class="input" id="date" name="date" type="date" />
  </div>

  <div class="field">
    <label class="label" for="trail">Select Trail:</label>
    {#if loading}
      <p>Loading trails...</p>
    {:else if errorMessage}
      <p class="has-text-danger">{errorMessage}</p>
    {:else if trailList.length > 0}
      <div class="select">
        <select bind:value={trail}>
          {#each trailList as trail}
            <option value={trail._id}>{trail.title}, {trail.location}</option>
          {/each}
        </select>
      </div>
    {:else}
      <p>No trails found. Please add a trail first.</p>
    {/if}
  </div>

  <div class="field">
    <div class="control">
      <button onclick={addResult} class="button">Add Result</button>
    </div>
  </div>
</div>
<Coordinates bind:lat bind:lng />