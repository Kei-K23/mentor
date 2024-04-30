import { getCourses } from "@/queries/courses-queries";
import { getUserProgress } from "@/queries/user-progress-queries";
import React from "react";
import List from "../_components/list";

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold ">Choose your prefer course 🚀</h1>
      <List courses={courses} activeCourseId={userProgress?.courseId!} />
    </div>
  );
};

export default CoursesPage;
