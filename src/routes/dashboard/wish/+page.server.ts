import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
export const load: PageServerLoad = async ({ locals }) => {
    const { user } = await locals.auth.validateUser();
    if (!user) {
        throw redirect(301 , "/")
    }

    const totalEventPull = await prisma.wish_history.count({
        where: {
          gacha_type: {
            in: [301 , 400]
          },
          userID: user.userId
        },
        select: {
          name: true,
        },
      });

      const totalWeaponPull = await prisma.wish_history.count({
        where: {
          gacha_type: 302,
          userID: user.userId
        },
        select: {
          name: true,
        },
      });

      const totalPermanentPull = await prisma.wish_history.count({
        where: {
          gacha_type: 200,
          userID: user.userId
        },
        select: {
          name: true,
        },
      });

      async function get4star( pull_data: Array<any>) {
        let count = 0
        for (let i = 0; i <= pull_data.length ; i++) {
          if( pull_data[1] || pull_data[i]?.rank_type === 4 ){
            break;
          }
          count++
        }
        return count
      }

      async function get5star(pull_data: Array<any>) {
        let count = 0
        for (let i = 0; i <= pull_data.length ; i++) {
          if( pull_data[i]?.rank_type === 5 ){
            break;
          }
          count++
        }
        return count
      }

      let getLastPity_E;
      const getpull_E = await prisma.wish_history.findMany({
        where: {
          gacha_type: {
            in: [301 , 400]
          },
          userID: user.userId
        },
        take: 90,
        orderBy: {
          id: 'desc'
        }
      });
      if (getpull_E.length !== 0) {
        const current_4star_E = await get4star(getpull_E)
        const current_5star_E = await get5star(getpull_E)
        const current_4starPity_E = 10 - current_4star_E
        const current_5starPity_E = 90 - current_5star_E
         getLastPity_E = { 
          "5starPity_E" : current_5starPity_E, 
          "4starPity_E":current_4starPity_E 
        };
      }
      else{
         getLastPity_E = { 
          "5starPity_E" : 0, 
          "4starPity_E" : 0 
        };
      }
      let getLastPity_W;
      const getpull_W = await prisma.wish_history.findMany({
        where: {
          gacha_type: 302,
          userID: user.userId
        },
        take: 90,
        orderBy: {
          id: 'desc'
        }
      });
      if (getpull_W.length !== 0) {
        const current_4star_W = await get4star(getpull_W)
        const current_5star_W = await get5star(getpull_W)
        const current_4starPity_W = 10 - current_4star_W
        const current_5starPity_W = 80 - current_5star_W
         getLastPity_W = { 
          "5starPity_W" : current_5starPity_W, 
          "4starPity_W":  current_4starPity_W 
        };
      }
      else{
         getLastPity_W = { 
          "5starPity_W" : 0, 
          "4starPity_W" : 0 
        };
      }
      let getLastPity_P;
      const getpull_P = await prisma.wish_history.findMany({
        where: {
          gacha_type: 200,
          userID: user.userId
        },
        take: 90,
        orderBy: {
          id: 'desc'
        }
      });
      if (getpull_P.length !== 0) {
        const current_4star_P = await get4star(getpull_P)
        const current_5star_P = await get5star(getpull_P)
        const current_4starPity_P = 10 - current_4star_P
        const current_5starPity_P = 90 - current_5star_P
         getLastPity_P = { 
          "5starPity_P" : current_5starPity_P, 
          "4starPity_P" : current_4starPity_P 
        };
      }
      else{
         getLastPity_P = { 
          "5starPity_P" : 0, 
          "4starPity_P" : 0 
        };
      }
      // const charactersPulled = await prisma.wish_history.findMany({
      //   where: {
      //     userID: user.userId,
      //     gacha_type: {
      //       in: [301 , 400]
      //     },
      //   },
      //   distinct: ["name"],
      //   select: {
      //     name: true,
      //   },
      // });

      const charactersPulled = await prisma.wish_history.groupBy({
        by: ["name"],
        where: {
          userID: user.userId,
          gacha_type: {
            in: [301, 400, 302, 200]
          },
        },
        _count: {
          id: true,
        },
        orderBy:{
          _count: {
            id: "desc"
          }
        },
      })
      const totalpull_name:string[] = []
      const totalpull_count:number[] = []
      if (charactersPulled.length !== 0) {
      charactersPulled.forEach(element => {
        totalpull_count.push(element._count.id)
        totalpull_name.push(element.name)
      });
    }
	return { user , totalEventPull , totalWeaponPull , totalPermanentPull , 
    getLastPity_E , getLastPity_W , getLastPity_P ,  totalpull_name , totalpull_count  }
};

