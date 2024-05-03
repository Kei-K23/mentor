import ActionTooltip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { BookmarkCheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type CardProps = {
  id: number;
  title: string;
  description?: string | null;
  imageSrc: string | null;
  onClick: (id: number) => void;
  disabled: boolean;
  active: boolean;
  isCompleted: boolean;
};

const Card = ({
  id,
  imageSrc,
  title,
  onClick,
  disabled,
  active,
  description,
  isCompleted,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "relative h-full border-2 rounded-xl border-b-4 hover:bg-black/5 dark:hover:bg-slate-900/60 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6 min-h-[217px] min-w-[200px] select-none",
        disabled && "pointer-events-none opacity-50",
        active && "border-sky-300"
      )}
    >
      <div>
        {isCompleted && (
          <ActionTooltip text="Completed">
            <div className="absolute top-2 left-2 rounded-md bg-sky-500 flex items-center justify-center p-1.5">
              <BookmarkCheckIcon className="w-5 h-5 stroke-[3] text-white" />
            </div>
          </ActionTooltip>
        )}
      </div>

      <Image src={imageSrc!} alt={title} width={94} height={70} />

      <p className="text-slate-800 dark:text-slate-200 font-bold mt-3">
        {title}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Card;
