import { CircularProgress, Divider } from "@mui/material";
import { Paper, List } from "@mui/material";
import { mainStyles } from "../styles";
import { DocumentData } from "firebase/firestore";
import Contact from "./Contact";
import { Fragment } from "react";
import { messageState } from "@store/slicers/messageSlice";
import { useTSelector } from "@hooks/typedHooks";
import { IContacts } from "@tps/type";

type Props = {
  people: DocumentData[] | null;
  setOpenChat: (T: boolean) => void;
};

const Contacts = ({ people, setOpenChat }: Props) => {
  const { contacts, loading } = useTSelector(messageState);

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={mainStyles.paper}>
      <List>
        {!!people?.length &&
          people.map(person => (
            <Fragment key={person.id}>
              <Contact listData={{ userInfo: person }} setOpenChat={setOpenChat} />
              <Divider />
            </Fragment>
          ))}
        {contacts?.length
          ? [...contacts]
              .sort((a: IContacts, b: IContacts) => b?.date - a?.date)
              .map((cnt, i) => <Contact key={i} listData={cnt} setOpenChat={setOpenChat} />)
          : ""}
      </List>
    </Paper>
  );
};

export default Contacts;
