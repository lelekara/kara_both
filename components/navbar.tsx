import { Camera } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <Camera className="h-6 w-6"/>
            <span className="font-bold text-lg">KaraBooth</span>
        </Link>



        <div className="flex gap-4">
          <Link href="/sign-in" className="text-blue-500 hover:underline">Sign In</Link>
          <Link href="/sign-up" className="text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
