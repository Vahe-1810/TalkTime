import { user } from "@store/slicers/authSlice";
import { useTSelector } from "./typedHooks";

export const useAuth = () => {
  const { currentUser, isAuth, loading } = useTSelector(user);

  return {
    isAuth,
    loading,
    ...currentUser,
  };
};
