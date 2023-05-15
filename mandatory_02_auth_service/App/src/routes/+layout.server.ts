import type { LayoutServerLoad } from "./$types";


export const load: LayoutServerLoad = async ({locals}) => {

    const authenticated = locals.user?.access_token && locals.user?.refresh_token;

    return {
        authenticated
    }
};