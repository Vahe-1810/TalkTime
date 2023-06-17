import { Box, useMediaQuery } from "@mui/material";
import { mainStyles } from "../styles";
import Header from "./Header";
import { useState } from "react";
import { StyledHeader } from "@shared/ChatHeader";
import { Main } from "@shared/ChatContainer";
import MainChat from "./MainChat";
import { theme } from "@theme/mui-theme";

type Props = {
  openChat: boolean;
  setOpenChat: (b: boolean) => void;
};

const RightColumn = ({ openChat, setOpenChat }: Props) => {
  const [open, setOpen] = useState(false);
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ ...mainStyles.contacts, display: isPhone && !openChat ? "none" : "block" }}>
      <StyledHeader open={open}>
        <Header open={open} setOpen={setOpen} setOpenChat={setOpenChat} />
      </StyledHeader>
      <Main open={open} sx={{ height: "100%" }}>
        <MainChat />
      </Main>
    </Box>
  );
};

export default RightColumn;
