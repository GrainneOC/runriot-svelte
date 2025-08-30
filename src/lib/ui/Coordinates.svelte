<script lang="ts">
  let { lat = $bindable(53.3498), lng = $bindable(-6.2603) } = $props();
</script>

<div class="box field is-horizontal">
  <div class="field-label is-normal">
    <label for="lng" class="label">Lat</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded">
        <input id="lng" class="input" type="float" bind:value={lat} />
      </p>
    </div>
    <div class="field-label is-normal">
      <label for="lat" class="label">Lng</label>
    </div>
    <div class="field">
      <p class="control is-expanded">
        <input id="lat" class="input" type="float" bind:value={lng} />
      </p>
    </div>
  </div>
  <div class="field">
    <p class="help">Default: Dublin coordinates (53.3498, -6.2603). Update for your actual running location.</p>
  </div>
</div>