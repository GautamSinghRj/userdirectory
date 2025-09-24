let posts=[
    { id: 100, title: "Hello World", body: "This is my first post" },
    { id: 101, title: "Next.js Rocks", body: "Learning Next.js is fun!" },
];

export async function GET() {
    return Response.json(posts,{status:200});
}

export async function POST(req){
    const body = await req.json();
    const newPost ={id:Date.now(),...body}
    posts.push(newPost);
    return Response.json(newPost,{status:201})
}