import { ChallengeDataTable } from "@/components/challenges-data-table";
import { columns } from "@/components/challenges-data-table/columns";
import FeedWrapper from "@/components/feed-wrapper";
import Header from "@/components/header";
import StickyWrapper from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/user-progress";
import {
  getChallengesForActiveCourses,
  getCoursePercentage,
} from "@/queries/challenges-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import { redirect } from "next/navigation";
import React from "react";

const LearnPage = async () => {
  const userProgressData = await getUserProgress();
  const challengesData = await getChallengesForActiveCourses();
  const coursePercentageData = await getCoursePercentage();

  const [userProgress, challenges, coursePercentage] = await Promise.all([
    userProgressData,
    challengesData,
    coursePercentageData,
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
