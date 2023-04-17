import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { login } from '$lib/SupaBase';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    // Login
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;

        if (!email || !password) {
            return fail(400, { message: 'Missing email or password' });
        }

        const response = await login(email, password, cookies);

        if (response.error) {
            return fail(400, { message: 'Login failed' });
        }

        throw redirect(302, '/');
    }
};