import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) {
        throw redirect(301 , "/")
    }
    return { user }
};

