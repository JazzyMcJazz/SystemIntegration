import { error, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { logout } from '$lib/SupaBase';

export const load: PageServerLoad = (async () => {
    throw error(404, 'Not found')
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({cookies}) => {
        logout(cookies);
    }
};