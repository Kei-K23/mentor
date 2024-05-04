"use client";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSearchUsersStore } from "@/store/use-search-users-store";

const SearchUserModal = () => {
  const router = useRouter();

  const { isOpen, close } = useSearchUsersStore();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image
              src={"/search.png"}
              alt="search image"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center mb-2">
            Search other users in the community.
          </DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Users">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserModal;
