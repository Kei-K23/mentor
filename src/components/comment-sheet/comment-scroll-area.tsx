"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { FirebaseCommentDocType } from "@/types";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import CommentItem from "./comment-item";

type CommentScrollAreaProps = {
  challengeId: number;
};

const CommentScrollArea = ({ challengeId }: CommentScrollAreaProps) => {
  const [comments, setComments] = useState<FirebaseCommentDocType[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // TODO: limit and pagination for comments
  const collRef = collection(db, "comments");
  const q = query(
    collRef,
    where("challengeId", "==", challengeId),
    orderBy("createdAt", "asc")
  );

  // data fetching from firebase
  useEffect(() => {
    if (!challengeId) return;

    const unSubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.size > 0) {
        // TODO: handle the type correctly
        // @ts-ignore
        setComments(snapshot.docs);
        snapshot.docs.map((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          } as FirebaseCommentDocType;

          setComments((prev) => [...prev, data]);
        });
      }
    });

    return () => {
      unSubscribe();
    };
  }, [challengeId]);

  // auto scroll to bottom
  useEffect(() => {
    if (comments.length) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [comments.length]);

  return (
    <ScrollArea className="flex-1 flex flex-col w-full h-full space-y-5 mb-4">
      {comments.length ? (
        comments.map((comment, i) => <CommentItem key={i} comment={comment} />)
      ) : (
        <div>
          <p>No comments yet!</p>
          <p className="text-xs text-muted-foreground">
            Your comment can be first comment.
          </p>
        </div>
      )}
      <div ref={scrollRef} />
    </ScrollArea>
  );
};

export default CommentScrollArea;
