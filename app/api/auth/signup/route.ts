import { db } from "@/app/db";
import {users} from "@/app/db/schema";
import {eq} from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request){
    const {email,password,name,schoolId,role} = await req.json();
    if(!email || !schoolId || !role || !password || (name && name.length < 3)){
        return new Response("Invalid input", {status: 400});
    }
    const existingUser = await db.select().from(users).where(eq(users.email, email))
    if(existingUser.length > 0){
        return new Response("User already exists", {status: 401});
    }

    const today = new Date().toISOString().split("T")[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        email,
        password: hashedPassword,
        name,
        role,
        // Assuming schoolId is a string that matches the id in the school table
        // If school is a foreign key, ensure it matches the type in your schema
        school:schoolId,
        image: "",
        createdAt: today,
        updatedAt: today,
    };
    const [createdUser] = await db.insert(users).values(newUser)
    .returning();
    console.log("User created:", createdUser);
    return new Response(JSON.stringify({message: "User created"}), {status: 201}) 
}

