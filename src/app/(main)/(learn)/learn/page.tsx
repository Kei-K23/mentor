import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
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
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.course}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse?.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              title={unit.title}
              description={unit.description}
              order={unit.order}
              lesson={unit.lessons}
              activeLesson={
                courseProgress?.activeLesson as typeof lessons.$inferSelect & {
                  unit: typeof unitsSchema.$inferSelect;
                }
              }
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
