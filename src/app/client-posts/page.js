"use client"
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card"

const caller=(url)=>fetch(url).then((res)=>res.json());

export default function ClientPosts(){
    const {data,error}=useSWR("api/posts",caller);

  if (error) return <div className="text-red-500">Failed to load</div>
  if (!data) return <div className="text-gray-500">Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Client-side Posts</h1>
      <div className="space-y-4">
        {data.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}