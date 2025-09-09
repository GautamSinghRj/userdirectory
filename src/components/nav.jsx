export default function Nav(){
    return(
        <div className="container mx-auto p-6">
            <div className="flex flex-row border-2 border-black"></div>
            <a href="/">Home</a>
            <a href="/client-posts">Client-Posts</a>
            <a href="/post-by-id">Post-by-Id</a>
        </div>
    );
}