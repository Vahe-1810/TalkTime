/* eslint-disable */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchContacts } from "@store/thunks";
import { User, messageType } from "@tps/type";

const initialState: messageType = {
  contacts: [],
  messagesData: {},
  currentFriendInfo: null,
  loading: true,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeFriend(state, { payload }: PayloadAction<User>) {
      state.currentFriendInfo = payload;
    },
    changeMessages(state, { payload }) {
      state.messagesData = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.contacts = payload;
      state.loading = false;
    });
  },
});

export default messageSlice.reducer;
export const messageState = (state: RootState) => state.message;
export const { changeFriend, changeMessages } = messageSlice.actions;
