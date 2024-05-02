"use client";

import Image from "next/image";
import React, { useTransition } from "react";
import { Progress } from "./ui/progress";
import { Quest, QuestProgress } from "@prisma/client";
import { Button } from "./ui/button";
import { CheckCheckIcon } from "lucide-react";
import { createQuestProgress } from "@/actions/quest-progress-action";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import ActionTooltip from "./action-tooltip";

type QuestsProps = {
  points: number;
  quests: Quest[];
  questsProgress: QuestProgress[];
};

const Quests = ({ points, quests, questsProgress }: QuestsProps) => {
  const [pending, startTransition] = useTransition();

  const onClick = (id: number, points: number) => {
    if (pending || !id) return;

    startTransition(() => {
      createQuestProgress(id, points)
        .then(() => {
          toast.success("Quest claimed successfully.");
        })
        .catch((e) => {
          toast.error(e);
        });
    });
  };

  return (
    <div className="w-full">
      {quests.map((q) => {
        const isClaim = !!questsProgress.find(
          (questProgress) =>
            questProgress.completed && questProgress.questId === q.id
        );
        const progress = isClaim ? 100 : (points / q.points) * 100;

        return (
          <div
            className="flex items-center w-full gap-x-4 p-4 border-t-2"
            key={q.title}
          >
            <Image src={"/points.svg"} alt="points" width={60} height={60} />
            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-slate-700 dark:text-slate-300 text-base lg:text-lg font-bold">
                {q.title}
              </p>
              <Progress value={progress} className="h-3" />
            </div>
            <div className="ml-5">
              {isClaim && (
                <ActionTooltip text="Completed quest">
                  <CheckCheckIcon className="w-8 h-8 stroke-[2] text-emerald-500" />
                </ActionTooltip>
              )}
              {!isClaim && progress === 100 && (
                <Button
                  onClick={() => onClick(q.id, q.points)}
                  disabled={pending}
                  className={cn(pending && "pointer-events-none")}
                >
                  Claim
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Quests;
