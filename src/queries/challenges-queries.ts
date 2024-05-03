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

    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    const challenges = await getChallengesForActiveCourses();

    if (!challenges) return 0;

    const coursePercentage =
        (challenges.filter((challenge) => challenge.challengeProgress.some(cp => cp.userId === user.id && cp.completed))
            .length /
            challenges.length) *
        100;

    return coursePercentage;
}

export const getChallengeById = async (id: number) => {

    const { userId } = auth()

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    return db.challenge.findUnique({
        where: {
            id
        },
        include: {
            challengeOptions: {
                where: {
                    challengeId: id
                }
            },
            challengeProgress: {
                where: {
                    challengeId: id,
                    userId: user.id
                }
            }
        }
    });
}