"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CommentBox({ postId }) {
    const { data: session } = useSession()
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])

    useEffect(() => {
        async function loadComments() {
            const res = await fetch("/api/comments")
            if (res.ok) {
                const data = await res.json()
                setComments(data.filter((c) => c.postId == postId))
            }
        }
        loadComments()
    }, [postId])

    async function handleAddComment() {
        if (!newComment.trim()) return
        if (!session) {
            alert("You must be logged in to comment.")
            return
        }

        const res = await fetch("/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: newComment, postId: String(postId) }),
        })

        if (res.ok) {
            const added = await res.json()
            setComments((prev) => [...prev, added])
            setNewComment("")
        }
    }

    return (
        <div className="mt-6">
            {session ? (
                <div className="flex gap-2 mb-4">
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
                    className="mb-4"
                    onClick={() => signIn("google")}
                >
                    Sign in with Google to comment
                </Button>
            )}

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
        </div>
    )
}
