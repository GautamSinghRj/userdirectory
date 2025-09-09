"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Nav from "@/components/nav"

export default function PostByIdPage() {
  const [id, setId] = useState("")
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)

  async function fetchPost() {
    try {
      setError(null)
      setPost(null)
      const res = await fetch(`/api/posts/${id}`)
      if (!res.ok) {
        throw new Error("Post not found")
      }
      const data = await res.json()
      setPost(data)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
    <Nav/>
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Find Post by ID</h1>

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Enter post ID (e.g. 1)"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-40"
        />
        <Button onClick={fetchPost}>Search</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {post && (
        <Card>
          <CardContent className="p-4">
          <img
                  src={`https://picsum.photos/seed/${post.id}/600/300`}
                  alt="Random post illustration"
                  className="w-full h-96 object-cover rounded-md mb-3"
                />
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  )
}
