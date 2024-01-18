import moment from "moment";
import { DocumentData, Timestamp, doc, getDoc } from "firebase/firestore";
import { serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { Badge, ListItemButton } from "@mui/material";
import { useContacts } from "@hooks/actionsHook";
import { mainStyles } from "../styles";
import { emailName } from "@utils/emailToDisplay";
import { IMessage } from "@tps/type";
import { useAuth } from "@hooks/authHook";
import { db } from "@fb";
import { CostumBadge } from "@shared/CostumBadge";
import { useTSelector } from "@hooks/typedHooks";

type Props = {
  listData: DocumentData;
  setOpenChat: (t: boolean) => void;
};

const Contact = ({ listData, setOpenChat }: Props) => {
  const { changeFriend, changeMessages } = useContacts();
  const { userInfo } = listData;
  const { id } = useAuth();
  const friendId = useTSelector(state => state.message.currentFriendInfo?.id);
  const isSelected = userInfo.id === friendId;

  console.log(friendId, userInfo.id);

  const handleSelect = async () => {
    const mixedId = [id, userInfo.id].sort().join("");
    try {
      const res = await getDoc(doc(db, "chats", mixedId));

      setOpenChat(true);
      if (id) {
        if (!res.exists()) {
          await setDoc(doc(db, "chats", mixedId), {
            messages: [],
          });

          await updateDoc(doc(db, "userChats", id), {
            [mixedId + ".userInfo"]: doc(db, "users", userInfo.id),
            [mixedId + ".date"]: serverTimestamp(),
            [mixedId + ".lastMessage"]: {
              text: "",
              unread: 0,
            },
          });

          await updateDoc(doc(db, "userChats", userInfo.id), {
            [mixedId + ".userInfo"]: doc(db, "users", id),
            [mixedId + ".date"]: serverTimestamp(),
            [mixedId + ".lastMessage"]: {
              text: "",
              unread: 0,
            },
          });
        } else {
          const chatData = res.data();
          const userChatsData = (await getDoc(doc(db, "userChats", id))).data();
          const { messages } = chatData;

          userChatsData &&
            (await updateDoc(doc(db, "userChats", id), {
              [mixedId + ".lastMessage"]: {
                ...userChatsData[mixedId].lastMessage,
                unread: 0,
              },
            }));

          const timedMessages = messages.map((msg: IMessage) => ({
            ...msg,
            date: msg.date instanceof Timestamp ? moment(msg.date.toDate()).fromNow() : msg.date,
          })); // Timestump.now() to date

          changeMessages({ messages: timedMessages });
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      changeFriend(userInfo);
    }
  };

  return (
    <ListItemButton
      key={userInfo?.id}
      sx={[mainStyles.contactListItem, { bgcolor: isSelected ? "rgba(0,0,0,0.2)" : "" }]}
      onClick={handleSelect}
    >
      <ListItemAvatar>
        <CostumBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant={userInfo?.isOnline ? "dot" : "standard"}
        >
          <Avatar sx={{ width: 56, height: 56 }} src={userInfo?.photoURL || ""} />
        </CostumBadge>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={mainStyles.contactListItemPrm}
        secondaryTypographyProps={{
          ...mainStyles.contactListItemScr,
          fontWeight: listData?.lastMessage?.unread && "700",
        }}
        primary={userInfo?.fullName || emailName(userInfo?.email)}
        secondary={listData?.lastMessage?.typing ? "Typing..." : listData?.lastMessage?.text}
      />
      <Badge
        sx={mainStyles.costumBadge}
        color="secondary"
        badgeContent={listData?.lastMessage?.unread}
      />
    </ListItemButton>
  );
};

export default Contact;
