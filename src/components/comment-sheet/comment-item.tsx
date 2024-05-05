"use client";

import { FirebaseCommentDocType } from "@/types";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

type CommentItemProps = {
  comment: FirebaseCommentDocType;
};

const CommentItem = ({ comment }: CommentItemProps) => {
  if (comment.comment) {
    return (
      <div className="mb-6 last:mb-0 hover:bg-slate-800/50 p-3 rounded-md">
        <div className="flex items-start">
          <Avatar>
            <AvatarImage src={comment.userImageUrl} className="object-cover" />
          </Avatar>
          <div className="ml-2">
            <Link
              href={`/profile/${comment.userId}`}
              className="hover:text-sky-500 font-bold"
            >
              {comment.username}
            </Link>
            <p className="mt-2 font-semibold text-muted-foreground">
              {comment.comment}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default CommentItem;
