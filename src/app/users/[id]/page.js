import Details from "@/compo/userdetails";
export default async function UserDetails({params}) 
{
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
    const user = await res.json();
    return (
    <div>
        <Details user={user} />
    </div>
    );
}