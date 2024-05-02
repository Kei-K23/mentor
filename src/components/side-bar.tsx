"use client";

import { Bell, Goal, Home, Medal, Store, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <div className=" hidden border-r bg-muted/40 md:block">
      <div className="sticky top-0 flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/learn" className="flex items-center gap-2 font-semibold">
            <Image src={"/icon.png"} alt="icon image" width={32} height={32} />
            <span>Mentor</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/learn"
              className={cn(
                "text-base flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/learn" && "bg-muted text-primary"
              )}
            >
              <Home className="h-6 w-6" />
              Learn
            </Link>
            <Link
              href="/leaderboard"
              className={cn(
                "text-base flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/leaderboard" && "bg-muted text-primary"
              )}
            >
              <Medal className="h-6 w-6" />
              Leader Board
            </Link>
            <Link
              href="/quests"
              className={cn(
                "text-base flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/quests" && "bg-muted text-primary"
              )}
            >
              <Goal className="h-6 w-6" />
              Quests
            </Link>
            <Link
              href="/shop"
              className={cn(
                "text-base flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/shop" && "bg-muted text-primary"
              )}
            >
              <Store className="h-6 w-6" />
              Shop
            </Link>
            <Link
              href="/profile"
              className={cn(
                "text-base flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/profile" && "bg-muted text-primary"
              )}
            >
              <User className="h-6 w-6" />
              Profile
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
