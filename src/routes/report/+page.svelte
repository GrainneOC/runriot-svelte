<script lang="ts">
  import { onMount } from 'svelte';
  import { subTitle } from "$lib/runes.svelte";
  import Card from "$lib/ui/Card.svelte";
  import ResultList from "$lib/ui/ResultList.svelte";
  import RunningChart from "$lib/ui/RunningChart.svelte";
  import type { PopulatedResult } from '$lib/types/runriot-types';

  subTitle.text = "Results to date";
  
  let chartResults = $state<PopulatedResult[]>([]);

  onMount(() => {
    const handleResultsLoaded = (event: CustomEvent) => {
      chartResults = event.detail;
    };
    
    document.addEventListener('resultsLoaded', handleResultsLoaded);
    
    return () => {
      document.removeEventListener('resultsLoaded', handleResultsLoaded);
    };
  });
</script>

<Card title="📊 Results">
  <RunningChart results={chartResults} title="Your Running Progress" />
  <ResultList />
</Card>