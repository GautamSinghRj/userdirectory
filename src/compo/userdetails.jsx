import {
    Card,
    CardContent,
    CardHeader
  } from "@/components/ui/card"

export default function Details({user}) {
    return (
    <Card className="transform translate-x-3/4 translate-y-2/12 font-serif w-3xl bg-[#FFFF00]">
        <CardHeader className="text-6xl text-center pb-4 text-[#000080] ">{user.name}</CardHeader>
        <CardContent className="text-4xl text-center pb-4 text-[#000080] ">{user.email}</CardContent>
        <CardContent className="text-2xl text-center pb-4 text-[#000080] ">{user.phone}</CardContent>
        <CardContent className="text-2xl text-center pb-4 text-[#000080] ">{user.website}</CardContent>
        <CardContent className="text-2xl text-center pb-4 text-[#000080] ">{user.company.name}</CardContent>
        <CardContent className="text-2xl text-center pb-4 text-[#000080] ">{user.address.city}, {user.address.street}</CardContent>
    </Card>
    );
}