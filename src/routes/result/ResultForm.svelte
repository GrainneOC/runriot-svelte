<script lang="ts">
  import { onMount } from 'svelte';
  import { runriotService } from '$lib/services/runriot-service';
  import { loggedInUser } from '$lib/runes.svelte';
  import type { Result, Trail } from '$lib/types/runriot-types';
  import Coordinates from "$lib/ui/Coordinates.svelte";

  let distance = $state(8);
  let duration = $state(45);
  let date = $state(new Date().toISOString().slice(0, 10)); // Use ISO format for consistency
  let trail = $state("");
  let lat = $state(51.8999);
  let lng = $state(-8.4027);

  // State to hold the trails fetched from the API
  let trailList = $state<Trail[]>([]);

  onMount(async () => {
    // Fetch the trails from the API when the component mounts
    try {
      trailList = await runriotService.getTrails();
      if (trailList.length > 0) {
        trail = trailList[0]._id!; // Set the default selected trail to the first one in the list
      }
    } catch (error) {
      console.error("Failed to fetch trails:", error);
    }
  });

  async function addResult() {
    console.log(`Ran: ${distance} in ${duration} minutes on ${date} at ${trail}!`);
    console.log(`lat: ${lat}, lng: ${lng}`);

    // Create the result object to send to the backend
    const newResult: Result = {
      distance: distance,
      duration: duration,
      date: date,
      trailid: trail,
      lat: lat,
      lng: lng
    };
    
    // Call the API service to add the result
    const success = await runriotService.addResult(newResult);
    if (success) {
      console.log("Result successfully added!");
    } else {
      console.error("Failed to add result.");
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
    <div class="select">
      <select bind:value={trail}>
        {#each trailList as trail}
          <option value={trail._id}>{trail.title}, {trail.location}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="field">
    <div class="control">
      <button onclick={addResult} class="button">Add Result</button>
    </div>
  </div>
</div>
<Coordinates bind:lat bind:lng />
