import Navbar from "@/components/Navbar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export default async function Nav() {
  const session = await getServerSession(authOptions);

  return <Navbar user={session?.user} />;
}