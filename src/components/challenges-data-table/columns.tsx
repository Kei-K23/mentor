"use client";

import { cn } from "@/lib/utils";
import { ChallengeWithChallengeProgress } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon } from "lucide-react";
import Link from "next/link";
import CommentSheet from "../comment-sheet";

export const columns: ColumnDef<ChallengeWithChallengeProgress>[] = [
  {
    accessorKey: "status",
    header: "Status",
    // TODO : check to make sure status condition is work without user id
    cell: ({ row }) => {
      return (
        <div>
          {row.original.challengeProgress?.some(
            (cp) => cp.challengeId === row.original.id && cp.completed
          ) ? (
            <CircleCheckBigIcon className="w-5 h-5 text-emerald-600 stroke-[3]" />
          ) : (
            ""
          )}{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href={`/challenges/${row.original.id}`}
          className="text-base font-semibold hover:text-sky-500"
        >
          {row.original.id}. {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
    cell: ({ row }) => {
      return (
        <div>
          <p
            className={cn(
              "font-bold",
              row.original.difficulty === "EASY" && "text-emerald-600",
              row.original.difficulty === "MEDIUM" && "text-yellow-500",
              row.original.difficulty === "HARD" && "text-rose-600"
            )}
          >
            {row.original.difficulty}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return <CommentSheet challengeId={id} />;
    },
  },
];
