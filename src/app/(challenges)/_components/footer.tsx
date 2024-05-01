import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { useKey, useMedia } from "react-use";

type FooterProps = {
  firstChallengeId?: number;
  onCheck: () => void;
  status: "none" | "correct" | "incorrect" | "completed";
  disabled?: boolean;
};

const Footer = ({
  onCheck,
  status,
  disabled,
  firstChallengeId,
}: FooterProps) => {
  const isMobile = useMedia("(max-width: 1024px)");

  useKey("Enter", onCheck, {}, [onCheck]);

  return (
    <footer
      className={cn(
        " h-[100px] border-t-2",
        status === "correct" && "bg-green-100 border-transparent",
        status === "incorrect" && "bg-rose-100 border-transparent"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Correct answer!
          </div>
        )}
        {status === "incorrect" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again!
          </div>
        )}
        {status === "completed" && (
          <Button
            variant={"default"}
            size={isMobile ? "sm" : "lg"}
            onClick={() =>
              (window.location.href = `/challenges/${firstChallengeId}`)
            }
          >
            Practice again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "incorrect" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
