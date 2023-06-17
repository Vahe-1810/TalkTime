/* eslint-disable */
// @ts-nocheck
import { db } from "@fb";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, User } from "@tps/type";
import { DocumentReference, doc, getDoc } from "firebase/firestore";

export const fetchContacts = createAsyncThunk("message/fetchContacts", async (_, { getState }) => {
  //prettier-ignore
  const { currentUser }: IUser = getState().auth;
  const userData = (await getDoc(doc(db, "users", currentUser.id))).data();

  return await Promise.all(
    userData?.contacts.map(async (cnt: DocumentReference) => {
      const { contacts, ...other } = <User>(await getDoc(cnt)).data();
      return other;
    })
  ).catch(console.log);
});
