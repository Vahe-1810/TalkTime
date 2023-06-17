/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { Badge, ListItemButton } from "@mui/material";
import { mainStyles } from "../styles";
import { DocumentData, arrayUnion, doc, getDoc } from "firebase/firestore";
import { serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { emailName } from "@utils/emailToDisplay";
import { formatDate } from "@utils/date";
import { useAuth } from "@hooks/authHook";
import { db } from "@fb";
import { useContacts } from "@hooks/actionsHook";
import moment from "moment";

type Props = {
  listData: DocumentData;
  setOpenChat: (t: boolean) => void;
};

const Contact = ({ listData, setOpenChat }: Props) => {
  const { id } = useAuth();
  const { changeFriend, changeMessages } = useContacts();

  const handleSelect = async () => {
    const mixedId = [id, listData.id].sort().join("-");
    const res = await getDoc(doc(db, "chats", mixedId));

    setOpenChat(true);

    if (!res.exists()) {
      await setDoc(doc(db, "chats", mixedId), {
        usersRefArr: [id, listData.id],
        messages: [],
        chatCreated: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", id), {
        contacts: arrayUnion(doc(db, "users", listData.id)),
      });
      await updateDoc(doc(db, "users", listData.id), {
        contacts: arrayUnion(doc(db, "users", id)),
      });
    } else {
      const { chatCreated, messages, ...other } = res.data();

      const timedMessages = messages.map(msg => ({
        ...msg,
        date: moment(msg.date.toDate()).fromNow(),
      })); // Timestump.now() to date
      const date = moment(chatCreated.toDate()).format("YYYY-MM-DD"); // server-timestump to date

      changeMessages({ ...other, date, messages: timedMessages });
    }

    changeFriend(listData);
  };

  return (
    <ListItemButton key={Math.random()} sx={mainStyles.contactListItem} onClick={handleSelect}>
      <ListItemAvatar>
        <Avatar sx={{ width: 56, height: 56 }} src={listData?.photoURL || ""} />
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={mainStyles.contactListItemPrm}
        secondaryTypographyProps={mainStyles.contactListItemScr}
        primary={listData?.fullName || emailName(listData?.email)}
        secondary={formatDate(listData.lastVisit)}
      />
      <Badge sx={mainStyles.costumBadge} color="secondary" badgeContent={0} />
    </ListItemButton>
  );
};

export default Contact;
