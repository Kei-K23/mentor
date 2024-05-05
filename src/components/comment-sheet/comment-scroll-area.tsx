"use client";

import React, { useEffect, useState } from "react";
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

  // TODO: limit and pagination for comments
  const collRef = collection(db, "comments");
  const q = query(
    collRef,
    where("challengeId", "==", challengeId),
    orderBy("createdAt", "asc")
  );

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

  return (
    <ScrollArea className="flex-1 flex flex-col w-full h-full space-y-5 mb-4">
      {comments.map((comment, i) => (
        <CommentItem key={i} comment={comment} />
      ))}
    </ScrollArea>
  );
};

export default CommentScrollArea;
