import { Divider } from "@mui/material";
import { Paper, List } from "@mui/material";
import { mainStyles } from "../styles";
import { DocumentData } from "firebase/firestore";
import Contact from "./Contact";
import { Fragment } from "react";
import { messageState } from "@store/slicers/messageSlice";
import { useTSelector } from "@hooks/typedHooks";

type Props = {
  people: DocumentData[] | null;
};

const Contacts = ({ people }: Props) => {
  const { contacts } = useTSelector(messageState);

  return (
    <Paper sx={mainStyles.paper}>
      <List>
        {!!people?.length &&
          people.map(person => (
            <Fragment key={person.id}>
              <Contact listData={person} />
              <Divider />
            </Fragment>
          ))}
        {contacts.map((cnt, i) => (
          <Contact key={i} listData={cnt} />
        ))}
      </List>
    </Paper>
  );
};

export default Contacts;
