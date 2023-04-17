import { signup } from '$lib/SupaBase';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    // Signup
    default: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;

        if (!email || !password) {
            return fail(400, { message: 'Missing email or password' });
        }

        const response = await signup(email, password, cookies);
        
        if (response.error) {
            return fail(400, { message: 'Signup failed' });
        }

        throw redirect(302, '/');
    }
};