import List from "@/compo/list";


export default async function Home() {
  const res= await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();
  return (
    <div className="font-serif">
      <List users={users} />
    </div>
  );
}


