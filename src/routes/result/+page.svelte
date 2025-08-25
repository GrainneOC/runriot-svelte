<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import ResultForm from "./ResultForm.svelte";

  subTitle.text = "Enter a result";
</script>

<Card title="Stay on track of your tracks!">
  <ResultForm />
</Card>