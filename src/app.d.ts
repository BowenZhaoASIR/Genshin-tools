// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import { PrismaClient } from '@prisma/client'
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}
declare global {
	// namespace App{
	// // 	// interface error{}
	// 	interface Locals {
	// 		validate: import("@lucia-auth/sveltekit").Validate
	// 		validateUser: import("@lucia-auth/sveltekit").ValidateUser
	// 		setSession: import("@lucia-auth/sveltekit").SetSession
	// 	}
	// }

	/// <reference types="lucia-auth" />`
	declare namespace Lucia {
		type Auth = import('$lib/server/lucia.ts').Auth;
		type UserAttributes = {
			username: string;
		};
	}
	var __prisma: PrismaClient
	/// <reference types="@sveltejs/kit" />
	declare namespace App {
		interface Locals {
			auth: import("lucia-auth").AuthRequest
		}
	}
}
export {}