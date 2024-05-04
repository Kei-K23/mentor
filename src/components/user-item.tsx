import { UserProgress } from "@prisma/client";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import ActionTooltip from "./action-tooltip";
import Link from "next/link";
import Image from "next/image";
import { UserProgressWithUser } from "@/types";

type UserItemProps = {
  userProgress: UserProgressWithUser;
  index: number;
  onClose?: () => void;
};

const UserItem = ({ userProgress, index, onClose }: UserItemProps) => {
  return (
    <div
      key={userProgress.userId}
      className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
    >
      <p className="font-bold text-sky-600 mr-4">{index + 1}</p>
      <Avatar className="bg-sky-500 h-12 w-12 ml-3 mr-5">
        {/* TODO: handle if user img is null */}
        <AvatarImage
          src={userProgress.user.imageUrl!}
          className="object-cover"
        />
      </Avatar>
      <ActionTooltip text="View profile">
        <Link
          onClick={onClose}
          href={`/profile/${userProgress.user.externalUserId}`}
          className="font-bold text-slate-800 dark:text-slate-200 flex-1 hover:text-sky-500 dark:hover:text-sky-500"
        >
          {userProgress.user.username}
        </Link>
      </ActionTooltip>
      <div className="flex items-center gap-x-1">
        <Image src={"/points.svg"} alt="points" height={25} width={25} />
        <p className="text-muted-foreground">{userProgress.points} XP</p>
      </div>
    </div>
  );
};

export default UserItem;
