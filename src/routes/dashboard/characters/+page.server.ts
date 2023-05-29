import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import type { Action } from "../$types";
import { characters } from "genshin-db";

export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) {
        throw redirect(301 , "/")
    }

    const charactersPulled = await prisma.wish_history.findMany({
        where: {
          item_type: "Character",
          userID: user.userId
        },
        distinct: ["name"],
        select: {
          name: true,
        },
      });
	return { user , charactersPulled }
};

