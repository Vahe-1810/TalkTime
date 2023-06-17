export interface User {
  email: string | null;
  id: string;
  photoURL: string | null;
  phoneNumber: string | null;
  fullName: string | null;
  lastVisit: string;
  contacts?: unknown;
}

export interface IUser {
  currentUser: User | null;
  isAuth: boolean;
  loading: boolean;
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
};

export interface messageType {
  contacts: [];
  messagesData: TypeMSGData;
  currentFriendInfo: User | null;
}

type TypeMSGData = {
  chatCreated?: string;
  usersRefArr?: string[];
  messages?: IMessage[];
};

export interface IMessage {
  date: unknown;
  message: string;
  sender: string;
}
