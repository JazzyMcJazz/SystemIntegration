<script lang="ts">
    import { page } from '$app/stores';
    import { type SubmitFunction, enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    $: isLogin = $page.route.id === '/(auth)/login' ? 'Login' : 'Signup';
    $: title = isLogin === 'Login' ? 'Login' : 'Signup';

    let email = 'bob@bob.com';
    let password = '123456';

    const submit: SubmitFunction = () => {
        return ({result}) => {
            invalidateAll();
        }
    }
</script>

<div class="content">
    <div class="signup">
        <h1>{title}</h1>
        <form method="post" use:enhance={submit}>
            <label for="email">Email</label>
            <input type="email" name="email" bind:value={email} />
            <label for="password">Password</label>
            <input type="password" name="password" bind:value={password} />
            <button type="submit">{title}</button>
        </form>
    </div>
</div>

<slot/>

<style>
    .content {
        margin: 10px;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 5px;
        display: flex;
        justify-content: center;
    }
    
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    label {
        margin-top: 10px;
    }

    input {
        margin: 2px 0 10px 0;
        padding: 8px;
        border: 1px solid #333;
        border-radius: 5px;
        /* dark mode */
        background-color: #333;
        color: white;
    }

    button {
        margin: 20px 0;
        padding: 8px;
        border: 1px solid #333;
        border-radius: 5px;
        background-color: #333;
        color: white;
        font-weight: bold;
    }

    button:hover {
        background-color: #414141;
        cursor: pointer;
    }
</style>