import { FC, useState } from "react";
import LeftColumn from "./left_column/LeftColumn";
import { Box } from "@mui/material";
import { mainStyles } from "./styles";
import RightColumn from "./right_column/RightColumn";

const Main: FC = () => {
  const [openChat, setOpenChat] = useState(false);

  return (
    <Box sx={mainStyles.container}>
      <LeftColumn setOpenChat={setOpenChat} openChat={openChat} />
      <RightColumn setOpenChat={setOpenChat} openChat={openChat} />
    </Box>
  );
};

export default Main;
