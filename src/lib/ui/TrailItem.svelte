// src/lib/ui/TrailItem.svelte
<script lang="ts">
    import type { Trail } from "$lib/types/runriot-types";
    import { goto } from "$app/navigation";

    // This component receives a single trail object as a prop
    let { trail } = $props<{trail: Trail}>();

    function navigateToTrail(trailId: string) {
      goto(`/trail/${trailId}`);
    }
</script>

<a href="#" class="list-item" on:click|preventDefault={() => navigateToTrail(trail._id!)}>
    <div class="content">
        <h4>{trail.title}</h4>
        <p>{trail.location}</p>
    </div>
</a>

<style>
    .list-item {
        display: block;
        padding: 1rem;
        transition: background-color 0.2s ease-in-out;
    }
    .list-item:hover {
        background-color: #f5f5f5;
    }
</style>