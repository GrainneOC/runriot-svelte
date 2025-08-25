<script lang="ts">
  import DashboardForm from "./DashboardForm.svelte";
  import Card from "$lib/ui/Card.svelte";
  import { subTitle } from "$lib/runes.svelte";

  // Set the subtitle for the page
  subTitle.text = "Your Dashboard";
</script>

<Card title="Dashboard">
  <DashboardForm />
</Card>
