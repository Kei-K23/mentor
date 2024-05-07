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

  // Query for fetching comments
  const collRef = collection(db, "comments");
  const q = query(
    collRef,
    where("challengeId", "==", challengeId),
    orderBy("createdAt", "asc")
  );

  // Fetching comments from Firebase
  // useEffect(() => {
  //   if (!challengeId) return;

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const newComments: FirebaseCommentDocType[] = [];

  //     snapshot.docs.forEach((doc) => {
  //       const data = {
  //         id: doc.id,
  //         ...doc.data(),
  //       } as FirebaseCommentDocType;

  //       // Check if the comment already exists in state
  //       if (!comments.find((comment) => comment.id === data.id)) {
  //         newComments.push(data);
  //       }
  //     });

  //     // Update comments state with new unique comments
  //     setComments((prevComments) => [...prevComments, ...newComments]);
  //   });

  //   return () => unsubscribe();
  // }, [challengeId, comments.length]); // Added comments to the dependency array

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
            currentUserId={currentUserId}
            key={comment.id}
            comment={comment}
          />
        ))
      ) : (
        // <div>
        //   <p>No comments yet!</p>
        //   <p className="text-xs text-muted-foreground">
        //     Your comment can be the first comment.
        //   </p>
        // </div>
        <>
          <CommentItem
            currentUserId={currentUserId}
            comment={{
              comment: "This is test 1",
              challengeId: challengeId,
              createdAt: new Date(),
              id: "1",
              userId: "user_2g2wd7jc5JzHuOzXeJnxrP9mkhB",
              username: "test test test test test test test teset teste sf",
              updatedAt: new Date(),
              userImageUrl: "",
            }}
          />
          <CommentItem
            currentUserId={currentUserId}
            comment={{
              comment: "This is test 2",
              challengeId: challengeId,
              createdAt: new Date(),
              id: "2",
              userId: "user_2g2wd7jc5JzHuOzXeJnxrP9mkhB",
              username: "test",
              updatedAt: new Date(),
              userImageUrl: "",
            }}
          />
          <CommentItem
            currentUserId={currentUserId}
            comment={{
              comment: "This is test 3",
              challengeId: challengeId,
              createdAt: new Date(),
              id: "3",
              userId: "user_2g2wd7jc5JzHuOzXeJnxrP9mkhB",
              username: "test",
              updatedAt: new Date(),
              userImageUrl: "",
            }}
          />
        </>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default CommentScrollArea;
