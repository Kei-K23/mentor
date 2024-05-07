// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { FirebaseCommentDocType } from "@/types";
// import {
//   collection,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
// import { db } from "@/firebase";
// import CommentItem from "./comment-item";

// type CommentScrollAreaProps = {
//   challengeId: number;
// };

// const CommentScrollArea = ({ challengeId }: CommentScrollAreaProps) => {
//   const [comments, setComments] = useState<FirebaseCommentDocType[]>([]);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const scrollTopRef = useRef<HTMLDivElement | null>(null);

//   // TODO: limit and pagination for comments
//   const collRef = collection(db, "comments");
//   const q = query(
//     collRef,
//     where("challengeId", "==", challengeId),
//     orderBy("createdAt", "desc")
//   );

//   // data fetching from firebase
//   useEffect(() => {
//     if (!challengeId) return;

//     const unSubscribe = onSnapshot(q, (snapshot) => {
//       if (snapshot.size > 0) {
//         // TODO: handle the type correctly
//         // @ts-ignore
//         snapshot.docs.map((doc) => {
//           const data = {
//             id: doc.id,
//             ...doc.data(),
//           } as FirebaseCommentDocType;

//           setComments((prev) => {
//             const isExist = !!prev.find((p) => p.id === data.id);

//             if (isExist) {
//               return [...prev];
//             }
//             return [data, ...prev];
//           });
//         });
//       }
//     });

//     return () => {
//       unSubscribe();
//     };
//   }, [challengeId]);

//   // auto scroll to bottom
//   useEffect(() => {
//     if (comments.length) {
//       scrollRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "end",
//       });
//     }
//   }, [comments.length]);

//   return (
//     <div
//       ref={scrollTopRef}
//       className="flex-1 flex flex-col w-full py-4 overflow-y-auto"
//     >
//       {comments.length ? (
//         comments.map((comment, i) => <CommentItem key={i} comment={comment} />)
//       ) : (
//         <div>
//           <p>No comments yet!</p>
//           <p className="text-xs text-muted-foreground">
//             Your comment can be first comment.
//           </p>
//         </div>
//       )}
//       <div ref={scrollRef} />
//     </div>
//   );
// };

// export default CommentScrollArea;

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
};

const CommentScrollArea = ({ challengeId }: CommentScrollAreaProps) => {
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
      setComments((prevComments) => [...prevComments, ...newComments]);
    });

    return () => unsubscribe();
  }, [challengeId, comments]); // Added comments to the dependency array

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
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <div>
          <p>No comments yet!</p>
          <p className="text-xs text-muted-foreground">
            Your comment can be the first comment.
          </p>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default CommentScrollArea;
