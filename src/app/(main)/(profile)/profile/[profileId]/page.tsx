import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getChallengeProgressStatusForExternalUserId } from "@/queries/challenges-progress-queries";
import { getCourses } from "@/queries/courses-queries";
import { getUserProgressByExternalId } from "@/queries/user-progress-queries";
import { getUserByExternalUserId } from "@/queries/user-queries";
import Link from "next/link";
import React from "react";
import ActiveCourseCard from "../../_components/active-course-card";
import { Separator } from "@/components/ui/separator";
import SolvedChallenges from "../../_components/solved-challenges";
import BioForm from "../../_components/bio-form";
import StickyWrapper from "@/components/sticky-wrapper";
import FeedWrapper from "@/components/feed-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import List from "../../_components/list";
import { auth } from "@clerk/nextjs/server";

type ProfileIdPageProps = {
  params: {
    profileId: string;
  };
};

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  if (!params.profileId) {
    return null;
  }

  const { userId } = auth();

  const userProgressByExternalIdData = getUserProgressByExternalId(
    params.profileId
  );
  const externalUserData = getUserByExternalUserId(params.profileId);
  const challengeProgressStatusForExternalUserIdData =
    getChallengeProgressStatusForExternalUserId(params.profileId);
  const coursesData = getCourses();

  const [
    externalUser,
    challengeProgressStatusForExternalUserId,
    userProgressByExternalId,
    courses,
  ] = await Promise.all([
    externalUserData,
    challengeProgressStatusForExternalUserIdData,
    userProgressByExternalIdData,
    coursesData,
  ]);

  if (!externalUser) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
        <StickyWrapper>
          <div />
        </StickyWrapper>
        <FeedWrapper>
          <div className="w-full flex flex-col items-center">
            <Avatar className="bg-sky-500 h-[75px] w-[75px] md:h-[100px] md:w-[100px] ml-3 mr-5">
              <AvatarImage
                src={externalUser.imageUrl!}
                className="object-cover"
              />
            </Avatar>
            <div className="flex items-center gap-x-4 mt-4 mb-2">
              <h1 className="text-center font-bold text-slate-800 dark:text-slate-200 text-2xl ">
                {externalUser.username}
              </h1>
              <div className="flex items-center ">
                <Image
                  src={"/points.svg"}
                  alt="points"
                  width={28}
                  height={28}
                />
                {userProgressByExternalId?.points ?? 0} xp
              </div>
            </div>
            <BioForm
              notEditable={externalUser.externalUserId !== userId}
              initialBio={externalUser.bio!}
            />
            <SolvedChallenges
              easy={challengeProgressStatusForExternalUserId?.easy ?? 0}
              medium={challengeProgressStatusForExternalUserId?.medium ?? 0}
              hard={challengeProgressStatusForExternalUserId?.hard ?? 0}
            />
            <Separator className="mb-4 h-0.5 rounded-full" />
            <div className="w-full space-y-10">
              <div className="w-full">
                <h1 className="text-lg font-bold mb-3">
                  Current active course
                </h1>
                {userProgressByExternalId?.course ? (
                  <div className="pt-4">
                    <ActiveCourseCard
                      active={true}
                      imageSrc={userProgressByExternalId?.course.imageUrl}
                      title={userProgressByExternalId?.course.title}
                      description={userProgressByExternalId.course.description}
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
                <List courses={courses} user={externalUser} />
              </div>
            </div>
          </div>
        </FeedWrapper>
      </div>
    </div>
  );
};

export default ProfileIdPage;