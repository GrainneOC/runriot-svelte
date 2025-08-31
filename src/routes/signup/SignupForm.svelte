<script lang="ts">
  import { goto } from "$app/navigation";
  import { runriotService } from "$lib/services/runriot-service";
  import UserCredentials from "$lib/ui/UserCredentials.svelte";
  import UserDetails from "$lib/ui/UserDetails.svelte";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {
    try {
      console.log("=== SIGNUP ATTEMPT ===");
      console.log("Creating user:", email);
      
      const success = await runriotService.signup({
        firstName,
        lastName,
        email,
        password
      });
      
      if (success) {
        console.log("Signup successful, redirecting to login");
        goto("/login");
      } else {
        message = "Error trying to sign up";
      }
    } catch (error) {
      console.error("Signup error:", error);
      message = "Error trying to sign up";
    }
  }
</script>

<div class="box">
  <UserDetails bind:firstName bind:lastName />
  <UserCredentials bind:email bind:password />
  <button onclick={() => signup()} class="button">Sign Up</button>
  <p class="has-text-centered">
    Already have an account? <a href="/login" data-cy="login-redirect">Login Here</a>
  </p>
</div>