<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import { onMount } from "svelte";

  let { height = 60 } = $props();
  let id = "map-container";
  let location = { lat: 53.2734, lng: -7.7783203 }; // Ireland center
  let zoom = 7;
  
  let map: any;
  let L: any;

  onMount(async () => {
    const leaflet = await import("leaflet");
    L = leaflet.default;
    
    // Simple map with basic layer
    map = L.map(id, {
      center: [location.lat, location.lng],
      zoom: zoom
    });

    // Add basic tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  });

  // Simple function to add markers
  export function addMarker(lat: number, lng: number, popupText: string) {
    if (L && map) {
      const marker = L.marker([lat, lng]).addTo(map);
      if (popupText) {
        marker.bindPopup(popupText);
      }
    }
  }

  // Simple function to move to location
  export function moveTo(lat: number, lng: number) {
    if (map) {
      map.setView([lat, lng], zoom);
    }
  }
</script>

<div {id} style="height: {height}vh; border: 1px solid #ddd;"></div>


