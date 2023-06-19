import { User as FBUser } from "firebase/auth";
import { IUser, User } from "@tps/type";

type TypeTggUser = (user: FBUser | null) => IUser;

export const toggleUser: TypeTggUser = user => {
  if (user)
    return {
      isAuth: true,
      loading: false,
      currentUser: <User>{
        email: user?.email,
        id: user?.uid,
        phoneNumber: user?.phoneNumber,
        photoURL: user?.photoURL,
        fullName: user?.displayName,
        lastVisit: user?.metadata.lastSignInTime,
        contacts: [],
      },
    };

  return {
    isAuth: false,
    loading: false,
    currentUser: null,
  };
};
// eslint-disable-next-line
export const googleToggle = ({ userChats, contacts, ...data }: any) => ({
  isAuth: true,
  loading: false,
  currentUser: data,
});
