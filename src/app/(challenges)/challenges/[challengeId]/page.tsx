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

  if (
    !challenge ||
    !challenge.challengeOptions.length ||
    !challenges?.length ||
    !userProgress?.courseId ||
    !params.challengeId
  ) {
    redirect("/courses");
  }

  const withinRange = !!challenges.find((c) => c.id === +params.challengeId);

  const completedChallenge = challenges?.filter(
    (c) => c.challengeProgress?.completed
  );

  if (!withinRange) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-col lg:h-full">
      <Main
        completedChallenge={completedChallenge}
        firstChallengeId={challenges[0].id}
        lastChallengeId={challenges[challenges.length - 1].id}
        isValidChallengeIdForActiveCourse={withinRange!}
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
