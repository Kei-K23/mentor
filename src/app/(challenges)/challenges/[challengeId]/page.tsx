import React from "react";
import Main from "../../_components/main";
import {
  getChallengeById,
  getChallengesForActiveCourses,
  getCoursePercentage,
} from "@/queries/challenges-queries";
import { redirect } from "next/navigation";
import { getUserProgress } from "@/queries/user-progress-queries";
import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { Metadata } from "next";
import ErrorAlertModal from "@/components/modal/error-alert-modal";

export const metadata: Metadata = {
  title: "Challenges",
};

type ChallengeIdPageProps = {
  params: {
    challengeId: string;
  };
};

const ChallengeIdPage = async ({ params }: ChallengeIdPageProps) => {
  try {
    const { userId } = auth();
    const userData = getUserByExternalUserId(userId!);
    const challengeData = getChallengeById(+params.challengeId);
    const challengesData = getChallengesForActiveCourses();
    const coursePercentageData = getCoursePercentage();
    const userProgressData = getUserProgress();

    const [challenge, challenges, coursePercentage, userProgress, user] =
      await Promise.all([
        challengeData,
        challengesData,
        coursePercentageData,
        userProgressData,
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
      <div className="flex flex-col h-full">
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
          codeLanguageType={userProgress.course.languageType!}
        />
      </div>
    );
  } catch (e: any) {
    return <ErrorAlertModal />;
  }
};

export default ChallengeIdPage;
