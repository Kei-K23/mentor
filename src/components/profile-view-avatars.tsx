"use client";

import { UserProfileViewWithViewers } from "@/types";
import React from "react";
import ActionTooltip from "./action-tooltip";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useUserProfileViewAvatarModalStore } from "@/store/use-user-profile-view-avatar-modal-store";
import { MoreHorizontal } from "lucide-react";

type ProfileViewAvatarsProps = {
  userProfileViews: UserProfileViewWithViewers[];
};

const ProfileViewAvatars = ({ userProfileViews }: ProfileViewAvatarsProps) => {
  const { open, setUserProfileViews } = useUserProfileViewAvatarModalStore();

  return (
    <div>
      <h3 className="mt-6 mb-3 text-center">View By</h3>

      {userProfileViews?.length ? (
        <div className="grid grid-cols-12 gap-1">
          {userProfileViews.slice(0, 10).map((pv) => (
            <div
              key={pv.id}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <ActionTooltip text={pv.viewer?.username}>
                <Link href={`/profile/${pv.viewerId}`}>
                  <Avatar className="bg-sky-500 h-10 w-10">
                    <AvatarImage
                      src={pv?.viewer?.imageUrl ?? "/robot.png"}
                      className="object-cover"
                    />
                  </Avatar>
                </Link>
              </ActionTooltip>
            </div>
          ))}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ActionTooltip text={"More profile"}>
              <MoreHorizontal
                onClick={() => {
                  setUserProfileViews(userProfileViews);
                  open();
                }}
                className="cursor-pointer w-10 h-10 rounded-full p-2 bg-slate-200 dark:bg-slate-800"
              />
            </ActionTooltip>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No profile views.</p>
      )}
    </div>
  );
};

export default ProfileViewAvatars;
