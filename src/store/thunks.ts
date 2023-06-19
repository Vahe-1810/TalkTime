/* eslint-disable */
// @ts-nocheck
import { db } from "@fb";
import { useContacts } from "@hooks/actionsHook";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, User } from "@tps/type";
import { DocumentReference, SnapshotMetadata, doc, getDoc, onSnapshot } from "firebase/firestore";
import moment from "moment";

export const fetchContacts = createAsyncThunk<[], SnapshotMetadata>(
  "message/fetchContacts",
  async (docData, { getState }) => {
    try {
      //prettier-ignore
      const { currentUser }: IUser = getState().auth;

      return new Promise((res, rej) => {
        const getChats = () => {
          const result = [];
          const friends = Object.entries(docData);
          friends.forEach(fnd => {
            const { date, ...other } = fnd[1];

            result.push({
              ...other,
              date: date && moment(date.toDate()).valueOf(),
            });
          });
          res(result);
        };
        if (currentUser?.id && docData) getChats();
      }).catch(console.log);
    } catch (e) {
      console.log(e);
    }
  }
);
