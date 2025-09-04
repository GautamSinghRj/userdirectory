export default async function UserDetails({params}) 
{
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const user = await res.json();
    return (
    <div className="p-5 font-serif">
        <h1 className="text-6xl text-center pb-4">{user.name}</h1>
        <p className="text-4xl text-center pb-4">{user.email}</p>
        <p className="text-2xl text-center pb-4">{user.phone}</p>
        <p className="text-2xl text-center pb-4">{user.website}</p>
        <p className="text-2xl text-center pb-4">{user.company.name}</p>
        <p className="text-2xl text-center pb-4">{user.address.city}, {user.address.street}</p>
    </div>
    );
}