// -----------------ver.2--------------------
import { redirect } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { auth } from "$lib/server/lucia";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
  const user = await locals.auth.validate();
  if (user) {
    await prisma.wish_history.deleteMany({
      where: {
        userID: user.userId,
      },
    });

    await auth.deleteUser(user.userId);
  }
  throw redirect(302, "/");
};


// ---------------ver.1--------------------
// import { redirect } from "@sveltejs/kit";
// import { prisma } from "$lib/server/prisma";
// import { auth } from '$lib/server/lucia';
// import type { RequestHandler } from "./$types"

// export const POST: RequestHandler = async ({ locals }) => {
//   const session = await locals.auth.validate();
//   if (session) {
//     const deleteAll = await prisma.wish_history.deleteMany({
//       where: {
//         userID: session?.userId
//       },
//     });
//     if (deleteAll) {
//       auth.deleteUser(session.userId);
//     }
//     await auth.invalidateSession(session.sessionId)
//     locals.auth.setSession(null)
//     throw redirect(302, "/")
//   }
//   else {
//     throw redirect(302, "/")
//   }
// }





	
