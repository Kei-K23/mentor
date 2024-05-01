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
import { createChallengeProgress } from "@/actions/challenge-progress-action";

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
  const isNext = challenges.length >= challenge.id + 1;

  const onNext = () => {
    if (isNext) {
      console.log(challenge.id);

      return router.push(`/challenges/${challenge.id + 1}`);
    }
  };

  if (!challenge) {
    // TODO: Finish screen
    return <div>finish screen</div>;
  }

  const onSelect = (id: number) => {
    if (!id || status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "incorrect") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = challenge.challengeOptions?.find((cp) => cp.correct);

    if (!correctOption) return;

    if (selectedOption === correctOption.id) {
      startTransition(() => {
        createChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.info === "hearts") {
              console.log("run out of hearts ");
              return;
            }

            correctControl.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);
          })
          .catch(() => {
            toast.error("Something went wrong! Try again.");
          });
      });
    }
  };

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
                  onSelect={onSelect}
                  selectedOption={selectedOption}
                  type={challenge.type}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer
        onCheck={onContinue}
        status={status}
        disabled={pending || !selectedOption}
      />
    </>
  );
};

export default Main;
