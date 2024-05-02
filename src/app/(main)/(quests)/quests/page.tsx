import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Quests from "@/components/quests";
import { Metadata } from "next";
import { getUserProgress } from "@/queries/user-progress-queries";
import { getAllQuests } from "@/queries/quests-queries";

export const metadata: Metadata = {
  title: "Quests",
};

const QuestsPage = async () => {
  const userProgressData = getUserProgress();
  const questsData = getAllQuests();

  const [userProgress, quests] = await Promise.all([
    userProgressData,
    questsData,
  ]);

  if (!userProgress || !userProgress.course || !quests.length)
    return redirect("/courses");

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
          <Image
            src={"/quests.svg"}
            alt="quests"
            height={90}
            width={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete the quests by earning points
          </p>
          <Quests quests={quests} points={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
