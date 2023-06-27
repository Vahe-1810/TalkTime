import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContacts } from "@tps/type";
import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import moment from "moment";

//prettier-ignore
export const fetchContacts = createAsyncThunk<IContacts[], DocumentData>(
  "message/fetchContacts",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (docData): Promise<any> => {
    try {
      return new Promise(res => {
        const getChats = () => {
          const result = <IContacts[]>[];
          const friends = Object.entries(docData);

          friends.forEach(fnd => {
            const { date,  ...other } = fnd[1];
            
            result.push({
              ...other,
              date: date && moment(date.toDate()).valueOf(),
            });
          });
          res(result);
        };
        if (docData) getChats();
        else return []
      })
      .then((result: unknown) => {
        const contacts = result as IContacts[]
        
        return Promise.all(contacts.map(async ({userInfo, lastMessage, date}) => {
          if(userInfo instanceof DocumentReference) {
            const userData = await getDoc(userInfo)
            
            return { userInfo: {...userData.data()}, lastMessage, date}
          }
        }))
      })
      .catch(console.log);
    } catch (e) {
      console.log(e);
    }
  }
);
