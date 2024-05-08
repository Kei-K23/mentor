"use client";

import { Goal, Home, Medal, Store, User, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import ActionTooltip from "./action-tooltip";
import { useFooterCardStore } from "@/store/use-footer-card-store";
import AdsCard from "./ads-card";

type SideBarProps = {
  completedQuestsLength: number;
};

const SideBar = ({ completedQuestsLength }: SideBarProps) => {
  const pathname = usePathname();
  const { isOpen, close } = useFooterCardStore();

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
              <Goal className="h-6 w-6 " />
              Quests
              <Badge className="ml-auto">{completedQuestsLength}</Badge>
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
        {isOpen && <AdsCard />}
      </div>
    </div>
  );
};

export default SideBar;
