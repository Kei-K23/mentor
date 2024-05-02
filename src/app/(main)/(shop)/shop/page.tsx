import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Items from "../_componentts/items";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
};

const ShopPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  const isProMember = !!userSubscription?.isActive;
  if (!userProgress || !userProgress.activeCourse) return redirect("/courses");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6 py-4">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/shop.svg"}
            alt="Shop"
            height={90}
            width={90}
            className=""
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your point for endless learning
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={isProMember}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
