"use client";

import React, { useEffect, useRef, useState } from "react";
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
  currentUserId: string;
};

const CommentScrollArea = ({
  challengeId,
  currentUserId,
}: CommentScrollAreaProps) => {
  const [comments, setComments] = useState<FirebaseCommentDocType[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTopRef = useRef<HTMLDivElement | null>(null);
  const [isEdit, setIsEdit] = useState("");

  // Query for fetching comments
  const collRef = collection(db, "comments");
  const q = query(
    collRef,
    where("challengeId", "==", challengeId),
    orderBy("createdAt", "asc")
  );

  // Fetching comments from Firebase
  useEffect(() => {
    if (!challengeId) return;

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newComments: FirebaseCommentDocType[] = [];

      snapshot.docs.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        } as FirebaseCommentDocType;

        // Check if the comment already exists in state
        if (!comments.find((comment) => comment.id === data.id)) {
          newComments.push(data);
        }
      });

      // Update comments state with new unique comments
      setComments(newComments);
    });

    return () => {
      unsubscribe();
    };
  }, [challengeId]);

  // Auto scroll to bottom when new comments are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [comments.length]);

  return (
    <div
      ref={scrollTopRef}
      className="flex-1 flex flex-col w-full py-4 overflow-y-auto"
    >
      {comments.length ? (
        comments.map((comment) => (
          <CommentItem
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            currentUserId={currentUserId}
            key={comment.id}
            setComments={setComments}
            comment={comment}
          />
        ))
      ) : (
        <div>
          <p>No comments yet!</p>
          <p className="text-xs text-muted-foreground">
            Your comment can be the first comment.
          </p>
        </div>
        // <div>
        //   <p>Comments feature is under maintenance for better performance.</p>
        //   <p className="text-xs text-muted-foreground">
        //     This will be back soon.
        //   </p>
        // </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default CommentScrollArea;
