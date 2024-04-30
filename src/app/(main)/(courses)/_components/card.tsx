import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type CardProps = {
  id: number;
  title: string;
  imageSrc: string | null;
  onClick: (id: number) => void;
  disabled: boolean;
  active: boolean;
};

const Card = ({
  id,
  imageSrc,
  title,
  onClick,
  disabled,
  active,
}: CardProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "relative h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-center p-3 pb-6 min-h-[217px] min-w-[200px] select-none",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className=" ">
        {active && (
          <div className="absolute top-2 right-2 rounded-md bg-green-500 flex items-center justify-center p-1.5">
            <CheckIcon className="w-4 h-4 stroke-[4] text-white" />
          </div>
        )}
      </div>

      <Image
        src={imageSrc!}
        alt={title}
        width={94}
        height={70}
        className="rounded-lg drop-shadow-md border object-cover"
      />

      <p className="text-gray-800 font-bold mt-3">{title}</p>
    </div>
  );
};

export default Card;
