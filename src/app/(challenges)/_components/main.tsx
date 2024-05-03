"use client";

import React, { useState, useTransition } from "react";
import Footer from "./footer";

import { toast } from "sonner";
import { useAudio } from "react-use";
import {
  ChallengeWithChallengeProgress,
  ChallengeWithChallengeProgressAndOptions,
} from "@/types";
import Header from "./header";
import CodeBlock from "@/components/code-block/code-block";
import BubbleTag from "./bubble-tag";
import Challenge from "./challenge";
import { useRouter } from "next/navigation";
import {
  createChallengeProgress,
  reduceHeart,
} from "@/actions/challenge-progress-action";
import { CheckCircle } from "lucide-react";
import { useNoEnoughHeartsModalStore } from "@/store/use-no-enough-hearts-modal-store";
import FinishedScreen from "./finished-screen";
import { User } from "@prisma/client";

type MainProps = {
  user: User;
  initialIsPractice: boolean;
  challenges: ChallengeWithChallengeProgress[];
  completedChallenge: ChallengeWithChallengeProgress[];
  initialPercentage: number;
  initialChallengeWithChallengeProgressAndOptions: ChallengeWithChallengeProgressAndOptions;
  initialHeart: number;
  initialPoints: number;
  isValidChallengeIdForActiveCourse: boolean;
  firstChallengeId: number;
  lastChallengeId: number;
};

const Main = ({
  user,
  initialIsPractice,
  challenges,
  completedChallenge,
  initialHeart,
  initialChallengeWithChallengeProgressAndOptions,
  initialPercentage,
  initialPoints,
  isValidChallengeIdForActiveCourse,
  firstChallengeId,
  lastChallengeId,
}: MainProps) => {
  const router = useRouter();
  const { open: openNoEnoughHeartsModal } = useNoEnoughHeartsModalStore();

  const [correctAudio, _correct, correctControl] = useAudio({
    src: "/correct.wav",
  });
  const [incorrectAudio, _incorrect, incorrectControl] = useAudio({
    src: "/incorrect.wav",
  });
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHeart);
  const [points] = useState(initialPoints);
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [isPractice] = useState(initialIsPractice);

  const [challenge] = useState(initialChallengeWithChallengeProgressAndOptions);

  const [selectedOption, setSelectedOption] = useState<number>();

  const [status, setStatus] = useState<"none" | "correct" | "incorrect">(
    "none"
  );

  const options = challenge?.challengeOptions ?? [];
  const isNext = challenge.id + 1 <= lastChallengeId;

  const isAlreadySolved = challenge.challengeProgress?.some(
    (cp) =>
      cp.challengeId === challenge.id && cp.completed && cp.userId === user.id
  );

  const onNext = () => {
    if (!isValidChallengeIdForActiveCourse) return;
    if (isNext) {
      return router.push(`/challenges/${challenge.id + 1}`);
    }
  };
  console.log("Test 1", challenges.length === completedChallenge.length);
  console.log("Test 2", isPractice);

  if (challenges.length === completedChallenge.length && !isPractice) {
    return (
      <FinishedScreen
        firstChallengeId={firstChallengeId}
        challenges={challenges}
        hearts={hearts}
      />
    );
  }

  const onSelect = (id: number) => {
    if (!id || status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "correct") {
      if (lastChallengeId === challenge.id && !isPractice) {
        const unCompletedChallenge = challenges.find(
          (c) => !c.challengeProgress?.find((cp) => !cp.completed)
        );

        if (unCompletedChallenge) {
          return router.push(`/challenges/${unCompletedChallenge?.id}`);
        }
      } else if (lastChallengeId === challenge.id && !isPractice) {
        return router.push("/learn");
      } else {
        onNext();
      }
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
              openNoEnoughHeartsModal();
              return;
            }

            correctControl.play();
            setStatus("correct");
            if (!isAlreadySolved) {
              setPercentage((prev) => prev + 100 / challenges.length);
            }
          })
          .catch(() => {
            toast.error("Something went wrong! Try again.");
          });
      });
    } else {
      startTransition(() => {
        reduceHeart(challenge.id)
          .then((res) => {
            if (res?.info === "hearts") {
              openNoEnoughHeartsModal();
              return;
            }

            incorrectControl.play();
            setStatus("incorrect");
            if (!res?.info) {
              setHearts((prev) => Math.max(prev - 1, 0));
            }
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
        firstChallengeId={firstChallengeId}
        lastChallengeId={lastChallengeId}
        challenge={challenge}
        hearts={hearts}
        points={points}
        percentage={percentage}
      />
      <div className="flex-1 mb-10">
        <div className="h-full flex items-center justify-center">
          <div className="mt-10 lg:min-h-[350px] max-w-[1350px] w-full px-6  flex lg:flex-row flex-col gap-y-12 lg:gap-x-10">
            <div className="w-full lg:w-1/2">
              <h3 className="text-lg mb-5 text-center lg:text-start font-bold flex items-center gap-x-4">
                {challenge.question}{" "}
                {isAlreadySolved && (
                  <span className="flex items-center gap-x-2 text-muted-foreground text-base">
                    <CheckCircle className="w-5 h-5 text-emerald-500 stroke-[2]" />
                    solved
                  </span>
                )}
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
                  disabled={pending}
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
