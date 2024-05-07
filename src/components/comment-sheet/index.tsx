import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import { Button } from "../ui/button";
import { NotebookPen } from "lucide-react";
import CommentForm from "./comment-form";
import CommentScrollArea from "./comment-scroll-area";
import { useUser } from "@clerk/nextjs";

type CommentSheetProps = {
  challengeId: number;
};

const CommentSheet = ({ challengeId }: CommentSheetProps) => {
  const { user } = useUser();

  // TODO: check user exist or not if need

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"} variant={"ghost"}>
          <NotebookPen />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full">
        <SheetHeader>
          <SheetTitle>Comment section</SheetTitle>
        </SheetHeader>
        <CommentScrollArea
          currentUserId={user?.id!}
          challengeId={challengeId}
        />
        <CommentForm
          username={user?.username!}
          userId={user?.id!}
          userImageUrl={user?.imageUrl!}
          challengeId={challengeId}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
