import lucia from 'lucia-auth';
import { sveltekit } from 'lucia-auth/middleware';
import prisma from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client';

export const auth = lucia({
	adapter: prisma(new PrismaClient()),
	env: dev ? 'DEV' : 'PROD',
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			username: userData.username
		};
	},
	middleware: sveltekit()
});

export type Auth = typeof auth