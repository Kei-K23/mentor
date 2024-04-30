import { db } from "@/db"

export const getCourses = async () => {
    return db.course.findMany()
}