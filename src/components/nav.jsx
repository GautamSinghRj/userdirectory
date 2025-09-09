export default function Nav(){
    return(
        <div className="container mx-auto p-6 border border-black">
            <div className="flex flex-row justify-center items-center gap-10">
            <a href="/">Home</a>
            <a href="/client-posts">Client-Posts</a>
            <a href="/post-by-id">Post-by-Id</a>
            </div>
        </div>
    );
}