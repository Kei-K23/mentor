'use server';

import { db } from "@/db";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createUserBio = async (bio: string) => {
    try {

        if (bio === "") throw new Error("Bio is empty!")

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user) throw new Error("User not found!");

        await db.user.update({
            where: {
                id: user.id,
                externalUserId: userId
            },
            data: {
                bio
            }
        });

        revalidatePath("/profile");
    } catch (e) {
        throw new Error("Something went wrong");
    }
}