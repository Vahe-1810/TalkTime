import { AppDispatch, RootState } from "@store/index";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTDispatch: () => AppDispatch = useDispatch;
export const useTSelector: TypedUseSelectorHook<RootState> = useSelector;
