"use client";

import React, { useState, useTransition } from "react";
import Footer from "./footer";

import { toast } from "sonner";
import { useAudio, useMount } from "react-use";
import { ChallengeWithChallengeProgressAndOptions } from "@/types";
import Header from "./header";

type MainProps = {
  initialPercentage: number;
  initialChallengeWithChallengeProgressAndOptions: ChallengeWithChallengeProgressAndOptions;
  initialHeart: number;
  initialPoints: number;
};

const Main = ({
  initialHeart,
  initialChallengeWithChallengeProgressAndOptions,
  initialPercentage,
  initialPoints,
}: MainProps) => {
  const [correctAudio, _correct, correctControl] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _incorrect, incorrectControl] = useAudio({
    src: "incorrect.wav",
  });
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHeart);
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );

  const [challenge] = useState(initialChallengeWithChallengeProgressAndOptions);

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "correct" | "incorrect">(
    "none"
  );

  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    // TODO: Finish screen
    return <div>finish screen</div>;
  }

  const title =
    challenge.type === "MULTIPLE_CHOICE"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header hearts={hearts} percentage={percentage} />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div>
              {options.map((option) => (
                <div key={option.id}>{option.text}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer
        onCheck={() => {}}
        status={status}
        disabled={pending || !selectedOption}
      />
    </>
  );
};

export default Main;
