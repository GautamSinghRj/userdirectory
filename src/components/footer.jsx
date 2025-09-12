export default function Footer(){
    return(
        <footer className="mt-8 h-96 w-full bg-black text-white">
         <div className="pt-36 flex flex-row gap-96 justify-center items-center">
         <p className="text-5xl">
          My Blogs
        </p>
        <div className="flex flex-col gap-4">
        <a href="/" className="text-xl transition duration-75 ease-in-out hover:underline">
          Home 
        </a>
        <a href="/client-posts" className="text-xl transition duration-75 ease-in-out hover:underline">
          Client-posts
        </a>
        <a href="/post-by-id" className="text-xl transition duration-75 ease-in-out hover:underline">
          Posts-by-id
        </a>
        </div>
         </div>
         <p className="pt-24 text-center">© 2025 My Blog. All rights reserved.</p>
      </footer>
    );
}
