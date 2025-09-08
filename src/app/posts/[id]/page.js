import { Card, CardContent } from "@/components/ui/card"

export async function generateMetadata({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()
  
    return {
      title: `${post.title} | My Blog`,
      description: post.body.slice(0, 100),
    }
}

export default async function PostPage({params}){
    const res=await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
    const post = await res.json();

    return(
        <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-700 leading-relaxed">{post.body}</p>
          </CardContent>
        </Card>
      </div>
    );
}