"use server";

import { db } from "@/db";
import { getChallengeById } from "@/queries/challenges-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createChallengeProgress = async (challengeId: number) => {
    try {
        if (!challengeId) throw new Error("ChallengeId is required");

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user) throw new Error("User not found!");

        const userProgress = await getUserProgress();

        if (!userProgress || !userProgress.courseId) throw new Error("User progress not found!");

        const challenge = await getChallengeById(challengeId);

        if (!challenge || !challenge.challengeOptions) throw new Error("Challenge is empty!");

        const existingChallengeProgress = await db.challengeProgress.findFirst({
            where: {
                userId: user.id,
                challengeId: challenge.id
            }
        });

        const isPractice = !!existingChallengeProgress;

        if (userProgress.hearts === 0 && !isPractice) {
            return { info: "hearts" };
        }

        // user is in practice mode mean they already solved the challenge
        if (isPractice) {
            await db.challengeProgress.update({
                where: {
                    id: existingChallengeProgress.id
                },
                data: {
                    completed: true,
                }
            });

            // TODO: check if points need to be increased also like hearts in practice mode
            // increment the hearts when user is in practice mode
            await db.userProgress.update({
                where: {
                    userId: user.id,
                },
                data: {
                    hearts: Math.min(userProgress.hearts + 1, 5),
                }
            });

            revalidatePath("/learn");
            revalidatePath("/challenges");
            revalidatePath(`/challenges/${challengeId}`);
            revalidatePath("/quests");
            revalidatePath("/leaderboard");
            return;
        }

        // create new challenge progress
        await db.challengeProgress.create({
            data: {
                userId: user.id,
                challengeId: challenge.id,
                completed: true,
                courseId: userProgress.courseId
            }
        });

        // increment the points
        await db.userProgress.update({
            where: {
                userId: user.id,
            },
            data: {
                points: userProgress.points + 10
            }
        });


        revalidatePath("/learn");
        revalidatePath("/challenges");
        revalidatePath(`/challenges/${challengeId}`);
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
    } catch (e) {
        console.log(e);

        throw new Error("Something went wrong");
    }
}

export const reduceHeart = async (challengeId: number) => {
    try {

        if (!challengeId) throw new Error("ChallengeId is required");

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user) throw new Error("User not found!");

        const userProgress = await getUserProgress();

        if (!userProgress || !userProgress.courseId) throw new Error("User progress not found!");

        const challenge = await getChallengeById(challengeId);

        if (!challenge || !challenge.challengeOptions) throw new Error("Challenge is empty!");

        const existingChallengeProgress = await db.challengeProgress.findFirst({
            where: {
                userId: user.id,
                challengeId: challenge.id
            }
        });

        const isPractice = !!existingChallengeProgress;

        if (isPractice) {
            return { info: "practice" }
        }

        if (userProgress.hearts === 0) {
            return { info: "hearts" };
        }

        // reduce the points
        await db.userProgress.update({
            where: {
                userId: user.id,
            },
            data: {
                hearts: Math.max(userProgress.hearts - 1, 0)
            }
        });

        revalidatePath("/learn");
        revalidatePath("/challenges");
        revalidatePath(`/challenges/${challengeId}`);
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
    } catch (e) {
        throw new Error("Something went wrong");
    }
}


export const refillHeart = async (points: number) => {
    try {

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user) throw new Error("User not found!");

        const userProgress = await getUserProgress();

        if (!userProgress) throw new Error("User progress not found!");

        if (userProgress.hearts === 5) {
            return { info: "hearts" };
        }

        if (userProgress.points < points) throw new Error("No enough points to exchange the hearts.");

        await db.userProgress.update({
            where: {
                userId: user.id,
            },
            data: {
                hearts: Math.min(points === 50 ? userProgress.hearts + 5 : userProgress.hearts + 1, 5),
                points: Math.max(userProgress.points - points, 0)
            }
        })

        revalidatePath("/learn");
        revalidatePath("/challenges");
        revalidatePath("/shop");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
    } catch (e) {
        throw new Error("Something went wrong");
    }
}

