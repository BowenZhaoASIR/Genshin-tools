//---------------------------test----------------------------
export const GET = async () => {
  try {
    const response = await fetch('https://api.genshin.dev/characters');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      body: JSON.stringify(data),
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      body: JSON.stringify({ message: 'Error' }),
      status: 500,
    };
  }
};
