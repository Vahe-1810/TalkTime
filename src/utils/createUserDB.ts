import { db } from "@fb";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const setUserCollection = async (user: User) => {
  try {
    setDoc(doc(db, "users", user.uid), {
      photoURL: user?.photoURL,
      phoneNumber: user?.phoneNumber,
      fullName: user?.displayName,
      email: user?.email,
      id: user.uid,
      lastVisit: user?.metadata.lastSignInTime,
      isOnline: true,
      calling: {
        isCall: false,
        meetId: null,
        type: null,
        caller: null,
      },
    });
    setDoc(doc(db, "userChats", user.uid), {});
  } catch (error) {
    console.error(error);
  }
};
