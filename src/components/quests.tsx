"use client";

import React, { useTransition } from "react";
import { Quest, QuestProgress } from "@prisma/client";
import { createQuestProgress } from "@/actions/quest-progress-action";
import { toast } from "sonner";
import QuestItem from "./ui/quest-item";

type QuestsProps = {
  points: number;
  quests: Quest[];
  questsProgress: QuestProgress[];
  onlyShowUncompleted?: boolean;
};

const Quests = ({
  points,
  quests,
  questsProgress,
  onlyShowUncompleted = false,
}: QuestsProps) => {
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

  let uncompletedQuestsToShow = 3; // Track the number of uncompleted quests to show

  return (
    <div className="w-full">
      {onlyShowUncompleted && (
        <h3 className="text-muted-foreground font-bold mb-3">Quests</h3>
      )}
      {quests.map((q, i) => {
        const isClaim = !!questsProgress.find(
          (questProgress) =>
            questProgress.completed && questProgress.questId === q.id
        );
        const progress = isClaim ? 100 : (points / q.points) * 100;

        const uncompleted = progress < 100 || !isClaim;

        if (onlyShowUncompleted) {
          // Show only uncompleted quests and respect the limit of 3
          if (uncompleted && uncompletedQuestsToShow > 0) {
            uncompletedQuestsToShow--;
            return (
              <QuestItem
                key={q.id}
                quest={q}
                progress={progress}
                onClick={onClick}
                pending={pending}
                isClaim={isClaim}
              />
            );
          }
          return null; // Skip completed quests or if the limit is reached
        } else {
          return (
            <QuestItem
              key={q.id}
              quest={q}
              progress={progress}
              onClick={onClick}
              pending={pending}
              isClaim={isClaim}
            />
          );
        }
      })}
    </div>
  );
};

export default Quests;
