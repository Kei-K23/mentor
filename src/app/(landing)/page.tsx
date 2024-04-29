import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
import { Loader, LogInIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex-1 h-full max-w-[980px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 p-4">
      <div className="flex flex-col items-center justify-center gap-y-5">
        <p className="text-xl lg:text-2xl text-center max-w-[690px]">
          Learn, Practice and Master Programming Languages and Craft interview
          questions with <span className="font-bold text-sky-500">Mentor</span>{" "}
          🚀.
        </p>
        <ClerkLoading>
          <Button>
            <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
          </Button>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <Link
              href={"/learn"}
              className={cn(
                buttonVariants({ variant: "default" }),
                "text-base lg:text-lg"
              )}
            >
              Continue Learning
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="text-base lg:text-lg">
                <LogInIcon className="w-5 h-5 mr-2" /> Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
      <div className="grid grid-cols-12 gap-4 lg:gap-8">
        <div className="col-span-6 relative h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]">
          <Image src={"/img1.png"} alt="image" fill />
        </div>
        <div className="col-span-6 relative h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]">
          <Image src={"/img2.png"} alt="image" fill />
        </div>
        <div className="col-span-6 relative h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]">
          <Image src={"/img3.png"} alt="image" fill />
        </div>
        <div className="col-span-6 relative h-[120px] w-[120px] lg:h-[160px] lg:w-[160px]">
          <Image src={"/img4.png"} alt="image" fill />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
