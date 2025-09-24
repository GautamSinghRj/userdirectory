"use client"

import { useState } from "react"
import { useSession, signIn } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CommentBox({ postId }) {
    const { data: session } = useSession()
    const [newComment, setNewComment] = useState("")

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

        if (!res.ok) {
            alert("Failed to add comment")
            return
        }

        setNewComment("")
    }

    return session ? (
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
    )
}
