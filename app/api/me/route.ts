// app/api/me/route.ts
import { getAuthUser } from "@/lib/auth"; // your cookie/JWT decoding helper

export async function GET() {
  const user = await getAuthUser(); // e.g., decode cookie

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json(user);
}
