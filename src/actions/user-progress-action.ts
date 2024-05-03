'use server';

import { db } from "@/db";
import { getCoursesById } from "@/queries/courses-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// TODO: js course is not work
export const createUserProgress = async (courseId: number) => {
    try {

        if (!courseId) throw new Error("Missing course id.");

        const { userId } = auth();

        if (!userId) throw new Error("Unauthorized!");

        const user = await getUserByExternalUserId(userId);

        if (!user || user.externalUserId !== userId) throw new Error("User cannot find!");

        const course = await getCoursesById(courseId);

        if (!course) throw new Error("Course not found.");

        if (!course.challenges.length) throw new Error("Course is empty.");

        const existingUserProgress = await getUserProgress();

        if (existingUserProgress) {
            await db.userProgress.update({
                where: {
                    userId: user.id
                },
                data: {
                    courseId: course.id
                }
            });

            revalidatePath("/courses");
            revalidatePath("/learn");
            revalidatePath("/challenges");
            return;
        }

        await db.userProgress.create({
            data: {
                userId: user.id,
                courseId: course.id,
            }
        });

        revalidatePath("/courses");
        revalidatePath("/learn");
        revalidatePath("/challenges");
        return;
    } catch (e: any) {
        console.log(e);
        console.log(e.message);

        throw new Error("Something went wrong!");
    }
}