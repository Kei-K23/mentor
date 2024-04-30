"use client";

import { Challenge } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Challenge>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "question",
    header: "Question",
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
