<script lang="ts">
  let {title = "", children} = $props();
</script>

<div class="card-container">
  <div class="card-header">
    <h3>{title}</h3>
  </div>
  <div class="card-body">
    {@render children()}
  </div>
</div>

<style>
  .card-container {
    border: 1px solid #ddd;
    margin: 15px 0;
    background: white;
  }
  
  .card-header {
    background: #f5f5f5;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
  }
  
  .card-header h3 {
    margin: 0;
    font-size: 16px;
  }
  
  .card-body {
    padding: 15px;
  }
</style>