import { db } from "@/db"

export const getCourses = async () => {
    return db.course.findMany()
}

export const getCoursesById = async (id: number) => {
    return db.course.findUnique({
        where: {
            id
        },
        include: {
            challenges: true
        }
    })
}