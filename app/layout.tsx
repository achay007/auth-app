import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white"
      >
        <Navbar />
       <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
