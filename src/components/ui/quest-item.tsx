import { Quest } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Progress } from "./progress";
import ActionTooltip from "../action-tooltip";
import { CheckCheckIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type QuestItemProps = {
  quest: Quest;
  progress: number;
  isClaim: boolean;
  onClick: (id: number, points: number) => void;
  pending: boolean;
};

const QuestItem = ({
  quest,
  progress,
  isClaim,
  onClick,
  pending,
}: QuestItemProps) => {
  return (
    <div
      className="flex items-center w-full gap-x-4 p-4 border-t-2"
      key={quest.title}
    >
      <Image src={"/points.svg"} alt="points" width={60} height={60} />
      <div className="flex flex-col gap-y-2 w-full">
        <p className="text-slate-700 dark:text-slate-300 text-base lg:text-lg font-bold">
          {quest.title}
        </p>
        <Progress value={progress} className="h-3" />
      </div>
      <div className="ml-5">
        {isClaim && (
          <ActionTooltip text="Completed quest">
            <CheckCheckIcon className="w-6 h-6 md:w-8 md:h-8 stroke-[2] text-emerald-500" />
          </ActionTooltip>
        )}
        {!isClaim && progress >= 100 && (
          <Button
            onClick={() => onClick(quest.id, quest.points)}
            disabled={pending}
            className={cn(pending && "pointer-events-none")}
          >
            Claim
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestItem;
