import { ModeToggle } from "@/components/mode-toggle";
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
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b border-b-slate-200 dark:border-b-slate-700 h-14 z-50">
      <nav className="px-5 lg:max-w-screen-lg mx-auto h-full flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/icon.png"} alt="icon image" width={36} height={36} />
          <h1 className="font-bold text-sky-500">Mentor</h1>
        </Link>

        <div>
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
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
