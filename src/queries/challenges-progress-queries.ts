import { db } from "@/db"
import { getUserByExternalUserId } from "./user-queries";
import { auth } from "@clerk/nextjs/server";

export const getChallengeProgressById = async (challengeId: number) => {
    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    return await db.challengeProgress.findUnique({
        where: {
            challengeId,
            userId: user.id
        }
    })
}

export const getChallengeProgressForActiveCourse = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    return await db.challengeProgress.findMany({
        where: {
            userId: user.id
        },
        include: {
            challenge: {
                include: {
                    course: true
                }
            }
        }
    })
}