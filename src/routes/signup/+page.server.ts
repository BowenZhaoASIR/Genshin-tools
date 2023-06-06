import { auth } from '$lib/server/lucia';
import { fail, type Actions } from '@sveltejs/kit';
import { Prisma } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia-auth';
import type { PageServerLoad } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
		const confirm = form.get('confirm');
		if (!username || !password || typeof username !== 'string' || typeof password !== 'string' || typeof confirm !== 'string') {
			return fail(400, {
				message: 'Invalid input'
			});
			if ( password != confirm ){
			return fail(400, {
				message: 'password dont match'
			});	
			}
		}
		try {
			const user = await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password
				},
				attributes: {
					username
				}
			});
			const session = await auth.createSession(user.userId);
			locals.auth.setSession(session);
		} catch (error) {
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === 'P2002' &&
				error.message?.includes('username')
			) {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			if (error instanceof LuciaError && error.message === 'AUTH_DUPLICATE_KEY_ID') {
				return fail(400, {
					message: 'Username already in use'
				});
			}
			console.error(error);
			return fail(500, {
				message: 'Unknown error occurred'
			});
		}
	}
};

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/');
	return {};
};

// import { auth } from "$lib/server/lucia"
// import { fail, redirect } from "@sveltejs/kit"
// import type { Actions, PageServerLoad } from "./$types"


// export const load: PageServerLoad = async ({ locals }) => {
// 	const session = await locals.validate();
// 	if (session) throw redirect(302, '/');
// 	return {};
// };

// export const actions: Actions = {
//    default: async ({ request }) => {
//       const { username , password , confirm } = Object.fromEntries(
//          await request.formData()
//       ) as { 
//          name: string
//          username: string
//          password: string
//          confirm: string
//       }
//       if (password === confirm){
//          console.log("ok"); 
//          try {
//             await auth.createUser({
//                primaryKey:{
//                   providerId: "username",
//                   providerUserId: username,
//                   password,
//                },
//                attributes: {
//                   username
//                }
//             })
//          } catch (err) {
//             console.log(err)
//             return fail(400,  {message: 'Register failed'})
//          }
//          throw redirect(302 , "/login")
//       }
//       else{
//          return fail(500 , {message: "password introduce is not the same"})
//       }
//    }
// }
