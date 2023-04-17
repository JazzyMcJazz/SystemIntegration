import { refreshSession } from "$lib/SupaBase";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle = (async ({ resolve, event }) => {

    let access_token = event.cookies.get('access_token');
    let refresh_token = event.cookies.get('refresh_token');

    if (!access_token && refresh_token) {
        const response = await refreshSession(refresh_token, event.cookies);
        if (response.data.session) {
            access_token = response.data.session.access_token;
            refresh_token = response.data.session.refresh_token;
        }
    }

    if (access_token && refresh_token) {
        event.locals.user = {
            access_token,
            refresh_token
        };
    }
    
    if (access_token) {
        if (event.route.id?.startsWith('/(auth)')) {
            throw redirect(302, '/');
        }
    } else {
        if (event.route.id?.startsWith('/(protected)')) {
            throw redirect(302, '/login');
        }
    }

    return resolve(event);
}) satisfies Handle;