import { db } from "@/db"
import { auth } from "@clerk/nextjs/server";
import { getUserByExternalUserId } from "./user-queries";

export const getCourses = async () => {
    return db.course.findMany({
        include: {
            challengeProgress: true,
            challenges: true,
        }
    })
}

export const getFinishedCourses = async () => {

    const { userId } = auth();

    if (!userId) return null;

    const user = await getUserByExternalUserId(userId);

    if (!user) return null;

    const courses = await db.course.findMany({
        include: {
            challengeProgress: true,
            challenges: true,
        }
    });

    // const challengeProgressFromCourse = course.challengeProgress.filter(
    //     (cp) => cp.completed && cp.userId === user.id
    // );
    // const isCompleted =
    //     challengeProgressFromCourse.length === course.challenges.length;

}

export const getCoursesById = async (id: number) => {
    return db.course.findUnique({
        where: {
            id
        },
        include: {
            challenges: true,
        }
    })
}