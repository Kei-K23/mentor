"use client";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSearchUsersStore } from "@/store/use-search-users-store";
import ActionTooltip from "./action-tooltip";

const SearchHeader = () => {
  const { open } = useSearchUsersStore();
  return (
    <>
      <ActionTooltip text="Search users" side="bottom">
        <Button onClick={open} variant={"ghost"}>
          <Search className="w-5 h-5" />
        </Button>
      </ActionTooltip>
    </>
  );
};

export default SearchHeader;
