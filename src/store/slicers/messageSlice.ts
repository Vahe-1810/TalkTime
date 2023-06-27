import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fetchContacts } from "@store/thunks";
import { User, messageType } from "@tps/type";
import sound from "@assets/whatssapp_web.mp3";

const initialState: messageType = {
  contacts: [],
  messagesData: {},
  currentFriendInfo: null,
  loading: true,
  messageAudio: sound,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeFriend(state, { payload }: PayloadAction<User | null>) {
      state.currentFriendInfo = payload;
    },
    changeMessages(state, { payload }) {
      state.messagesData = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    playMessageAudio(state) {
      new Audio(state.messageAudio).play();
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
export const { changeFriend, changeMessages, setLoading, playMessageAudio } = messageSlice.actions;
