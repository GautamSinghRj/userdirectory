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

            <div className="space-y-2">
                {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
                {comments.map((c) => (
                    <div
                        key={c.id}
                        className="p-3 rounded-md border border-gray-200 bg-gray-50"
                    >
                        {c.content}
                    </div>
                ))}
            </div>
        </div>
    )
}
