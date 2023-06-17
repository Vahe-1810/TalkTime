import { Box, useMediaQuery } from "@mui/material";
import Contacts from "./Contacts";
import Header from "./Header";
import { mainStyles } from "../styles";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { theme } from "@theme/mui-theme";

type Props = {
  setOpenChat: (T: boolean) => void;
  openChat: boolean;
};

const LeftColumn = ({ setOpenChat, openChat }: Props) => {
  const [people, setPeople] = useState<DocumentData[] | null>(null);
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ ...mainStyles.leftSideContainer, display: openChat && isPhone ? "none" : "flex" }}>
      <Header setPeople={setPeople} />
      <Contacts people={people} setOpenChat={setOpenChat} />
    </Box>
  );
};

export default LeftColumn;
