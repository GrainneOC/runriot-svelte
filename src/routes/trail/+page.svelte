// src/routes/trail/[id]/+page.svelte
<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import TrailForm from "./TrailForm.svelte";
  import type { Trail } from "$lib/types/runriot-types";
  
  // This page receives the fetched trail data from the load function
  let { data } = $props<{ data: { trail: Trail | null } }>();
  
  // Set the subtitle for the page based on the trail name
  if (data.trail) {
    subTitle.text = data.trail.title;
  } else {
    subTitle.text = "Trail Not Found";
  }
</script>

<Card title="Trail Details">
  {#if data.trail}
    <TrailForm trail={data.trail} />
  {:else}
    <p>Sorry, that trail could not be found.</p>
  {/if}
</Card>
