import Image from "next/image";
import React from "react";
import { Progress } from "./ui/progress";
import { Quest } from "@prisma/client";
import { Button } from "./ui/button";

type QuestsProps = {
  points: number;
  quests: Quest[];
};

const Quests = ({ points, quests }: QuestsProps) => {
  return (
    <div className="w-full">
      {quests.map((q) => {
        const progress = (points / q.points) * 100;

        return (
          <div
            className="flex items-center w-full gap-x-4 p-4 border-t-2"
            key={q.title}
          >
            <Image src={"/points.svg"} alt="points" width={60} height={60} />
            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-neutral-700 text-base lg:text-lg font-bold">
                {q.title}
              </p>
              <Progress value={progress} className="h-3" />
            </div>
            {progress === 100 && <Button className="ml-5">Claim</Button>}
          </div>
        );
      })}
    </div>
  );
};

export default Quests;
