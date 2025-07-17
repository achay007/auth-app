import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function getAuthUser(){
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if(!token || !JWT_SECRET){
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded
    }catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
    
}

