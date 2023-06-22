import { Box, Drawer, useMediaQuery } from "@mui/material";
import Contacts from "./Contacts";
import Header from "./Header";
import { mainStyles } from "../styles";
import { useEffect, useState } from "react";
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { theme } from "@theme/mui-theme";
import Settings from "./Settings";
import { useContacts } from "@hooks/actionsHook";
import { db } from "@fb";
import { useAuth } from "@hooks/authHook";

type Props = {
  setOpenChat: (T: boolean) => void;
  openChat: boolean;
};

const LeftColumn = ({ setOpenChat, openChat }: Props) => {
  const [people, setPeople] = useState<DocumentData[] | null>(null);
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const { fetchContacts } = useContacts();
  const { id } = useAuth();

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    if (id) {
      const onsub = onSnapshot(doc(db, "userChats", id), doc => {
        doc.exists() && fetchContacts(doc.data());
      });

      return () => onsub();
    }
  }, [id, fetchContacts]);

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
