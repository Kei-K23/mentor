"use client";

import React, { useState, useTransition } from "react";
import Footer from "./footer";

import { toast } from "sonner";
import { useAudio, useMount } from "react-use";
import {
  ChallengeWithChallengeProgress,
  ChallengeWithChallengeProgressAndOptions,
} from "@/types";
import Header from "./header";
import CodeBlock from "@/components/code-block/code-block";
import BubbleTag from "./bubble-tag";
import Challenge from "./challenge";
import { useRouter } from "next/navigation";

type MainProps = {
  challenges: ChallengeWithChallengeProgress[];
  initialPercentage: number;
  initialChallengeWithChallengeProgressAndOptions: ChallengeWithChallengeProgressAndOptions;
  initialHeart: number;
  initialPoints: number;
};

const Main = ({
  challenges,
  initialHeart,
  initialChallengeWithChallengeProgressAndOptions,
  initialPercentage,
  initialPoints,
}: MainProps) => {
  const router = useRouter();

  const [correctAudio, _correct, correctControl] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _incorrect, incorrectControl] = useAudio({
    src: "incorrect.wav",
  });
  const [pending, startTransition] = useTransition();
  const [hearts, setHearts] = useState(initialHeart);
  const [points, setPoints] = useState(initialPoints);
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

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      <Header
        challenges={challenges}
        challenge={challenge}
        hearts={hearts}
        points={points}
        percentage={percentage}
      />
      <div className="flex-1 mb-10">
        <div className="h-full flex items-center justify-center">
          <div className="mt-10 lg:min-h-[350px] max-w-[1350px] w-full px-6  flex lg:flex-row flex-col gap-y-12 lg:gap-x-10">
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg mb-5 text-center lg:text-start font-bold">
                {challenge.question}
              </h3>
              {challenge?.code && <CodeBlock code={challenge.code} />}
            </div>
            <div className="w-full lg:w-1/2">
              <BubbleTag question="Choose the correct one?" />
              <div>
                <Challenge
                  options={options}
                  status={status}
                  onSelect={() => {}}
                  type={challenge.type}
                />
              </div>
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
