"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { Goal, Home, Medal, Menu, Store, User } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

type MobileSideBarProps = {
  completedQuestsLength: number;
};

const MobileSideBar = ({ completedQuestsLength }: MobileSideBarProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Image src={"/icon.png"} alt="icon image" width={32} height={32} />
            <span>Mentor</span>
          </Link>
          <Link
            href="/learn"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/learn" && "bg-muted text-foreground"
            )}
          >
            <Home className="h-6 w-6" />
            Learn
          </Link>
          <Link
            href="/leaderboard"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/leaderboard" && "bg-muted text-foreground"
            )}
          >
            <Medal className="h-6 w-6" />
            Leader Board
          </Link>
          <Link
            href="/quests"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/quests" && "bg-muted text-foreground"
            )}
          >
            <Goal className="h-6 w-6" />
            Quests
            <Badge className="ml-auto">{completedQuestsLength}</Badge>
          </Link>
          <Link
            href="/shop"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/shop" && "bg-muted text-foreground"
            )}
          >
            <Store className="h-6 w-6" />
            Shop
          </Link>
          <Link
            href="/profile"
            className={cn(
              "mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground",
              pathname === "/profile" && "bg-muted text-foreground"
            )}
          >
            <User className="h-6 w-6" />
            Profile
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
