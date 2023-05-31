import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { CURRENT_BANNER } from "$env/static/private"
export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (user) {
        throw redirect(302, "/dashboard")
    }
	return { user }
};