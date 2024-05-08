import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { redirect } from "next/navigation";
import React from "react";
import Quests from "@/components/quests";
import { Metadata } from "next";
import {
  getUserProgress,
  getUsersForLeaderBoard,
} from "@/queries/user-progress-queries";
import { getAllQuests } from "@/queries/quests-queries";
import { Goal } from "lucide-react";
import { getQuestsProgress } from "@/queries/quests-progress-queries";
import WrapperLeaderBoard from "@/components/wrapper-leaderboard";

export const metadata: Metadata = {
  title: "Quests",
};

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const questsData = getAllQuests();
  const questProgressData = getQuestsProgress();
  const usersForLeaderBoardData = getUsersForLeaderBoard(3);

  const [userProgress, quests, questsProgress, usersForLeaderBoard] =
    await Promise.all([
      userProgressData,
      questsData,
      questProgressData,
      usersForLeaderBoardData,
    ]);

  if (!userProgress || !userProgress.course || !quests.length)
    return redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <WrapperLeaderBoard usersForLeaderBoard={usersForLeaderBoard ?? []} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Goal
            width={90}
            height={90}
            className="stroke-[1.5] hidden md:block"
          />
          <Goal
            width={75}
            height={75}
            className="stroke-[1.5] block md:hidden"
          />
          <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete the quests by earning points
          </p>
          <Quests
            questsProgress={questsProgress || []}
            quests={quests}
            points={userProgress.points}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
