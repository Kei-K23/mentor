"use client";

import { cn } from "@/lib/utils";
import { UserProgressWithUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import ActionTooltip from "../action-tooltip";
import Image from "next/image";

export const columns: ColumnDef<UserProgressWithUser>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      return (
        <p
          className={cn(
            "font-bold  mr-2",
            row.index < 3 && "animate-bounce text-xl",
            row.index === 0 && "text-rose-500",
            row.index === 1 && "text-sky-600",
            row.index === 2 && "text-emerald-600"
          )}
        >
          {row.index + 1}
        </p>
      );
    },
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-1">
          <Avatar className="bg-sky-500 h-12 w-12 ml-3 mr-5">
            <AvatarImage
              src={row.original.user?.imageUrl ?? "/robot.png"}
              className="object-cover"
            />
          </Avatar>
          <ActionTooltip text="View profile">
            <Link
              href={`/profile/${row.original.user.externalUserId}`}
              className="font-bold text-slate-800 truncate dark:text-slate-200 flex-1 hover:text-sky-500 dark:hover:text-sky-500"
            >
              {row.original.user.username}
            </Link>
          </ActionTooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "points",
    header: "Points",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-1">
          <Image src={"/points.svg"} alt="points" height={25} width={25} />
          <p className="text-muted-foreground">{row.original.points} XP</p>
        </div>
      );
    },
  },
];
