"use server";

import { db } from "@/db";
import { getQuestsProgressById } from "@/queries/quests-progress-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createQuestProgress = async (questId: number, points: number) => {

    try {
        if (!questId) throw new Error("Quest id is required");

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user) throw new Error("User not found!");

        const userProgress = await getUserProgress();

        if (!userProgress || !userProgress.courseId) throw new Error("User progress not found!");

        const questProgress = await getQuestsProgressById(questId);

        if (questProgress) throw new Error("Quest is already claim!");

        await db.questProgress.create({
            data: {
                questId,
                userId: user.id,
                completed: true
            }
        });

        await db.userProgress.update({
            where: {
                userId: user.id,
            },
            data: {
                points: userProgress.points + points
            }
        });

        revalidatePath("/");
        revalidatePath("/learn");
        revalidatePath("/challenges");
        revalidatePath("/quests");
        revalidatePath("/leaderboard");
    } catch (e) {
        console.log(e);

        throw new Error("Something went wrong");
    }
}


