import { API_KEY, API_URL } from "$env/static/private";

/** @type {import('./$types').PageServerLoad} */
export const load = () => {
    return {
        url: API_URL,
        key: API_KEY,
    };
}
