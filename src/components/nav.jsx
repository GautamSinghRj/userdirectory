export default function Nav(){
    return(
        <div className="container mx-auto p-6 border-2 border-dashed rounded-3xl border-slate-400 bg-gray-100 my-4">
            <div className="flex flex-row justify-center items-center gap-10">
            <a href="/" className="font-bold transition duration-75 ease-in-out hover:underline">Home</a>
            <a href="/client-posts" className="font-bold transition duration-75 ease-in-out hover:underline">Client-Posts</a>
            <a href="/post-by-id" className="font-bold transition duration-75 ease-in-out hover:underline">Post-by-Id</a>
            </div>
        </div>
    );
}