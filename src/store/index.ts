import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slicers/authSlice";
import messageSlice from "./slicers/messageSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    message: messageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
