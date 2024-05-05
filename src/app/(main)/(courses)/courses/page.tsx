import { getCourses } from "@/queries/courses-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import React from "react";
import List from "../_components/list";
import { getUserByExternalUserId } from "@/queries/user-queries";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
};

const CoursesPage = async () => {
  const { userId } = auth();
  const coursesData = getCourses();
  const userProgressData = getUserProgress();
  const userData = getUserByExternalUserId(userId!);

  const [courses, userProgress, user] = await Promise.all([
    coursesData,
    userProgressData,
    userData,
  ]);

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold ">Choose your prefer course 🚀</h1>
      <List
        user={user!}
        courses={courses}
        activeCourseId={userProgress?.courseId!}
      />
    </div>
  );
};

export default CoursesPage;
