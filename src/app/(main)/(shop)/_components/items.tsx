"use client";

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

  const onRefillHeart = () => {
    if (pending || hearts === 5 || points < POINT_TO_FILL) return;

    startTransition(() => {
      //   refillHeart().catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <div className="flex items-center">
          <span className="text-2xl font-semibold">5</span> <X />
          <Image src={"/heart.svg"} alt="heart" height={40} width={40} />
        </div>
        <div className="flex-1">
          <p className="text-neutral-700 text-base font-bold">
            Full refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHeart}
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
          <span className="text-2xl font-semibold">1</span> <X />
          <Image src={"/heart.svg"} alt="heart" height={40} width={40} />
        </div>
        <div className="flex-1">
          <p className="text-neutral-700 text-base font-bold">Refill heart</p>
        </div>
        <Button
          onClick={onRefillHeart}
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
