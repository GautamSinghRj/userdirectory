"use client"

import { useEffect, useState } from "react"
import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PostPage({ params }) {
    const { data: session } = useSession()
    const [post, setPost] = useState(null)
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])


    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
            const data = await res.json()
            setPost(data)
        }
        fetchPost()
    }, [params.id])

    async function fetchComments(postId) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
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

    if (!post) return <div>Loading...</div>

    return (
        <>
            <Nav />
            <div className="container mx-auto p-6">
                <Card>
                    <CardContent className="p-6">
                        <img
                            src={`https://picsum.photos/seed/${post.id}/600/300`}
                            alt="Random post illustration"
                            className="w-full h-96 object-cover rounded-md mb-3"
                        />
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <p className="text-gray-700 leading-relaxed">{post.body}</p>

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
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
