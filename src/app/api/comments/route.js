import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route" // adjust path if needed
import prisma from "@/lib/prisma" // notice: default export, not destructured

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await req.json()
        const { content, postId } = body

        if (!content || !postId) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 })
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId: session.user.id, // ✅ taken from logged-in user
            },
            include: { User: true },
        })

        return NextResponse.json(comment)
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get("postId")

    if (!postId) {
        return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
    }

    const comments = await prisma.comment.findMany({
        where: { postId },
        include: { User: true },
        orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(comments)
}
