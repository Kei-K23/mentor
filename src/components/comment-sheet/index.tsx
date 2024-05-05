import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import { Button } from "../ui/button";
import { NotebookPen } from "lucide-react";
import CommentForm from "./comment-form";

type CommentSheetProps = {
  challengeId: number;
};

const CommentSheet = ({ challengeId }: CommentSheetProps) => {
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
        <div className="flex-1"></div>
        <CommentForm />
      </SheetContent>
    </Sheet>
  );
};

export default CommentSheet;
