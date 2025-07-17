"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout,setLoggedIn } from "../store/features/authSlice";

export default function Navbar() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/me")
            console.log("Auth check response:", res);
            dispatch(setLoggedIn(res.ok))
        }
        checkAuth();
    },[]);
    const handleLogout = async () => {
        await fetch("/api/auth/signout", { method: "POST" });
        dispatch(logout());
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
