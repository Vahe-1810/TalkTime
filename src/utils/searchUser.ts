import { db } from "@fb";
import { DocumentData, collection, getDocs, or, query, where } from "firebase/firestore";

export const searchUser = async (value: string, setResult: (r: DocumentData[]) => void) => {
  const q = query(
    collection(db, "users"),
    or(where("fullName", "==", value), where("email", "==", value))
  );
  const querySnap = await getDocs(q);

  const result: DocumentData[] = [];
  querySnap.forEach(u => {
    result.push(u.data());
  });
  setResult(result);
};
