import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "./user-queries";
import { db } from "@/db";

export const questsProgressForActiveUser = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const currentUser = await getUserByExternalUserId(userId);

    if (!currentUser) return null;

    await db.questProgress.findMany({
        where: {
            userId: currentUser.id,
            completed: true,
        }
    });
}