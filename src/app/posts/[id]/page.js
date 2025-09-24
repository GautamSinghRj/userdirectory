"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function CommentBox({ postId }) {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchComments() {
            try {
                const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                if (!res.ok) throw new Error("Failed to fetch comments")
                const data = await res.json()
                setComments(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchComments()
    }, [postId])

    if (loading) return <p className="mt-4 text-gray-500">Loading comments...</p>
    if (error) return <p className="mt-4 text-red-500">Error: {error}</p>

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            {comments.map((comment) => (
                <Card key={comment.id} className="mb-3">
                    <CardContent className="p-4">
                        <p className="font-medium">{comment.name}</p>
                        <p className="text-sm text-gray-600">{comment.email}</p>
                        <p className="mt-2">{comment.body}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
