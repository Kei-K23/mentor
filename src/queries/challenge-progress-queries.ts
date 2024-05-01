import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "./user-queries";
import { db } from "@/db";

export const getUserFinishTheCourse = async (courseId: number) => {
    const { userId } = auth();

    if (!userId) return null;

    const currentUser = await getUserByExternalUserId(userId);

    if (!currentUser) return null;

    const challengeProgress = await db.challengeProgress.findMany({
        where: {
            userId: currentUser.id,
            courseId: courseId
        }
    })
}