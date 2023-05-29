export function load({ fetch , params }) {
  const fetchName = async (/** @type {any} */  id) =>{
    let name = id.replace("_"," ")
    const res = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${name}`);
    const data = await res.json();
    return data;
  }
  return {
    name : fetchName(params.character_name)
  }
}
export const prerender = false;

