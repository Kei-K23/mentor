import { FirebaseCommentDocType } from "@/types";
import { collection, addDoc, deleteDoc, getDoc, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "..";

export const createComment = async (comment: FirebaseCommentDocType) => {
    try {
        const collRef = collection(db, "comments");
        const res = await addDoc(collRef, comment);

        if (!res.id) {
            throw new Error("Could not create comment");
        }
    } catch (e: any) {
        console.log(e);

        throw new Error("Something went wrong")
    }
}

export const deleteComment = async ({ commentId, userId, challengeId }: { commentId: string, userId: string, challengeId: number }) => {
    try {
        const docRef = doc(db, "comments", commentId);
        const commentDoc = await getDoc(docRef);
        if (!commentDoc.exists()) {
            throw new Error("Could not find comment to delete");
        } else {
            if (commentDoc.data().userId === userId && commentDoc.data().challengeId === challengeId) {
                await deleteDoc(docRef);
            } else {
                throw new Error("Unauthorized");
            }
        }
    } catch (e: any) {
        throw new Error("Something went wrong")
    }
}

export const updateComment = async ({ commentId, userId, challengeId, comment }: { commentId: string, userId: string, challengeId: number, comment: string }) => {
    try {
        const docRef = doc(db, "comments", commentId);
        const commentDoc = await getDoc(docRef);
        if (!commentDoc.exists()) {
            throw new Error("Could not find comment to update");
        } else {
            if (commentDoc.data().userId === userId && commentDoc.data().challengeId === challengeId) {
                await updateDoc(docRef, {
                    comment: comment
                });
            } else {
                throw new Error("Unauthorized");
            }
        }
    } catch (e: any) {
        throw new Error("Something went wrong")
    }
}
