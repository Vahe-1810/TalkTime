import { setUser } from "@store/slicers/authSlice";
import { useTDispatch } from "./typedHooks";
import { IUser, User } from "@tps/type";
import { fetchContacts } from "@store/thunks";
import { changeFriend, changeMessages } from "@store/slicers/messageSlice";
import { SnapshotMetadata } from "firebase/firestore";

export const useAuthActions = () => {
  const dispatch = useTDispatch();

  return {
    setUser: (user: IUser) => dispatch(setUser(user)),
  };
};

export const useContacts = () => {
  const dispatch = useTDispatch();

  return {
    fetchContacts: (docData: SnapshotMetadata) => dispatch(fetchContacts(docData)),
    changeFriend: (friend: User) => dispatch(changeFriend(friend)),
    changeMessages: (messages: []) => dispatch(changeMessages(messages)),
  };
};
