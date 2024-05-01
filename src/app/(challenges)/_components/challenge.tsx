import { cn } from "@/lib/utils";
import React from "react";
import ChallengeOptionComponent from "./challenge-option";
import { ChallengeOption, ChallengeType } from "@prisma/client";

type ChallengeProps = {
  options: ChallengeOption[];
  onSelect: (id: number) => void;
  status: "none" | "correct" | "incorrect";
  selectedOption?: number;
  disabled?: boolean;
  type: ChallengeType;
};

const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn("grid gap-2", type === "MULTIPLE_CHOICE" && "grid-cols-1")}
    >
      {options.map((option, i) => (
        <ChallengeOptionComponent
          key={option.id}
          id={option.id}
          text={option.text}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled!}
          type={type}
        />
      ))}
    </div>
  );
};

export default Challenge;
