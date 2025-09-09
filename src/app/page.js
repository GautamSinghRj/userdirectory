import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Nav from "@/components/nav";


export default async function Home() {
  const res= await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5",{cache:"force-cache"});//no store for SSR
  const posts=await res.json();
  return (
    <>
    <Nav/>
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Card key={post.id} className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 line-clamp-3">{post.body}</p>
              <Link href={`/posts/${post.id}`} passHref>
                <Button className="mt-3">Read More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </>

  );
}


