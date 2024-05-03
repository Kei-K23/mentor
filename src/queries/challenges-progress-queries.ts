import { db } from "@/db"
import { getUserByExternalUserId } from "./user-queries";
import { auth } from "@clerk/nextjs/server";
import { getChallengeById } from "./challenges-queries";

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

export const getChallengeProgressStatus = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    const challengeProgress = await db.challengeProgress.findMany({
        where: {
            userId: user.id
        }
    });

    // Initialize counters for each difficulty level
    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    // Iterate over each challenge progress
    for (const progress of challengeProgress) {
        // Get the challenge details
        const challenge = await getChallengeById(progress.challengeId);
        if (!challenge) return;
        // Increment the counter based on the difficulty level of the challenge
        switch (challenge.difficulty) {
            case "EASY":
                easyCount++;
                break;
            case "MEDIUM":
                mediumCount++;
                break;
            case "HARD":
                hardCount++;
                break;
            default:
                // Handle any other difficulty levels if necessary
                break;
        }
    }

    // Create and return the object containing counts for each difficulty level
    const status = {
        easy: easyCount,
        medium: mediumCount,
        hard: hardCount
    };

    return status;
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

