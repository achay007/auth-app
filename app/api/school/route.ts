import { NextResponse } from "next/server";
import { db } from "@/app/db"; // your Neon DB client
import { school } from "@/app/db/schema"; // Adjust the import path as per your schema

export async function GET() {
  try {
    const result = await db.select().from(school); // Adjust the table name as per your schema
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
