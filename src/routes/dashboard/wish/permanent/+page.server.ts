import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) {
        throw redirect(301 , "/")
    }

    const totalEventPull = await prisma.wish_history.findMany({
        where: {
          gacha_type: 200,
          userID: user.userId
        },
        orderBy: {
          id: 'desc'
        }
      });

      const charactersPulled = await prisma.wish_history.findMany({
        where: {
          item_type: {
            in: ["Character" , "Weapon"]
          },
          userID: user.userId,
          gacha_type: {
            in: [301 , 400]
          },
        },
        distinct: ["name"],
        select: {
          name: true,
          item_type: true
        },
      });

      const rankpercentage = await prisma.wish_history.findMany({
        where: {
          userID: user.userId,
          gacha_type: 200,
        },
        select: {
          name: true,
          rank_type: true
        },
      });
      let star_3 = 0
      let star_4 = 0
      let star_5 = 0
    if (rankpercentage.length !== 0) {
      rankpercentage.forEach(element => {
        if (element.rank_type === 3) {
          star_3++
        }
        if (element.rank_type === 4) {
          star_4++
        }
        if (element.rank_type === 5) {
          star_5++
        }
      });
    }

    const totalweaponcount = await prisma.wish_history.count({
      where: {
        gacha_type: 200,
        userID: user.userId,
        item_type: "Weapon"
      },
      orderBy: {
        id: 'desc'
      }
    });
    
    const totalcharactercount = await prisma.wish_history.count({
      where: {
        gacha_type: 200,
        userID: user.userId,
        item_type: "Character"
      },
      orderBy: {
        id: 'desc'
      }
    });

	return { user , totalEventPull , charactersPulled , star_3 , star_4 , star_5 , totalweaponcount , totalcharactercount}
};

