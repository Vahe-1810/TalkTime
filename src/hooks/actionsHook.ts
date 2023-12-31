import { changeUserInfo, setUser, setVerifing } from "@store/slicers/authSlice";
import { useTDispatch } from "./typedHooks";
import { IMeet, IUser, TypeMSGData, User } from "@tps/type";
import { fetchContacts } from "@store/thunks";
import { changeFriend, changeMessages } from "@store/slicers/messageSlice";
import { playMessageAudio, setLoading } from "@store/slicers/messageSlice";
import { DocumentData } from "firebase/firestore";
import { setMeet, setOpenModal } from "@store/slicers/callSlice";

export const useAuthActions = () => {
  const dispatch = useTDispatch();

  return {
    setUser: (user: IUser) => dispatch(setUser(user)),
    changeUserInfo: (pd: User) => dispatch(changeUserInfo(pd)),
    setVerifing: (b: boolean) => dispatch(setVerifing(b)),
  };
};

export const useContacts = () => {
  const dispatch = useTDispatch();

  return {
    fetchContacts: (docData: DocumentData) => dispatch(fetchContacts(docData)),
    changeFriend: (friend: User | null) => dispatch(changeFriend(friend)),
    changeMessages: (messages: TypeMSGData) => dispatch(changeMessages(messages)),
    setLoading: (b: boolean) => dispatch(setLoading(b)),
    playMessageAudio: () => dispatch(playMessageAudio()),
  };
};

export const useCall = () => {
  const dispatch = useTDispatch();

  return {
    setOpenModal: (b: boolean) => dispatch(setOpenModal(b)),
    setMeet: (data: IMeet) => dispatch(setMeet(data)),
  };
};
