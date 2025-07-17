import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";

export default function AuthPage() {
  const user = getAuthUser();
  if (user!== null) redirect("/home");

  return (
    <div> {/* your auth tabs here */} </div>
  );
}
