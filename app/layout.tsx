import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import { ReduxProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white"
      >
      <ReduxProvider>
        <Navbar />
        <main className="p-6">{children}</main>
      </ReduxProvider>
      </body>
    </html>
  );
}
