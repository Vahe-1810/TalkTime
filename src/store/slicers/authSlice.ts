import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUser } from "@tps/type";

const initialState: IUser = {
  currentUser: null,
  isAuth: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<IUser>) {
      state.isAuth = payload.isAuth;
      state.currentUser = payload.currentUser;
      state.loading = payload.loading;
    },
  },
});

export const user = (state: RootState) => state.auth;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;