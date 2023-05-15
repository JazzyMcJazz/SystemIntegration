<script lang="ts">
    import { page } from '$app/stores';
    import type { User } from '@supabase/supabase-js';
    
    const user: User = $page.data.userData.user;
</script>

<div class="content">
    <!-- Profile information -->
    <div class="profile">
        <div class="grid">
            <h1>Profile</h1>
            <p>ID:</p><p>{user.id}</p>
            <p>Email:</p><p>{user.email}</p>
            <p>Joined:</p><p>{new Date(user.created_at).toLocaleString()}</p>
        </div>

    </div>
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
    
    h1 {
        grid-column: 1 / 3;
    }

    .grid {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 10px;
    }
</style>