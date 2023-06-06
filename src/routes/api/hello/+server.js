//---------------------------test----------------------------
export const GET = async () => {
  try {
    const response = await fetch('https://api.genshin.dev/characters');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const responseBody = JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json',
    };
    return new Response(responseBody, { status: 200, headers });
  } catch (error) {
    console.error(error);
    const errorMessage = JSON.stringify({ message: 'Error' });
    return new Response(errorMessage, { status: 500 });
  }
};

