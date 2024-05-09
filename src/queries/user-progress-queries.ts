import { db } from "@/db";
import { auth } from "@clerk/nextjs/server"
import { getUserByExternalUserId } from "./user-queries";

export const getUserProgress = async () => {
    const { userId } = auth();

    if (!userId) return null;

    const currentUser = await getUserByExternalUserId(userId);

    if (!currentUser) return null;

    return db.userProgress.findUnique({
        where: {
            userId: currentUser.id
        },
        include: {
            course: true
        }
    });
}

export const getUserProgressByExternalId = async (externalUserId: string) => {
    const currentUser = await getUserByExternalUserId(externalUserId);

    if (!currentUser) return null;

    return db.userProgress.findUnique({
        where: {
            userId: currentUser.id
        },
        include: {
            course: true
        }
    });
}

export const getUsersForLeaderBoard = async (limit?: number) => {
    const { userId } = auth();

    if (!userId) return null;

    if (limit) {
        return db.userProgress.findMany({
            orderBy: {
                points: "desc"
            },
            take: limit,
            include: {
                user: true
            }
        });
    } else {
        return db.userProgress.findMany({
            orderBy: {
                points: "desc"
            },
            include: {
                user: true
            }
        });
    }
}
