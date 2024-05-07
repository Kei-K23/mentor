"use client";

import { FirebaseCommentDocType } from "@/types";
import React, { useState, useTransition } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pen, Trash2Icon } from "lucide-react";
import {
  deleteComment,
  updateComment,
} from "@/firebase/actions/comments-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "../ui/input";

type CommentItemProps = {
  comment: FirebaseCommentDocType;
  currentUserId: string;
  setIsEdit: (isEdit: string) => void;
  isEdit: string;
};

const CommentItem = ({
  comment,
  currentUserId,
  isEdit,
  setIsEdit,
}: CommentItemProps) => {
  const [pending, startTransition] = useTransition();
  const [newComment, setNewComment] = useState(comment.comment);

  const onDeleteComment = () => {
    startTransition(() => {
      deleteComment({
        commentId: comment.id!,
        userId: currentUserId,
        challengeId: comment.challengeId,
      }).catch((e) => toast.error(e));
    });
  };

  const onEditComment = () => {
    if (newComment === comment.comment) {
      return setIsEdit("");
    }
    startTransition(() => {
      updateComment({
        commentId: comment.id!,
        userId: currentUserId,
        challengeId: comment.challengeId,
        comment: newComment,
      })
        .then(() => setIsEdit(""))
        .catch((e) => toast.error(e));
    });
  };

  if (comment.comment) {
    return (
      <div className="mb-6 last:mb-0 hover:bg-slate-800/50 p-3 rounded-md">
        <div className="flex items-start">
          <Avatar>
            <AvatarImage src={comment.userImageUrl} className="object-cover" />
          </Avatar>
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <Link
                href={`/profile/${comment.userId}`}
                className="hover:text-sky-500 font-bold flex-1"
              >
                <p className="truncate w-[140px]">{comment.username}</p>
              </Link>
              {currentUserId === comment.userId && (
                <div className="ml-auto">
                  <Button
                    disabled={pending}
                    variant={"ghost"}
                    size={"sm"}
                    className={cn(pending && "pointer-events-none")}
                    onClick={() => setIsEdit(comment.id!)}
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    disabled={pending}
                    variant={"ghost"}
                    size={"sm"}
                    className={cn(
                      "ml-3 hover:text-rose-500",
                      pending && "pointer-events-none"
                    )}
                    onClick={onDeleteComment}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            {isEdit === comment.id ? (
              <div className="mt-2">
                <Input
                  type="text"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  onBlur={onEditComment}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onEditComment();
                    }
                  }}
                  autoFocus
                />
              </div>
            ) : (
              <p className="mt-2 font-semibold text-muted-foreground">
                {newComment}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CommentItem;
