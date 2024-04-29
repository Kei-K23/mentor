import { getUserProgress } from "@/queries/user-progress-queries";
import { redirect } from "next/navigation";
import React from "react";

const LearnPage = async () => {
  const userProgressData = await getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.courseId || !userProgress.course) {
    redirect("/courses");
  }

  return (
    <div>
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
      <div className="w-[300px] h-[300px] bg-red-300" />
    </div>
  );
};

export default LearnPage;
