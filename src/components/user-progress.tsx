import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Course } from "@prisma/client";
import ActionTooltip from "./action-tooltip";

type UserProgressProps = {
  activeCourse: Course;
  hearts: number;
  points: number;
};

const UserProgress = ({ activeCourse, hearts, points }: UserProgressProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <ActionTooltip text="Current active course">
        <Link href={"/courses"}>
          <Button size={"sm"} variant={"ghost"}>
            <Image
              src={activeCourse?.imageUrl!}
              alt={activeCourse?.title}
              className="rounded-md border"
              width={32}
              height={32}
            />
          </Button>
        </Link>
      </ActionTooltip>

      <Link href={"/shop"}>
        <Button size={"sm"} variant={"ghost"}>
          <Image src={"/points.svg"} alt="points" width={28} height={28} />
          {points}
        </Button>
      </Link>

      <Link href={"/shop"}>
        <Button size={"sm"} variant={"ghost"}>
          <Image
            src={"/heart.svg"}
            alt="heart"
            width={28}
            height={28}
            className="mr-1"
          />
          {hearts}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
