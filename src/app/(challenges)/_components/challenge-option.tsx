import { cn } from "@/lib/utils";
import { ChallengeType } from "@prisma/client";
import React, { useCallback } from "react";
import { useKey } from "react-use";

type ChallengeOptionProps = {
  id: number;
  onClick: () => void;
  text: string;
  shortcut: string;
  selected?: boolean;
  disabled: boolean;
  status: "none" | "correct" | "incorrect";
  type: ChallengeType;
};

const ChallengeOption = ({
  onClick,
  text,
  shortcut,
  selected,
  disabled,
  status,
  type,
}: ChallengeOptionProps) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected &&
          "border-sky-300 bg-sky-100 hover:bg-sky-100 dark:bg-sky-900 dark:hover:bg-sky-900",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "incorrect" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "MULTIPLE_CHOICE" && "lg:p-3 w-full"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between",
          type === "MULTIPLE_CHOICE" && "flex-row-reverse"
        )}
      >
        {type === "MULTIPLE_CHOICE" && <div />}
        <p
          className={cn(
            "text-slate-800 dark:text-slate-200 text-sm font-bold lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "incorrect" && "text-rose-500"
          )}
        >
          {text}
        </p>
        <div
          className={cn(
            "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
            selected && "text-sky-500 border-sky-400",
            selected &&
              status === "correct" &&
              "text-green-500 border-green-500",
            selected && status === "incorrect" && "text-rose-500 border-red-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};

export default ChallengeOption;
