import { Box } from "@mui/material";
import Contacts from "./Contacts";
import Header from "./Header";
import { mainStyles } from "../styles";
import { useState } from "react";
import { DocumentData } from "firebase/firestore";

const LeftColumn = () => {
  const [people, setPeople] = useState<DocumentData[] | null>(null);
  return (
    <Box sx={mainStyles.leftSideContainer}>
      <Header setPeople={setPeople} />
      <Contacts people={people} />
    </Box>
  );
};

export default LeftColumn;
