import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IMeet } from "@tps/type";

const initialState = {
  openModal: false,
  calling: <IMeet>{},
};

const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setOpenModal(state, { payload }) {
      state.openModal = payload;
    },
    setMeet(state, { payload }) {
      state.calling = payload;
    },
  },
});

export const { setOpenModal, setMeet } = callSlice.actions;
export default callSlice.reducer;
export const callState = (state: RootState) => state.call;
