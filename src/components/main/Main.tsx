import { FC } from "react";
import LeftColumn from "./left_column/LeftColumn";
import { Box } from "@mui/material";
import { mainStyles } from "./styles";
import RightColumn from "./right_column/RightColumn";

const Main: FC = () => {
  return (
    <Box sx={mainStyles.container}>
      <LeftColumn />
      <RightColumn />
    </Box>
  );
};

export default Main;
