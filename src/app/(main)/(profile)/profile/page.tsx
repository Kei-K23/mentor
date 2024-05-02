import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import {
  getUserProgress,
  getUsersForLeaderBoard,
} from "@/queries/user-progress-queries";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { Medal } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import BioForm from "../_components/bio-form";

export const metadata: Metadata = {
  title: "LeaderBoard",
};

const ProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return auth().redirectToSignIn();
  }

  const userData = getUserByExternalUserId(userId);

  const [user] = await Promise.all([userData]);

  if (!user) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <div />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Avatar className="bg-sky-500 h-[75px] w-[75px] md:h-[100px] md:w-[100px] ml-3 mr-5">
            <AvatarImage src={user.imageUrl!} className="object-cover" />
          </Avatar>
          <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl mt-6 mb-4">
            {user.username}
          </h1>
          <BioForm initialBio={user.bio!} />
          <Separator className="mb-4 h-0.5 rounded-full" />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
