import { db } from "@/db"

export const getUserProfileViewByOwnerId = async (ownerId: string) => {
    return await db.userProfileView.findMany({
        where: {
            ownerId
        },
        include: {
            viewer: {
                include: {
                    userProgress: true
                }
            }
        }
    });
}