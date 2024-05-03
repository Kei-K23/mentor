import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "./user-queries";
import { db } from "@/db";

export const getQuestsProgress = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const currentUser = await getUserByExternalUserId(userId);

    if (!currentUser) return null;

    return await db.questProgress.findMany({
        where: {
            completed: true,
            userId: currentUser.id
        }
    });
}

export const getQuestsProgressById = async (questId: number) => {
    const { userId } = auth();

    if (!userId) return null;

    const currentUser = await getUserByExternalUserId(userId);

    if (!currentUser) return null;

    return await db.questProgress.findFirst({
        where: {
            questId: questId,
            completed: true,
            userId: currentUser.id
        }
    });
}