import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useExitModalStore } from "@/store/use-exit-modal-store";
import {
  ChallengeWithChallengeProgress,
  ChallengeWithChallengeProgressAndOptions,
} from "@/types";
import { ArrowLeftCircle, ArrowRightCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type HeaderProps = {
  hearts: number;
  points: number;
  percentage: number;
  challenges: ChallengeWithChallengeProgress[];
  challenge: ChallengeWithChallengeProgressAndOptions;
};

const Header = ({
  hearts,
  percentage,
  challenges,
  challenge,
  points,
}: HeaderProps) => {
  const { open } = useExitModalStore();
  const router = useRouter();
  const isPrevious = challenge.id - 1 > 0;
  const isNext = challenges.length >= challenge.id + 1;

  const onNext = () => {
    if (isNext) {
      return router.push(`/challenges/${challenge.id + 1}`);
    }
  };

  const onPrevious = () => {
    if (isPrevious) return router.push(`/challenges/${challenge.id - 1}`);
  };

  return (
    <header className="pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1350px] w-full mx-auto">
      <X
        onClick={open}
        className="text-slate-700 dark:text-slate-300 hover:opacity-75 transition cursor-pointer w-8 h-8"
      />
      <div className="flex gap-x-4 items-center">
        <ArrowLeftCircle
          aria-disabled={!isPrevious}
          onClick={onPrevious}
          className={cn(
            "text-slate-700 dark:text-slate-300 hover:opacity-75 transition cursor-pointer w-7 h-7",
            !isPrevious && "pointer-events-none opacity-70"
          )}
        />
        <ArrowRightCircle
          aria-disabled={!isNext}
          onClick={onNext}
          className={cn(
            "text-slate-700 dark:text-slate-300 hover:opacity-75 transition cursor-pointer w-7 h-7",
            !isNext && "pointer-events-none opacity-70"
          )}
        />
      </div>
      <Progress value={percentage} />

      <div className="flex items-center gap-x-6">
        <div className="text-rose-500 flex items-center font-bold">
          <Image
            src={"/heart.svg"}
            alt="heart icon"
            height={28}
            width={28}
            className="mr-2"
          />
          {hearts}
        </div>
        <div className="flex items-center font-bold">
          <Image
            src={"/points.svg"}
            alt="points icon"
            height={28}
            width={28}
            className="mr-2"
          />
          {points}
        </div>
      </div>
    </header>
  );
};

export default Header;
