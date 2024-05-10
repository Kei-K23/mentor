import React from "react";
import SearchHeader from "./search-header";
import UserProgress from "./user-progress";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { UserProgressWithCourse } from "@/types";

type MainLayoutHeaderProps = {
  userProgress: UserProgressWithCourse;
};

const MainLayoutHeader = ({ userProgress }: MainLayoutHeaderProps) => {
  return (
    <div className="hidden md:flex items-center gap-x-4">
      <SearchHeader />
      {userProgress ? (
        <UserProgress
          activeCourse={userProgress?.course!}
          hearts={userProgress?.hearts!}
          points={userProgress?.points!}
        />
      ) : (
        <Link
          href={"/courses"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
            })
          )}
        >
          Choose your prefer course to learn
        </Link>
      )}
    </div>
  );
};

export default MainLayoutHeader;
