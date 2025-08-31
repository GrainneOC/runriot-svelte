<script lang="ts">
  import { onMount } from 'svelte';
  import type { Trail } from '$lib/types/runriot-types';

  export let trails: Trail[] = [];
  export let selectedLayer: string = 'all';

  let mapContainer: HTMLDivElement;
  let map: any;
  let markers: any[] = [];

  onMount(() => {
    // Simple map with basic markers
    initializeMap();
  });

  $: if (trails.length > 0) {
    updateMap();
  }

  function initializeMap() {
    // Simple map display with markers
    const filteredTrails = selectedLayer === 'all' 
      ? trails 
      : trails.filter(trail => trail.location.toLowerCase().includes(selectedLayer.toLowerCase()));
    
    mapContainer.innerHTML = `
      <div style="height: 300px; background: #e8f4f8; border: 1px solid #ccc; position: relative;">
        <div style="position: absolute; top: 10px; left: 10px; background: white; padding: 10px; border: 1px solid #ddd;">
          <h4>Map View</h4>
          <p>Trails: ${filteredTrails.length}</p>
          <p>Filter: ${selectedLayer}</p>
        </div>
        ${filteredTrails.map(trail => `
          <div style="position: absolute; 
                      left: ${50 + Math.random() * 60}%; 
                      top: ${30 + Math.random() * 40}%; 
                      background: #4CAF50; 
                      color: white; 
                      padding: 5px 10px; 
                      border-radius: 15px; 
                      font-size: 12px;
                      cursor: pointer;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
               title="${trail.title} - ${trail.location}">
            🏃
          </div>
        `).join('')}
      </div>
    `;
  }

  function updateMap() {
    initializeMap();
  }

  function changeLayer(layer: string) {
    selectedLayer = layer;
  }
</script>

<div class="map-container">
  <div class="map-controls">
    <button 
      class="button is-small {selectedLayer === 'all' ? 'is-primary' : 'is-light'}"
      on:click={() => changeLayer('all')}
    >
      All Trails
    </button>
    <button 
      class="button is-small {selectedLayer === 'cork' ? 'is-primary' : 'is-light'}"
      on:click={() => changeLayer('cork')}
    >
      Cork Trails
    </button>
    <button 
      class="button is-small {selectedLayer === 'dublin' ? 'is-primary' : 'is-light'}"
      on:click={() => changeLayer('dublin')}
    >
      Dublin Trails
    </button>
  </div>
  
  <div class="map-wrapper">
    <div bind:this={mapContainer} class="map"></div>
  </div>
</div>

<style>
  .map-container {
    margin: 20px 0;
  }

  .map-controls {
    margin-bottom: 20px;
    text-align: center;
  }

  .map-controls .button {
    margin: 0 5px;
  }

  .map-wrapper {
    background: white;
    padding: 15px;
    border: 1px solid #ddd;
  }

  .map {
    width: 100%;
    height: 300px;
  }
</style>
