<script lang="ts">
  let { message } = $props<{ text: string; type: string }>();
</script>

<div class="message-box">
  {message.text}
</div>

<style>
  .message-box {
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    background: #f0f0f0;
    border-radius: 4px;
  }
</style>