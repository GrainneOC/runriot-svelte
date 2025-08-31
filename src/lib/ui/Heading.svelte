<script lang="ts">
  import { subTitle } from "$lib/runes.svelte";
</script>

<section class="hero is-small mt-6 mb-6 cyan-hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title has-text-centered">
        {subTitle.text}
      </h1>
    </div>
  </div>
</section>

<style>
  .cyan-hero {
    background-color: #00bcd4 !important;
    color: white !important;
  }
  
  .cyan-hero .title {
    color: white !important;
  }
</style>