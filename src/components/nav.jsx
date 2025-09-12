'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button"

export default function Nav(){
    const { data: session } = useSession();
    return(
        <div className="container mx-auto p-4 border rounded-full bg-white my-4">
            <div className="flex flex-row justify-center items-center gap-10">
            <a href="/" className="font-bold transition duration-75 ease-in-out hover:underline">Home</a>
            <a href="/client-posts" className="font-bold transition duration-75 ease-in-out hover:underline">Client-Posts</a>
            <a href="/post-by-id" className="font-bold transition duration-75 ease-in-out hover:underline">Post-by-Id</a>
            {session ? (
          <Button onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in with Google</Button>
        )}
            </div>
        </div>
    );
}