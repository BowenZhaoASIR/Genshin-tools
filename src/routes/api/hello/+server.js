export const GET = () => {
    return new Response(JSON.stringify({message: "hello world"}), {status: 200 })
}