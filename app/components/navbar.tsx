// components/navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 shadow">
      <Link href="/" className="text-xl font-semibold text-white">
        MyApp
      </Link>
      <Link
        href="/auth"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Sign In - Sign Up
      </Link>
    </nav>
  );
}
