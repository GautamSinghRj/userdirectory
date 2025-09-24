import Nav from "@/components/nav"
import { Card, CardContent } from "@/components/ui/card"
import CommentBox from "./comment-box"

export default async function PostPage({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
        cache: "no-store",
    })
    if (!res.ok) {
        throw new Error("Failed to fetch post")
    }
    const post = await res.json()

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

                        <CommentBox postId={post.id} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
