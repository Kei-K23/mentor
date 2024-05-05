"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { FirebaseCommentDocType } from "@/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase";

type CommentScrollAreaProps = {
  challengeId: number;
};

const CommentScrollArea = ({ challengeId }: CommentScrollAreaProps) => {
  const [comments, setComments] = useState<FirebaseCommentDocType[]>([]);

  // TODO: limit and pagination for comments
  const collRef = collection(db, "comments");
  const q = query(collRef, where("challengeId", "==", challengeId));

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
    <ScrollArea className="flex-1 space-y-5">
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>{comment.userId}</p>
        </div>
      ))}
    </ScrollArea>
  );
};

export default CommentScrollArea;
