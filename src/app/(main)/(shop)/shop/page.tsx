import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";
import {
  getUserProgress,
  getUsersForLeaderBoard,
} from "@/queries/user-progress-queries";
import Items from "../_components/items";
import { Store } from "lucide-react";
import Quests from "@/components/quests";
import { getAllQuests } from "@/queries/quests-queries";
import { getQuestsProgress } from "@/queries/quests-progress-queries";
import WrapperLeaderBoard from "@/components/wrapper-leaderboard";

export const metadata: Metadata = {
  title: "Shop",
};

const ShopPage = async () => {
  const userProgressData = getUserProgress();
  const questsData = getAllQuests();
  const questProgressData = getQuestsProgress();
  const usersForLeaderBoardData = getUsersForLeaderBoard(3);

  const [userProgress, quests, questProgress, usersForLeaderBoard] =
    await Promise.all([
      userProgressData,
      questsData,
      questProgressData,
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
        <WrapperLeaderBoard usersForLeaderBoard={usersForLeaderBoard ?? []} />
        <Quests
          quests={quests}
          points={userProgress.points}
          questsProgress={questProgress ?? []}
          onlyShowUncompleted={true}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Store
            width={90}
            height={90}
            className="stroke-[1.5] hidden md:block"
          />
          <Store
            width={75}
            height={75}
            className="stroke-[1.5] block md:hidden"
          />
          <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Exchange your points with hearts when you run out of hearts.
          </p>
          <Items hearts={userProgress.hearts} points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
