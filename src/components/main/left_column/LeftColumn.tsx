import { useEffect, useMemo, useState } from "react";
import {
  DocumentData,
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { theme } from "@theme/mui-theme";
import { useContacts } from "@hooks/actionsHook";
import { db } from "@fb";
import { useAuth } from "@hooks/authHook";
import { mainStyles } from "../styles";
import Settings from "./settings/Settings";
import Contacts from "./Contacts";
import Header from "./Header";
import moment from "moment";
import { IMessage } from "@tps/type";
import { changeMessages } from "@store/slicers/messageSlice";

type Props = {
  setOpenChat: (T: boolean) => void;
  openChat: boolean;
};

const LeftColumn = ({ setOpenChat, openChat }: Props) => {
  const [people, setPeople] = useState<DocumentData[] | null>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isSing, setIsSing] = useState(false);
  const isSigningIn = useMemo(() => isSing, [isSing]);
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchContacts } = useContacts();
  const { id } = useAuth();
  const mixedId = [id, "test"].sort().join("");

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    const getTestUser = async () => {
      const res = await getDoc(doc(db, "chats", mixedId));
      if (res.exists()) return;
      await setDoc(doc(db, "chats", mixedId), {
        messages: [],
      });

      await updateDoc(doc(db, "userChats", id!), {
        [`${mixedId}.userInfo`]: doc(db, "users", "test"),
        [mixedId + ".date"]: serverTimestamp(),
        [mixedId + ".lastMessage"]: {
          text: "",
          unread: 0,
        },
      });

      const chatData = res.data();
      const userChatsData = (await getDoc(doc(db, "userChats", id!))).data();

      if (res.exists()) {
        const { messages } = chatData!;
        userChatsData &&
          (await updateDoc(doc(db, "userChats", id!), {
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
    };
    if (id) {
      getTestUser();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      const onsub = onSnapshot(
        doc(db, "userChats", id),
        doc => {
          if (doc.exists()) {
            fetchContacts(doc.data());
            const arrFromData = Object.entries(doc.data()).sort(
              (a, b) => b[1]?.date?.seconds - a[1]?.date?.seconds
            )[0];

            if (
              isSigningIn &&
              arrFromData[1].lastMessage.sender !== id &&
              arrFromData[1].lastMessage.unread > 0
            )
              // playMessageAudio(); it's doesn't work
              setIsSing(true);
          }
        },
        console.log
      );

      return () => onsub();
    } //eslint-disable-next-line
  }, [id]);

  return (
    <Box sx={{ ...mainStyles.leftSideContainer, display: openChat && isPhone ? "none" : "flex" }}>
      <Header setPeople={setPeople} setOpenDrawer={setOpenDrawer} />
      <Contacts people={people} setOpenChat={setOpenChat} />

      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        anchor="left"
        variant="temporary"
        PaperProps={{ sx: { width: { md: "25%", xs: "100%" } } }}
      >
        <Settings setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </Box>
  );
};

export default LeftColumn;
