"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { createUserProgress } from "@/actions/user-progress-action";
import { toast } from "sonner";
import { CourseWithChallengeProgressAndChallenges } from "@/types";
import Card from "./card";

type ListProps = {
  courses: CourseWithChallengeProgressAndChallenges[];
  user: User;
};

const List = ({ courses, user }: ListProps) => {
  return (
    <div className="pt-4 grid sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 w-full ">
      {courses.map((course) => {
        const challengeProgressFromCourse = course.challengeProgress.filter(
          (cp) => cp.completed && cp.userId === user.id
        );
        const isCompleted =
          challengeProgressFromCourse.length === course.challenges.length;
        if (isCompleted) {
          return (
            <Card
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              imageSrc={course.imageUrl}
            />
          );
        }
      })}
    </div>
  );
};

export default List;
