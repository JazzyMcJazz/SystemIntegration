<script lang="ts">
    import Chat from "../lib/Chat.svelte";
    import RegisterWebhook from "../lib/RegisterWebhook.svelte";
    import WebhookList from "../lib/WebhookList.svelte";
</script>

<div class="content">

    <Chat />
    <WebhookList />
    <RegisterWebhook />
</div>


<style>

    .content {
        width: 100%;
        height: 100vh;
        display: flex;
    }
</style>