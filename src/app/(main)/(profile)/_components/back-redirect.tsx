"use client";
import ActionTooltip from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { ArrowLeftSquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackRedirect = () => {
  const router = useRouter();
  return (
    <ActionTooltip text="Back">
      <Button
        variant={"ghost"}
        onClick={() => router.back()}
        className="absolute left-0 top-0"
      >
        <ArrowLeftSquareIcon className="w-6 h-6 text-muted-foreground" />
      </Button>
    </ActionTooltip>
  );
};

export default BackRedirect;
