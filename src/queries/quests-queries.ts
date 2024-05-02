import { db } from "@/db"

export const getAllQuests = async () => {
    return await db.quest.findMany();
}

