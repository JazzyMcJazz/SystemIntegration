import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch, url}) => {
    
    const fetchWebhooks = async () => {
        if (url.origin === 'http://sveltekit-prerender') return []; // compile bug workaround
        return await fetch(url.origin + '/api/webhooks').then(res => res.json());
    };
    
    return { webhooks: fetchWebhooks() };
};