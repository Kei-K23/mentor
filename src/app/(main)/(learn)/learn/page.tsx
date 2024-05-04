import { ChallengeDataTable } from "@/components/challenges-data-table";
import { columns } from "@/components/challenges-data-table/columns";
import FeedWrapper from "@/components/feed-wrapper";
import Header from "@/components/header";
import Quests from "@/components/quests";
import StickyWrapper from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/user-progress";
import {
  getChallengesForActiveCourses,
  getCoursePercentage,
} from "@/queries/challenges-queries";
import { getQuestsProgress } from "@/queries/quests-progress-queries";
import { getAllQuests } from "@/queries/quests-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import { redirect } from "next/navigation";
import React from "react";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const challengesData = getChallengesForActiveCourses();
  const coursePercentageData = getCoursePercentage();
  const questsData = getAllQuests();
  const questProgressData = getQuestsProgress();

  const [userProgress, challenges, coursePercentage, quests, questProgress] =
    await Promise.all([
      userProgressData,
      challengesData,
      coursePercentageData,
      questsData,
      questProgressData,
    ]);

  if (
    !userProgress ||
    !userProgress.courseId ||
    !userProgress.course ||
    !challenges?.length
  ) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.course}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Quests
          quests={quests}
          points={userProgress.points}
          questsProgress={questProgress ?? []}
          onlyShowUncompleted={true}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.course?.title} />
        <Progress value={coursePercentage} className="w-full mb-8" />
        <ChallengeDataTable columns={columns} data={challenges} />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
