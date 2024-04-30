import React from "react";
import Main from "../../_components/main";
import {
  getChallengeById,
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
  const coursePercentageData = await getCoursePercentage();
  const userProgressData = await getUserProgress();

  const [challenge, coursePercentage, userProgress] = await Promise.all([
    challengeData,
    coursePercentageData,
    userProgressData,
  ]);

  if (
    !challenge ||
    !challenge.challengeOptions.length ||
    !userProgress?.courseId
  ) {
    redirect("/courses");
  }

  return (
    <>
      <Main
        initialChallengeWithChallengeProgressAndOptions={challenge}
        initialPercentage={coursePercentage}
        initialHeart={userProgress.hearts}
        initialPoints={userProgress.points}
      />
    </>
  );
};

export default ChallengeIdPage;
