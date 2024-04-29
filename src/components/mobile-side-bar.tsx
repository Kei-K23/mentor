"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { Goal, Home, Medal, Menu, Store } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileSideBar = () => {
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
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
