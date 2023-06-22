import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { Badge, ListItemButton } from "@mui/material";
import { mainStyles } from "../styles";
import { DocumentData, Timestamp, doc, getDoc } from "firebase/firestore";
import { serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { emailName } from "@utils/emailToDisplay";
import { useAuth } from "@hooks/authHook";
import { db } from "@fb";
import { useContacts } from "@hooks/actionsHook";
import moment from "moment";
import { IMessage } from "@tps/type";

type Props = {
  listData: DocumentData;
  setOpenChat: (t: boolean) => void;
};

const Contact = ({ listData, setOpenChat }: Props) => {
  const { id } = useAuth();
  const { changeFriend, changeMessages } = useContacts();
  const { userInfo } = listData;

  const handleSelect = async () => {
    const mixedId = [id, userInfo.id].sort().join("");
    try {
      const res = await getDoc(doc(db, "chats", mixedId));

      setOpenChat(true);

      if (!res.exists()) {
        await setDoc(doc(db, "chats", mixedId), {
          messages: [],
        });

        id &&
          (await updateDoc(doc(db, "userChats", id), {
            [mixedId + ".userInfo"]: doc(db, "users", userInfo.id),
            [mixedId + ".date"]: serverTimestamp(),
          }));
        id &&
          (await updateDoc(doc(db, "userChats", userInfo.id), {
            [mixedId + ".userInfo"]: doc(db, "users", id),
            [mixedId + ".date"]: serverTimestamp(),
          }));
      } else {
        const chatData = res.data();

        const { messages } = chatData;

        const timedMessages = messages.map((msg: IMessage) => ({
          ...msg,
          date: msg.date instanceof Timestamp ? moment(msg.date.toDate()).fromNow() : msg.date,
        })); // Timestump.now() to date

        changeMessages({ messages: timedMessages });
      }
    } catch (e) {
      console.log(e);
    }

    changeFriend(userInfo);
  };

  return (
    <ListItemButton key={userInfo?.id} sx={mainStyles.contactListItem} onClick={handleSelect}>
      <ListItemAvatar>
        <Avatar sx={{ width: 56, height: 56 }} src={userInfo?.photoURL || ""} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={mainStyles.contactListItemPrm}
        secondaryTypographyProps={mainStyles.contactListItemScr}
        primary={userInfo?.fullName || emailName(userInfo?.email)}
        secondary={listData?.lastMessage?.text}
      />
      <Badge sx={mainStyles.costumBadge} color="secondary" badgeContent={0} />
    </ListItemButton>
  );
};

export default Contact;
