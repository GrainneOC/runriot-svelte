<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser, clearUserFromStorage } from "$lib/runes.svelte";

  loggedInUser.email = "";
  loggedInUser.name = "";
  loggedInUser.token = "";
  loggedInUser._id = "";
  
  // Clear from localStorage
  clearUserFromStorage();
  
  goto("/");
</script>