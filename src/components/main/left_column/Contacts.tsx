import { CircularProgress, Divider } from "@mui/material";
import { Paper, List } from "@mui/material";
import { mainStyles } from "../styles";
import { DocumentData } from "firebase/firestore";
import Contact from "./Contact";
import { Fragment } from "react";
import { messageState } from "@store/slicers/messageSlice";
import { useTSelector } from "@hooks/typedHooks";
import { IContacts } from "@tps/type";
import { useAuth } from "@hooks/authHook";

type Props = {
  people: DocumentData[] | null;
  setOpenChat: (T: boolean) => void;
};

const Contacts = ({ people, setOpenChat }: Props) => {
  const { contacts, loading } = useTSelector(messageState);
  const { id } = useAuth();
  const sortedContacts = contacts?.length
    ? [...contacts].sort((a: IContacts, b: IContacts) => b?.date - a?.date)
    : [];
  const ids = contacts.map(cnt => cnt?.userInfo.id);

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={mainStyles.paper}>
      <List>
        {!!people?.length &&
          people.map(
            person =>
              id &&
              person.id !== id &&
              ids.includes(id) && (
                <Fragment key={person.id}>
                  <Contact listData={{ userInfo: person }} setOpenChat={setOpenChat} />
                  <Divider />
                </Fragment>
              )
          )}
        {sortedContacts.map((cnt, i) => {
          return <Contact key={i} listData={cnt} setOpenChat={setOpenChat} />;
        })}
      </List>
    </Paper>
  );
};

export default Contacts;
