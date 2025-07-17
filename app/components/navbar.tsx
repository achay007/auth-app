"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/me")
            console.log("Auth check response:", res);
            setIsLoggedIn(res.ok)
        }
        checkAuth();
    },[])
    const handleLogout = async () => {
        await fetch("/api/auth/signout", { method: "POST" });
        setIsLoggedIn(false);
        router.push("/auth");
    };
    
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow">
      <Link href="/" className="text-xl font-semibold text-white">
        MyApp
      </Link>
      
        {isLoggedIn ? (
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
            Logout
            </Button>
        ) : (
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Sign In - Sign Up
            </Link>
        )}
    </nav>
  );
}
