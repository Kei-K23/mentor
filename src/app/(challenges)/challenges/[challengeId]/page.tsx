import React from "react";
import Main from "../../_components/main";
import {
  getChallengeById,
  getChallengesForActiveCourses,
  getCoursePercentage,
} from "@/queries/challenges-queries";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/queries/user-progress-queries";

type ChallengeIdPageProps = {
  params: {
    challengeId: string;
  };
};

const ChallengeIdPage = async ({ params }: ChallengeIdPageProps) => {
  const challengeData = await getChallengeById(+params.challengeId);
  const challengesData = await getChallengesForActiveCourses();
  const coursePercentageData = await getCoursePercentage();
  const userProgressData = await getUserProgress();

  const [challenge, challenges, coursePercentage, userProgress] =
    await Promise.all([
      challengeData,
      challengesData,
      coursePercentageData,
      userProgressData,
    ]);

  if (!challenge || !challenges?.length || !userProgress?.courseId) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-col lg:h-full">
      <Main
        challenges={challenges}
        initialChallengeWithChallengeProgressAndOptions={challenge}
        initialPercentage={coursePercentage}
        initialHeart={userProgress.hearts}
        initialPoints={userProgress.points}
      />
    </div>
  );
};

export default ChallengeIdPage;
