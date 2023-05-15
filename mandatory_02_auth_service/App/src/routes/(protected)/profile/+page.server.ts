import { getUser } from '$lib/SupaBase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const response = await getUser(locals.user.access_token);
    console.log(response);
    
    
    if (response.error) {
        throw error(response.error.status || 500, response.error.name);
    }

    response.data

    return {
        userData: response.data
    };
}) satisfies PageServerLoad;