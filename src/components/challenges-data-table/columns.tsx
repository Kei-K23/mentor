"use client";

import { ChallengeWithChallengeProgress } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheckBigIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ChallengeWithChallengeProgress>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // TODO: change with icon
      return (
        <div>
          {row.original.id === row.original.challengeProgress?.challengeId ? (
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
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "difficulty",
    header: "Difficulty",
  },
];
