"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import Card from "./card";
import { createUserProgress } from "@/actions/user-progress-action";
import { toast } from "sonner";
import { CourseWithChallengeProgressAndChallenges } from "@/types";

type ListProps = {
  courses: CourseWithChallengeProgressAndChallenges[];
  activeCourseId: number;
  user: User;
};

const List = ({ courses, activeCourseId, user }: ListProps) => {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push("/learn");
    }

    startTransition(() => {
      createUserProgress(id)
        .then(() => router.push("/learn"))
        .catch((e) => toast.error(e));
    });
  };

  return (
    <div className="pt-6 grid sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 w-full ">
      {courses.map((course) => {
        const challengeProgressFromCourse = course.challengeProgress.filter(
          (cp) => cp.completed && cp.userId === user.id
        );
        const isCompleted =
          challengeProgressFromCourse.length === course.challenges.length;
        return (
          <Card
            key={course.id}
            id={course.id}
            isCompleted={isCompleted}
            title={course.title}
            description={course.description}
            imageSrc={course.imageUrl}
            onClick={onClick}
            disabled={pending}
            active={course.id === activeCourseId}
          />
        );
      })}
    </div>
  );
};

export default List;
