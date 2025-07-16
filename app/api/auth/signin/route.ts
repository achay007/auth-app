import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export  async function POST(req: Request){

    const {email,password} = await req.json();
    if(!email || !password){
        return new Response("Invalid input", {status: 400});
    }
    const user = await db.select().from(users).where(eq(users.email, email));
    if(user.length === 0){
        return new Response("User does not exist", {status: 401});
    }   
    const existingUser = user[0];
    console.log("Existing user:", existingUser);
} 