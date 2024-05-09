import { User } from "@prisma/client";
import React from "react";
import { CourseWithChallengeProgressAndChallenges } from "@/types";
import Card from "./card";

type ListProps = {
  courses: CourseWithChallengeProgressAndChallenges[];
  user: User;
};

const List = ({ courses, user }: ListProps) => {
  const completedCourse = courses.filter((course) => {
    const challengeProgressFromCourse = course.challengeProgress.filter(
      (cp) => cp.completed && cp.userId === user.id
    );
    const isCompleted =
      challengeProgressFromCourse.length === course.challenges.length;
    if (isCompleted) {
      return course;
    }
  });

  return (
    <div className="pt-4 grid sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 w-full ">
      {!completedCourse.length ? (
        <h3>No completed course yet!</h3>
      ) : (
        completedCourse.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            imageSrc={course?.imageUrl}
          />
        ))
      )}
    </div>
  );
};

export default List;
