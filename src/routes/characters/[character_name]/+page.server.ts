import type { PageServerLoad } from "./$types";
export const prerender = false;
export const load: PageServerLoad = async ({ fetch, params, locals }) => {
  const fetchName = async (/** @type {any} */ id) => {
    let name = id.replace("_", " ");
    const res = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${name}`);
    const data = await res.json();
    return data;
  };
  const { user } = await locals.auth.validateUser();

  return {
    user,
    name: await fetchName(params.character_name),
  };
};
