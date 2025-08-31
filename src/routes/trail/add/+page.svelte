<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import AddTrailForm from "./AddTrailForm.svelte";

  // Set the subtitle for this page
  subTitle.text = "Add a New Trail";
</script>

<Card title="New Trail">
  <AddTrailForm />
</Card>
