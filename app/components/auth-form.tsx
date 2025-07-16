// components/auth-form.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  type: "signin" | "signup";
};

export default function AuthForm({ type }: Props) {
  const isSignIn = type === "signin";

  
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true);
        setError("");

        try{
            const res = await fetch(`/api/auth/${type}`,{
                method:"POST",
                body: JSON.stringify({
                    email,
                    password,
                    name,
                })
            });
            if(!res.ok){
                const msg = await res.text();
                setError(msg || "Something went wrong");
            }else{
                const data = await res.json();
                console.log("Response data:", data);
                if (type === "signin") {
                    // Handle sign-in success (e.g., redirect or show a message)
                    console.log("Sign-in successful:", data);
                }

            }

        }catch(err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }finally{
            setLoading(false)
        }
    }

  return (
    <form className="space-y-4 mt-4">
      {!isSignIn && <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />}

      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
      <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required />

       {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
        {loading ? 'Processing..' : isSignIn ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}
