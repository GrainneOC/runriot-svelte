<script lang="ts">
    import type { Trail } from "$lib/types/runriot-types";
    import { goto } from "$app/navigation";
    import { runriotService } from "$lib/services/runriot-service";

    // This component receives a single trail object as a prop
    let { trail } = $props<{trail: Trail}>();

    function navigateToTrail(trailId: string) {
      goto(`/trail/${trailId}`);
    }

    async function deleteTrail(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      
      if (confirm(`Are you sure you want to delete "${trail.title}"? This action cannot be undone.`)) {
        const success = await runriotService.deleteTrail(trail._id!);
        if (success) {
          // Remove the trail from the DOM by dispatching a custom event
          const deleteEvent = new CustomEvent('trailDeleted', { 
            detail: { trailId: trail._id } 
          });
          document.dispatchEvent(deleteEvent);
        } else {
          alert('Failed to delete trail. Please try again.');
        }
      }
    }

    async function deleteResult(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      
      if (confirm(`Are you sure you want to delete this result? This action cannot be undone.`)) {
        // Add result deletion logic here when you have results
        alert('Result deletion feature coming soon!');
      }
    }
</script>

<div class="list-item">
    <a href="#" class="trail-link" on:click|preventDefault={() => navigateToTrail(trail._id!)}>
        <div class="content">
            <h4>{trail.title}</h4>
            <p>{trail.location}</p>
        </div>
    </a>
    <button class="delete-button" on:click={deleteTrail} title="Delete trail">
        🗑️
    </button>
</div>

<style>
    .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }
    
    .list-item:hover {
        background-color: #f0f0f0;
    }
    
    .trail-link {
        flex: 1;
        text-decoration: none;
        color: inherit;
    }
    
    .trail-link:hover {
        text-decoration: none;
    }
    
    .content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .content p {
        margin: 0;
        color: #666;
        font-size: 0.9rem;
    }
    
    .delete-button {
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
    }
    
    .delete-button:hover {
        background-color: #ffcccc;
    }
</style>