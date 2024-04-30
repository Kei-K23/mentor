import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "./user-queries";
import { getUserProgress } from "./user-progress-queries";
import { db } from "@/db";

export const getChallengesForActiveCourses = async () => {
    const { userId } = auth();

    if (!userId) return null;


    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    const userProgress = await getUserProgress();

    if (!userProgress || !userProgress.courseId) return null;

    return await db.challenge.findMany({
        where: {
            courseId: userProgress.courseId
        },
        include: {
            challengeProgress: {
                where: {
                    userId: user.id,
                }
            },
        },
        orderBy: {
            order: "asc"
        }
    })
}

export const getCoursePercentage = async () => {
    const challenges = await getChallengesForActiveCourses();

    if (!challenges) return 0;

    const coursePercentage =
        (challenges.filter((challenge) => challenge.challengeProgress?.completed)
            .length /
            challenges.length) *
        100;

    return coursePercentage;
}