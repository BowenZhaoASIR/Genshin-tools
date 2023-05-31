import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params, locals }) => {
  const { user } = await locals.auth.validateUser();
  const fetchName = async (/** @type {any} */ id) => {
    let name = id.replace("_", " ");
    const res = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${name}`);
    const data = await res.json();
    return data;
  };

  return {
    user,
    name: await fetchName(params.character_name),
  };
};
