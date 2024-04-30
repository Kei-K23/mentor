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

  const { open: OpenNoEnoughHeartsModal } = useNoEnoughHeartsModal();

  useMount(() => {
    if (initialPercentage === 100) {
      OpenPracticeModal();
    }
  });

  const options = challenge?.challengeOptions ?? [];

  if (!challenge) {
    // TODO: Finish screen
    return <div>finish screen</div>;
  }

  const title =
    challenge.type === "MULTIPLE_CHOICE"
      ? "Select the correct meaning"
      : challenge.question;

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "incorrect") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    const correctOption = options.find((option) => option.correct);

    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              OpenNoEnoughHeartsModal();
              return;
            }

            correctControl.play();
            setStatus("correct");
            setPercentage((prev) => prev + 100 / challenges.length);

            if (initialPercentage === 100) {
              setHearts((prev) => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again!"));
      });
    } else {
      startTransition(() => {
        reduceHeart(challenge.id)
          .then((res) => {
            if (res?.error === "hearts") {
              OpenNoEnoughHeartsModal();
              return;
            }
            incorrectControl.play();
            setStatus("incorrect");
            if (!res?.error) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong. Please try again!"));
      });
    }
  };

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
              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              />
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
