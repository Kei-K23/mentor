import FeedWrapper from "@/components/feed-wrapper";
import { LeaderBoardDataTable } from "@/components/leaderboard-data-table";
import { columns } from "@/components/leaderboard-data-table/columns";
import Quests from "@/components/quests";
import StickyWrapper from "@/components/sticky-wrapper";
import { Separator } from "@/components/ui/separator";
import { getQuestsProgress } from "@/queries/quests-progress-queries";
import { getAllQuests } from "@/queries/quests-queries";
import {
  getUserProgress,
  getUsersForLeaderBoard,
} from "@/queries/user-progress-queries";
import { useUser } from "@clerk/nextjs";
import { Medal } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "LeaderBoard",
};

const LeaderBoardPage = async () => {
  const userProgressData = getUserProgress();
  const usersForLeaderBoardData = getUsersForLeaderBoard();
  const questsData = getAllQuests();
  const questProgressData = getQuestsProgress();

  const [userProgress, usersForLeaderBoard, quests, questProgress] =
    await Promise.all([
      userProgressData,
      usersForLeaderBoardData,
      questsData,
      questProgressData,
    ]);

  if (!userProgress || !userProgress.course) return redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <Quests
          quests={quests}
          points={userProgress.points}
          questsProgress={questProgress ?? []}
          onlyShowUncompleted={true}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Medal
            width={90}
            height={90}
            className="stroke-[1.5] hidden md:block"
          />
          <Medal
            width={75}
            height={75}
            className="stroke-[1.5] block md:hidden"
          />
          <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other challengers in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {usersForLeaderBoard?.length ? (
            <LeaderBoardDataTable
              data={usersForLeaderBoard}
              columns={columns}
            />
          ) : (
            <p className="text-center text-muted-foreground">No users</p>
          )}
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderBoardPage;
