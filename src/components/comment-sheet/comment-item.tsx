"use client";

import { FirebaseCommentDocType } from "@/types";
import React, { useTransition } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteComment } from "@/firebase/actions/comments-action";
import { cn } from "@/lib/utils";

type CommentItemProps = {
  comment: FirebaseCommentDocType;
  currentUserId: string;
};

const CommentItem = ({ comment, currentUserId }: CommentItemProps) => {
  const [pending, startTransition] = useTransition();

  const onDeleteComment = () => {
    startTransition(() => {
      deleteComment({
        commentId: comment.id!,
        userId: currentUserId,
        challengeId: comment.challengeId,
      });
    });
  };

  if (comment.comment) {
    return (
      <div className="mb-6 last:mb-0 hover:bg-slate-800/50 p-3 rounded-md">
        <div className="flex items-start">
          <Avatar>
            <AvatarImage src={comment.userImageUrl} className="object-cover" />
          </Avatar>
          <div className="ml-2">
            <div>
              <Link
                href={`/profile/${comment.userId}`}
                className="hover:text-sky-500 font-bold truncate"
              >
                {comment.username}
              </Link>
              {currentUserId === comment.userId && (
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
              )}
            </div>
            <p className="mt-2 font-semibold text-muted-foreground">
              {comment.comment}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CommentItem;
