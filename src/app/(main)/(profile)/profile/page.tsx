import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";
import BioForm from "../_components/bio-form";
import { getChallengeProgressStatus } from "@/queries/challenges-progress-queries";
import { buttonVariants } from "@/components/ui/button";
import { getUserProgress } from "@/queries/user-progress-queries";
import Image from "next/image";
import SolvedChallenges from "../_components/solved-challenges";
import { getCourses } from "@/queries/courses-queries";
import ActiveCourseCard from "../_components/active-course-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import List from "../_components/list";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const { userId } = auth();

  if (!userId) {
    return auth().redirectToSignIn();
  }

  const userProgressData = getUserProgress();
  const userData = getUserByExternalUserId(userId);
  const challengeProgressStatusData = getChallengeProgressStatus();
  const coursesData = getCourses();

  const [user, challengeProgressStatus, userProgress, courses] =
    await Promise.all([
      userData,
      challengeProgressStatusData,
      userProgressData,
      coursesData,
    ]);

  if (!user) {
    return auth().redirectToSignIn();
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <div />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Avatar className="bg-sky-500 h-[75px] w-[75px] md:h-[100px] md:w-[100px] ml-3 mr-5 ">
            <AvatarImage
              src={user?.imageUrl! ?? "/robot.png"}
              className="object-cover"
            />
          </Avatar>

          <div className="flex items-center gap-x-4 mt-4 mb-2">
            <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl ">
              {user.username}
            </h1>
            <div className="flex items-center ">
              <Image src={"/points.svg"} alt="points" width={28} height={28} />
              {userProgress?.points ?? 0} xp
            </div>
          </div>
          <BioForm initialBio={user.bio!} />
          <SolvedChallenges
            easy={challengeProgressStatus?.easy ?? 0}
            medium={challengeProgressStatus?.medium ?? 0}
            hard={challengeProgressStatus?.hard ?? 0}
          />
          <Separator className="mb-4 h-0.5 rounded-full" />
          <div className="w-full space-y-10">
            <div className="w-full">
              <h1 className="text-lg font-bold mb-3">Current active course</h1>
              {userProgress?.course ? (
                <div className="pt-4">
                  <ActiveCourseCard
                    active={true}
                    imageSrc={userProgress?.course.imageUrl}
                    title={userProgress?.course.title}
                    description={userProgress.course.description}
                  />
                </div>
              ) : (
                <div className="space-y-2 pt-4">
                  <h3>No active course yet!</h3>
                  <Link href={"/courses"} className={cn(buttonVariants({}))}>
                    Explore our courses
                  </Link>
                </div>
              )}
            </div>
            <div className="w-full">
              <h1 className="text-lg font-bold mb-3">Completed courses</h1>
              {/* // TODO: check routing and create user progress need for this */}
              <List courses={courses} user={user} />
            </div>
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
