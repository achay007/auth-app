// components/auth-form.tsx
"use client";
import React, { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/features/authSlice";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { school } from "../db/schema";
//import { school } from "@/app/db/schema"; // Adjust the import path as per your schema
type school = {
  id: string;
  schoolName: string;
  phone: string;
};

type Props = {
  type: "signin" | "signup";
};

export default function AuthForm({ type }: Props) {
  const isSignIn = type === "signin";

    const [schools, setSchools] = useState<school[]>([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState<string>("");
    const [role, setRole] = useState<string>("student");

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [image,setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");

    const roles = ["teacher", "parent", "student"];

    const router = useRouter();
    const dispatch = useDispatch();

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
                    schoolId: selectedSchoolId,
                    role,
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
                    router.push("/home");
                    dispatch(setLoggedIn(true));
                }
                if (type === "signup") {
                    // Handle sign-in success (e.g., redirect or show a message)
                    console.log("Sign-up successful:", data);
                    router.push("/home");
                    dispatch(setLoggedIn(true));
                }
            }

        }catch(err) {
            console.error(err);
            setError("An error occurred. Please try again.");
        }finally{
            setLoading(false)
        }
    }
  useEffect(() => {
      const fetchSchools = async () => {
      const res = await fetch("/api/school");
      const data = await res.json();
      setSchools(data);
    };
    fetchSchools();
  }, []);

  return (
    <form className="space-y-4 mt-4">
      {!isSignIn && <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />}

      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
      <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required />
      {!isSignIn && <div className="flex justify-self-start gap-3 text-center"><Select  onValueChange={(value) => setSelectedSchoolId(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Choose school..." />
        </SelectTrigger>
        <SelectContent>
          {schools.map((school) => (
            <SelectItem key={school.id} value={school.id}>
              {school.schoolName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
       <Select onValueChange={(value) => setRole(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select Role" />
  </SelectTrigger>
  <SelectContent>
    {roles.map((r) => (
      <SelectItem key={r} value={r}>
        {r.charAt(0).toUpperCase() + r.slice(1)}
      </SelectItem>
    ))}
  </SelectContent>
</Select></div>
  }
       {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
        {loading ? 'Processing..' : isSignIn ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}
