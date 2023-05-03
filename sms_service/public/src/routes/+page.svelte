<script lang="ts">
    import { fade } from "svelte/transition";
    import Login from "$lib/components/Login.svelte";
    import Logout from "$lib/components/Logout.svelte";
    import SMS from "$lib/components/SMS.svelte";
    import { keyStore } from "$lib/store/general";
    import { onMount } from "svelte";

    let loading = true;

    onMount(() => {
        const api_key = localStorage.getItem("api_key") || '';
        console.log();
        
        const user_verified = localStorage.getItem("user_verified") === 'true' || false;
        keyStore.set({ api_key, user_verified });

        setTimeout(() => {
            loading = false;
        }, 2500);
    });

    $: apiKey = $keyStore.api_key;
</script>


<main>
    {#if loading}
        <div class="spinner" transition:fade></div>
    {:else}
        <h1 transition:fade={{delay: 500, duration: 200}}>SMS Integration</h1>

        {#if apiKey}
            <SMS />
        {:else}
            <Login />
        {/if}

        {#if apiKey}
            <Logout />
        {/if}
    {/if}    
</main>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        margin: 0;
        background-color: darkslategrey;
        color: white;
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -25px;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

</style>