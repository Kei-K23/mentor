import React from "react";
import Main from "../../_components/main";
import {
  getChallengeById,
  getChallengesForActiveCourses,
  getCoursePercentage,
} from "@/queries/challenges-queries";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/queries/user-progress-queries";
import { getChallengeProgressById } from "@/queries/challenges-progress-queries";
import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "@/queries/user-queries";

type ChallengeIdPageProps = {
  params: {
    challengeId: string;
  };
};

const ChallengeIdPage = async ({ params }: ChallengeIdPageProps) => {
  const { userId } = auth();
  const userData = getUserByExternalUserId(userId!);
  const challengeData = getChallengeById(+params.challengeId);
  const challengesData = getChallengesForActiveCourses();
  const coursePercentageData = getCoursePercentage();
  const userProgressData = getUserProgress();
  const challengeProgressData = getChallengeProgressById(+params.challengeId);

  const [
    challenge,
    challenges,
    coursePercentage,
    userProgress,
    challengeProgress,
    user,
  ] = await Promise.all([
    challengeData,
    challengesData,
    coursePercentageData,
    userProgressData,
    challengeProgressData,
    userData,
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

  const completedChallenge = challenges?.filter((c) =>
    c.challengeProgress.find((cp) => cp.userId === user?.id && cp.completed)
  );

  const isPractice = completedChallenge.length === challenges.length;

  if (!withinRange) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-col lg:h-full">
      <Main
        user={user!}
        initialIsPractice={isPractice}
        completedChallenge={completedChallenge}
        firstChallengeId={challenges[0].id}
        lastChallengeId={challenges[challenges.length - 1].id}
        isValidChallengeIdForActiveCourse={withinRange!}
        challenges={challenges}
        initialChallengeWithChallengeProgressAndOptions={challenge}
        initialPercentage={coursePercentage ?? 0}
        initialHeart={userProgress.hearts}
        initialPoints={userProgress.points}
      />
    </div>
  );
};

export default ChallengeIdPage;
