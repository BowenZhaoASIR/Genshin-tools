import { writable } from 'svelte/store';

export const wish_history = writable([]);
export const banner_name = writable('');
export const status = writable(false);