import { useEffect, useMemo, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { theme } from "@theme/mui-theme";
import { useContacts } from "@hooks/actionsHook";
import { db } from "@fb";
import { useAuth } from "@hooks/authHook";
import { mainStyles } from "../styles";
import Settings from "./settings/Settings";
import Contacts from "./Contacts";
import Header from "./Header";

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

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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
