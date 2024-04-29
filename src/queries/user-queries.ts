import { db } from "@/db"

export const getUserByExternalUserId = async (externalUserId: string) => {
    return db.user.findUnique({
        where: {
            externalUserId
        }
    })
}