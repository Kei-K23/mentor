"use client";
import React, { useEffect, useState } from "react";

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
  CommandList,
} from "@/components/ui/command";

import Image from "next/image";
import { useSearchUsersStore } from "@/store/use-search-users-store";
import { UserProgressWithUser } from "@/types";
import { Input } from "../ui/input";
import UserItem from "../user-item";

const SearchUserModal = () => {
  const [username, setUsername] = useState<string>();
  const { isOpen, close } = useSearchUsersStore();
  const [users, setUsers] = useState<UserProgressWithUser[]>();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users?name=${username}`);
      const data = await res.json();
      setUsers(data ?? []);
    })();
  }, [username, isOpen]);

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
          <Input
            placeholder="Search users..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <CommandList>
            <CommandGroup heading={`Users : ${users?.length}`}>
              {users?.length ? (
                users?.map((user, index) => (
                  <UserItem
                    key={user.id}
                    index={index}
                    userProgress={user}
                    onClose={close}
                    showUserRank={false}
                  />
                ))
              ) : (
                <CommandEmpty>No users found.</CommandEmpty>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchUserModal;
