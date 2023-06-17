import { Box } from "@mui/material";
import { mainStyles } from "../styles";
import Header from "./Header";
import { useState } from "react";
import { StyledHeader } from "@shared/ChatHeader";
import { Main } from "@shared/ChatContainer";
import MainChat from "./MainChat";

const RightColumn = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={mainStyles.contacts}>
      <StyledHeader open={open}>
        <Header open={open} setOpen={setOpen} />
      </StyledHeader>
      <Main open={open} sx={{ height: "100%" }}>
        <MainChat />
      </Main>
    </Box>
  );
};

export default RightColumn;
