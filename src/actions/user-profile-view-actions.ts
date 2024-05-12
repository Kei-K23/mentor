"use server";

import { db } from "@/db";
import { getUserProfileViewByOwnerId } from "@/queries/user-profile-view-queries";
import { revalidatePath } from "next/cache";

export const createUserProfileView = async (viewerId: string, ownerId: string) => {
    try {
        if (!viewerId || !ownerId) return;

        if (viewerId === ownerId) return;

        const profileViewers = await getUserProfileViewByOwnerId(ownerId);

        const alreadyViewed = profileViewers.find(pv => pv.viewerId === viewerId);
        if (alreadyViewed) {
            return {
                info: "viewed"
            };
        }
        await db.userProfileView.create({
            data: {
                viewerId,
                ownerId
            }
        });

        revalidatePath('/profile');
        revalidatePath(`/profile/${ownerId}`);
    } catch (e: any) {
        throw new Error("Something went wrong when creating user profile view");
    }
}