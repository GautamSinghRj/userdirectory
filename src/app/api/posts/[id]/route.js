let posts = [
    { id: 1, title: "Hello World", body: "This is my first post" },
    { id: 2, title: "Next.js Rocks", body: "Learning Next.js is fun!" },
  ]
  
  export async function GET(req, { params }) {
    const post = posts.find(p => p.id === Number(params.id))
    if (!post) {
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 })
    }
    return Response.json(post)
  }
  