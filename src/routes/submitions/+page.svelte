<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    goto('/submissions', { replaceState: true });
  });
</script>

<div class="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
  <span>Redirecting to submissions tracking...</span>
</div>
