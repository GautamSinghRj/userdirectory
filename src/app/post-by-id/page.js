"use client"
import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Nav from "@/components/nav"
import Footer from "@/components/footer"

export default function PostByIdPage() {
  const { data: session } = useSession() // ✅ get Google OAuth session
  const [id, setId] = useState("")
  const [post, setPost] = useState(null)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  async function fetchPost() {
    try {
      setError(null)
      setPost(null)
      const res = await fetch(`/api/posts/${id}`)
      if (!res.ok) throw new Error("Post not found")
      const data = await res.json()
      setPost(data)
      fetchComments(data.id)
    } catch (err) {
      setError(err.message)
    }
  }

  async function fetchComments(postId) {
    const res = await fetch(`/api/comments?postId=${postId}`)
    const data = await res.json()
    setComments(data)
  }

  async function handleAddComment() {
    if (!newComment.trim()) return
    if (!session) {
      alert("You must be logged in to comment.")
      return
    }

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: newComment,
        postId: String(post.id),
      }),
    })

    if (res.ok) {
      setNewComment("")
      fetchComments(post.id)
    }
  }

  return (
      <>
        <Nav />
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

                  {/* Comments section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Comments</h3>
                    {comments.length === 0 && <p>No comments yet.</p>}
                    <ul className="space-y-2">
                      {comments.map((c) => (
                          <li key={c.id} className="border p-2 rounded">
                            <p className="text-sm">{c.content}</p>
                            <span className="text-xs text-gray-500">
                        by {c.User?.name || "Anonymous"}
                      </span>
                          </li>
                      ))}
                    </ul>

                    {session ? (
                        <div className="mt-4 flex gap-2">
                          <Input
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                          />
                          <Button onClick={handleAddComment}>Post</Button>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => signIn("google")}
                        >
                          Sign in with Google to comment
                        </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
          )}
        </div>
        <Footer />
      </>
  )
}
