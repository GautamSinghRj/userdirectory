import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "@/components/ui/card"
  import Link from "next/link";

export default function List({users}) {
    return (
        <Card className="transform translate-x-3/4 translate-y-2/12 w-3xl bg-[#FFFF00]">
        <CardHeader className="text-[#000080] text-7xl text-center pb-4">User Directory</CardHeader>
        <CardContent className="text-center font-serif">
          {users.map((user) => (
            <CardDescription className=" pb-4 hover:underline" key={user.id}>
              <Link href={`/users/${user.id}`} className="text-2xl text-[#000080] ">
                {user.name} :-
              </Link>
              <Link href={`/users/${user.id}`} className="text-2xl text-[#000080] ml-4">
              {user.email}
              </Link>
            </CardDescription>
          ))}
        </CardContent>
        </Card>
    );  
}
