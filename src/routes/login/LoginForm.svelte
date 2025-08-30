<script lang="ts">
  import { goto } from "$app/navigation";
  import { loggedInUser, saveUserToStorage } from "$lib/runes.svelte";
  import { runriotService } from "$lib/services/runriot-service";
  import Message from "$lib/ui/Message.svelte";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";

  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function login() {
    console.log(`attempting to log in email: ${email} with password: ${password}`);
    let session = await runriotService.login(email, password);
    if (session) {
      loggedInUser.email = email;
      loggedInUser.name = session.name || "";
      loggedInUser.token = session.token;
      loggedInUser._id = session._id || "";
      
      // Save to localStorage
      saveUserToStorage();
      
      console.log(`Session: ${JSON.stringify(session)}`);
      console.log(`loggedInUser after login:`, loggedInUser);
      goto("/dashboard");
    } else {
      email = "";
      password = "";
      message = "Invalid Credentials";
    }
  }
</script>

<div class="box">
  {#if message}
    <Message {message} />
  {/if}
  <UserCredentials bind:email bind:password />
  <button onclick={() => login()} class="button">Log In</button>
</div>