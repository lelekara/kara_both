import { Camera, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NavBar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="bg-gradient-to-r from-orange-50 via-white to-pink-50 border-b px-4 shadow-sm">
      <div className="flex items-center justify-between mx-auto max-w-5xl h-16">
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
 
            <Camera className="h-7 w-7" />

          <span className="font-extrabold text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition-all">
            KaraBooth
          </span>
        </Link>
        <div className="flex gap-3">
          {session ? (
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/sign-in");
              }}
              className="flex gap-3"
            >
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-2 text-base font-semibold text-white shadow-lg hover:scale-105 transition-transform
                  sm:px-5 sm:py-2
                  px-3 py-1 text-sm
                "
              >
                Dashboard
              </Link>
              <Button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition-transform
                  sm:px-5 sm:py-2
                  px-3 py-1 text-sm
                "
              >
                <LogOut className="h-5 w-5" />
                Déconnexion
              </Button>
            </form>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center rounded-xl border-2 border-orange-200 bg-white px-5 py-2 text-base font-semibold text-orange-500 shadow hover:bg-orange-50 hover:scale-105 transition-transform"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
