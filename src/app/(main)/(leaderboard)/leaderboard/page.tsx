import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/user-progress";
import {
  getUserProgress,
  getUsersForLeaderBoard,
} from "@/queries/user-progress-queries";
import { Medal } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "LeaderBoard",
};

const LeaderBoardPage = async () => {
  const userProgressData = getUserProgress();
  const usersForLeaderBoardData = getUsersForLeaderBoard(10);

  const [userProgress, usersForLeaderBoard] = await Promise.all([
    userProgressData,
    usersForLeaderBoardData,
  ]);

  if (!userProgress || !userProgress.course) return redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.course}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Medal width={90} height={90} className="stroke-[1.5]" />
          <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other challengers in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {usersForLeaderBoard?.map((userProgress, i) => (
            <div
              key={userProgress.userId}
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            >
              <p className="font-bold text-sky-600 mr-4">{i + 1}</p>
              <Avatar className="bg-sky-500 h-12 w-12 ml-3 mr-5">
                {/* TODO: handle if user img is null */}
                <AvatarImage
                  src={userProgress.user.imageUrl!}
                  className="object-cover"
                />
              </Avatar>
              <p className="font-bold text-slate-800 dark:text-slate-200 flex-1">
                {userProgress.user.username}
              </p>
              <div className="flex items-center gap-x-1">
                <Image
                  src={"/points.svg"}
                  alt="points"
                  height={25}
                  width={25}
                />
                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoardPage;
