import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader, LogInIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b border-b-slate-200 h-14 z-50">
      <nav className="px-5 lg:max-w-screen-lg mx-auto h-full flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-3">
          <h1 className="font-bold text-emerald-600">Mentor</h1>
        </Link>

        <ClerkLoading>
          <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant={"ghost"}>
                <LogInIcon className="w-5 h-5 mr-2" /> Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </nav>
    </header>
  );
};

export default Header;
