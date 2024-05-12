"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useUserProfileViewAvatarModalStore } from "@/store/use-user-profile-view-avatar-modal-store";
import { ScrollArea } from "../ui/scroll-area";

const ProfileViewAvatarModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close, userProfileViews } =
    useUserProfileViewAvatarModalStore();

  useEffect(() => setIsClient(true), []);

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-2">
            Users who viewed your profile
          </DialogTitle>
        </DialogHeader>
        {userProfileViews?.length ? (
          <ScrollArea className="max-h-[300px]">
            {userProfileViews.slice(0, 10).map((pv) => (
              <div key={pv.id}>
                <Link
                  href={`/profile/${pv.viewerId}`}
                  onClick={() => {
                    close();
                  }}
                  className="rounded-lg w-full flex items-center gap-x-2 py-3 px-5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-100 hover:dark:bg-slate-700"
                >
                  <Avatar className="bg-sky-500 h-10 w-10">
                    <AvatarImage
                      src={pv?.viewer?.imageUrl ?? "/robot.png"}
                      className="object-cover"
                    />
                  </Avatar>
                  <h2>{pv.viewer?.username}</h2>
                </Link>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <p className="text-center text-muted-foreground">No profile views.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileViewAvatarModal;
