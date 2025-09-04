import Link from "next/link";

export default async function Home() {
  const res= await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return (
    <div className="p-5 font-serif">
      <h1 className="text-7xl text-center pb-4">User Directory</h1>
      <ul className="text-center pb-4">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`} className="text-2xl text-blue-500 hover:underline">
              {user.name} :-
            </Link>
            <Link href={`/users/${user.id}`} className="text-2xl text-blue-700 hover:underline ml-4">
            {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


