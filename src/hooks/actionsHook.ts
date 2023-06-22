import { changeUserInfo, setUser } from "@store/slicers/authSlice";
import { useTDispatch } from "./typedHooks";
import { IUser, TypeMSGData, User } from "@tps/type";
import { fetchContacts } from "@store/thunks";
import { changeFriend, changeMessages, setLoading } from "@store/slicers/messageSlice";
import { DocumentData } from "firebase/firestore";

export const useAuthActions = () => {
  const dispatch = useTDispatch();

  return {
    setUser: (user: IUser) => dispatch(setUser(user)),
    changeUserInfo: (pd: User) => dispatch(changeUserInfo(pd)),
  };
};

export const useContacts = () => {
  const dispatch = useTDispatch();

  return {
    fetchContacts: (docData: DocumentData) => dispatch(fetchContacts(docData)),
    changeFriend: (friend: User | null) => dispatch(changeFriend(friend)),
    changeMessages: (messages: TypeMSGData) => dispatch(changeMessages(messages)),
    setLoading: (b: boolean) => dispatch(setLoading(b)),
  };
};
