import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request){

    try{

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

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if(!passwordMatch){
        return new Response("Invalid password", {status: 401});
    }
    const token  = jwt.sign(
        {id: existingUser.id, email: existingUser.email},
        process.env.JWT_SECRET!,
        {expiresIn: "7d"}
    );
    console.log("Token generated:", token);
const cookie = `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
const res = new Response(JSON.stringify({token, user: existingUser}), {
    status: 200,
    headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json"
    }
});

return res;
    }catch (error) {
        
        return new Response("Internal server error", {status: 500});
    }
;} 