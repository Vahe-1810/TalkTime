import { db } from "@fb";
import { User, deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";

export const clearUserOnError = (uCred: User) => {
  Promise.allSettled([
    deleteUser(uCred),
    deleteDoc(doc(db, "users", uCred.uid)),
    deleteDoc(doc(db, "userChats", uCred.uid)),
  ]);
};
