<script lang="ts">
    import { page } from '$app/stores';

    console.log($page.error);
    
</script>

<div class="content">
    <h1>Error: {$page.error?.message}</h1>
</div>

<style>
    .content {
        margin: 10px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 5px;
        display: flex;
        justify-content: center;
    }
</style>