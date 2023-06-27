import { Timestamp } from "firebase/firestore";

export interface User {
  email: string | null;
  id: string;
  photoURL: string | null;
  phoneNumber?: string | null;
  fullName: string | null;
  lastVisit: string;
}

export interface IUser {
  currentUser: User | null;
  isAuth: boolean;
  loading: boolean;
  isVerifing: boolean;
}

export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup extends ISignin {
  confirm: string;
}

export type TypeOpen = {
  open: boolean;
  setOpen: (prop: boolean) => void;
  setOpenChat: (b: boolean) => void;
};

export interface messageType {
  contacts: IContacts[] | [];
  messagesData: TypeMSGData;
  currentFriendInfo: User | null;
  loading: boolean;
  messageAudio: string;
}

export interface IContacts {
  date: number;
  lastMessage: {
    text: string;
    sender: string;
  };
  userInfo: User;
}

export type TypeMSGData = {
  chatCreated?: string;
  usersRefArr?: string[];
  messages?: IMessage[];
};

export interface IMessage {
  date: Timestamp | string;
  message: string;
  sender: string;
}
