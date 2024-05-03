import { Button } from "@/components/ui/button";
import React from "react";

type SolvedChallengesProps = {
  easy: number;
  medium: number;
  hard: number;
};

const SolvedChallenges = ({ easy, medium, hard }: SolvedChallengesProps) => {
  return (
    <>
      <h3 className="mt-6 mb-3">Solved challenges</h3>
      <div className="flex items-center gap-x-2 mb-5">
        <Button variant={"outline"} className="font-bold">
          {easy}
          <span className="ml-2 text-green-500">Easy</span>
        </Button>
        <Button variant={"outline"} className="font-bold">
          {medium}
          <span className="ml-2 text-yellow-500">Medium</span>
        </Button>
        <Button variant={"outline"} className="font-bold">
          {hard}
          <span className="ml-2 text-rose-500">Hard</span>
        </Button>
      </div>
    </>
  );
};

export default SolvedChallenges;
