<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import ResultList from "$lib/ui/ResultList.svelte";

  subTitle.text = "Results to date";
</script>

<Card title = "Results">
  <ResultList />
</Card>