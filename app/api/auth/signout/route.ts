// app/api/auth/signout/route.ts

import { NextResponse } from "next/server";

export async function POST() {
  const res = new NextResponse("Signed out", { status: 200 });
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
  return res;
}
