"use client";

import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { UserProgressWithCourse } from "@/types";
import { BarChartBig, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useSearchUsersStore } from "@/store/use-search-users-store";
import Link from "next/link";
import Image from "next/image";

type MainLayoutResponsiveHeaderProps = {
  userProgress: UserProgressWithCourse;
};

const MainLayoutResponsiveHeader = ({
  userProgress,
}: MainLayoutResponsiveHeaderProps) => {
  const { open } = useSearchUsersStore();

  return (
    <Menubar className="block md:hidden">
      <MenubarMenu>
        <MenubarTrigger className="block md:hidden">
          <BarChartBig className="w-4 h-4" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem className="w-full">
            <Button
              onClick={open}
              variant={"ghost"}
              className="flex items-center justify-between  w-full "
            >
              <Search className="w-5 h-5 text-muted-foreground mr-2" />
              Search users
            </Button>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="w-full">
            <Link href={"/courses"} className="w-full">
              <Button
                size={"sm"}
                variant={"ghost"}
                className="flex items-center justify-between  w-full "
              >
                <Image
                  src={userProgress.course?.imageUrl!}
                  alt={userProgress.course?.title}
                  className="rounded-md border"
                  width={32}
                  height={32}
                />
                {userProgress.course?.title}
              </Button>
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="w-full">
            <Link href={"/shop"} className="w-full">
              <Button
                size={"sm"}
                variant={"ghost"}
                className="flex items-center justify-between  w-full "
              >
                <Image
                  src={"/points.svg"}
                  alt="points"
                  width={28}
                  height={28}
                />
                {userProgress?.points} xp
              </Button>
            </Link>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="w-full">
            <Link href={"/shop"} className="w-full">
              <Button
                size={"sm"}
                variant={"ghost"}
                className="flex items-center justify-between  w-full"
              >
                <Image src={"/heart.svg"} alt="heart" width={28} height={28} />
                {userProgress?.hearts}
              </Button>
            </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MainLayoutResponsiveHeader;
