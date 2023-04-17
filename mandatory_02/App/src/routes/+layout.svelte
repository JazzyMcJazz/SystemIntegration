<script lang="ts">
    import { type SubmitFunction, enhance } from '$app/forms';
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';

    $: authenticated = $page.data.authenticated as Boolean;
    
    const logout: SubmitFunction = async () => {
        return async () => {
            await invalidateAll();
            goto($page.url.pathname);
        }
    };
</script>

<!-- Nav Bar -->
<nav>
    <ul>
        <li><a href="/">Home</a></li>
    </ul>
    <ul>
        {#if authenticated}
            <li><a href="/profile">Profile</a></li>
            <li>
                <form action="/logout" method="post" use:enhance={logout}>
                    <button type="submit">Logout</button>
                </form>
            </li>
        {:else}
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Signup</a></li>
        {/if}
    </ul>
</nav>

<slot/>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    nav {
        background-color: #333;
        overflow: hidden;
        border-radius: 5px;
        margin: 10px;
        display: flex;
        justify-content: space-between;
    }

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    nav li {
        float: left;
    }

    nav li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    nav li a:hover, button:hover {
        background-color: #414141;
    }

    button {
        background-color: #333;
        border: none;
        color: white;
        padding: 14px 16px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
    }
</style>