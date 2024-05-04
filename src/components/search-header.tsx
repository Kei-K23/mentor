"use client";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useSearchUsersStore } from "@/store/use-search-users-store";

const SearchHeader = () => {
  const { open } = useSearchUsersStore();
  return (
    <>
      <Button onClick={open}>
        <Search className="w-5 h-5" />
      </Button>
    </>
  );
};

export default SearchHeader;
