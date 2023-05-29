/*export function load({ fetch , params }) {
    /*const fetchName = async (/** @type {any} */ /* id) =>{
      const res = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${id}`);
      const data = await res.json();
      const char_name = data.name;
      if (char_name.includes(" ")) {
        return char_name.replace(" ","_")
      }
      return char_name;
      return data;
    }
    return {
      name : fetchName(params.character_name)
    }
  }
  */