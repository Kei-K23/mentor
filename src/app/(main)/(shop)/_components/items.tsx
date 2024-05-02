"use client";

import { refillHeart } from "@/actions/challenge-progress-action";
import { Button } from "@/components/ui/button";
import { POINT_TO_FILL, POINT_TO_FULL_FILL } from "@/shared/constant";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useTransition } from "react";
import { toast } from "sonner";

type ItemsProps = {
  hearts: number;
  points: number;
};

const Items = ({ hearts, points }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHeart = (p: number) => {
    if (pending || hearts === 5 || points < POINT_TO_FILL) return;

    startTransition(() => {
      refillHeart(p)
        .then((res) => {
          if (res?.info === "hearts") {
            return toast.error("No enough points to fill");
          }

          toast.success("Hearts refilled");
        })
        .catch((e) => toast.error(e));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <div className="flex items-center">
          <span className="text-lg md:text-2xl font-semibold">5</span> <X />
          <Image
            src={"/heart.svg"}
            alt="heart"
            height={40}
            width={40}
            className="hidden md:block"
          />
          <Image
            src={"/heart.svg"}
            alt="heart"
            height={30}
            width={30}
            className="block md:hidden"
          />
        </div>
        <div className="flex-1">
          <p className="text-slate-700 dark:text-slate-300 text-base font-bold">
            Full refill hearts
          </p>
        </div>
        <Button
          onClick={() => onRefillHeart(POINT_TO_FULL_FILL)}
          disabled={pending || hearts === 5 || points < POINT_TO_FULL_FILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src={"/points.svg"} alt="points" height={25} width={25} />
              <p className="text-[17px]">{POINT_TO_FULL_FILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <div className="flex items-center">
          <span className="text-lg md:text-2xl font-semibold">1</span> <X />
          <Image
            src={"/heart.svg"}
            alt="heart"
            height={40}
            width={40}
            className="hidden md:block"
          />
          <Image
            src={"/heart.svg"}
            alt="heart"
            height={30}
            width={30}
            className="block md:hidden"
          />
        </div>
        <div className="flex-1">
          <p className="text-slate-700 dark:text-slate-300 text-base font-bold">
            Refill heart
          </p>
        </div>
        <Button
          onClick={() => onRefillHeart(POINT_TO_FILL)}
          disabled={pending || hearts === 5 || points < POINT_TO_FILL}
        >
          {hearts === 5 ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src={"/points.svg"} alt="points" height={25} width={25} />
              <p className="text-[17px]">{POINT_TO_FILL}</p>
            </div>
          )}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
