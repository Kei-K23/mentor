import { FirebaseCommentDocType } from "@/types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "..";

export const createComment = async (comment: FirebaseCommentDocType) => {
    const collRef = collection(db, "comments");
    const res = await addDoc(collRef, comment);

    if (!res.id) {
        throw new Error("Could not create comment");
    }
}