<script lang="ts">
  import type { Result } from "$lib/types/runriot-types";

  // This component receives a single result object as a prop
  let { result } = $props<{ result: Result }>();

  // Format the date for better readability
  const formattedDate = new Date(result.date).toLocaleDateString();
</script>

<div class="list-item">
    <div class="content">
        <p><strong>Date:</strong> {formattedDate}</p>
        <p><strong>Distance:</strong> {result.distance} km</p>
        <p><strong>Duration:</strong> {result.duration} minutes</p>
    </div>
</div>

<style>
    .list-item {
        padding: 1rem;
        border-bottom: 1px solid #dbdbdb;
    }
    .list-item:last-child {
        border-bottom: none;
    }
</style>
