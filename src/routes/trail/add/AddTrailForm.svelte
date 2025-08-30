<script lang="ts">
  import { runriotService } from "$lib/services/runriot-service";
  import type { Trail } from "$lib/types/runriot-types";
  import Message from "$lib/ui/Message.svelte";

  let title = $state("");
  let location = $state("");
  let message = $state({ text: "", type: "" });

  async function addTrail() {
    // Basic validation to ensure fields are not empty
    if (!title || !location) {
      message = { text: "Please fill in all fields.", type: "danger" };
      return;
    }

    const newTrail: Trail = {
      title,
      location
    };

    try {
      const success = await runriotService.addTrail(newTrail);
      if (success) {
        message = { text: "Trail added successfully!", type: "success" };
        // Clear the form after a successful submission
        title = "";
        location = "";
      } else {
        message = { text: "Failed to add trail. Please check your connection and try again.", type: "danger" };
      }
    } catch (error) {
      console.error("Add trail error:", error);
      message = { text: "An error occurred while adding the trail. Please try again.", type: "danger" };
    }
  }
</script>

<div class="box">
  <form on:submit|preventDefault={addTrail}>
    <div class="field">
      <label class="label" for="title">Title</label>
      <div class="control">
        <input bind:value={title} class="input" type="text" id="title" placeholder="Enter trail title" />
      </div>
    </div>

    <div class="field">
      <label class="label" for="location">Location</label>
      <div class="control">
        <input bind:value={location} class="input" type="text" id="location" placeholder="Enter trail location" />
      </div>
    </div>
    
    <div class="field">
      <div class="control">
        <button class="button is-link" type="submit">Add Trail</button>
      </div>
    </div>
  </form>
  {#if message.text}
    <Message {message} />
  {/if}
</div>
