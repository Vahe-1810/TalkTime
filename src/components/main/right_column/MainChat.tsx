// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import Message from "./Message";
import { SendOutlined } from "@mui/icons-material";
import { mainStyles } from "../styles";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";
import { IMessage } from "@tps/type";
import { Timestamp, arrayUnion, doc } from "firebase/firestore";
import { onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuth } from "@hooks/authHook";
import { db } from "@fb";
import { useContacts } from "@hooks/actionsHook";
import moment from "moment";

const MainChat = () => {
  const [currMessage, setCurrMessage] = useState("");
  const { messagesData, currentFriendInfo, loading } = useTSelector(messageState);
  const { messages } = messagesData;
  const { id } = useAuth();
  const ref = useRef();
  const { changeMessages, fetchContacts } = useContacts();
  const mixedId = useMemo(
    () => [id, currentFriendInfo?.id]?.sort().join(""),
    [currentFriendInfo?.id, id]
  );

  const sendMessage = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currMessage) return;
    try {
      mixedId &&
        (await updateDoc(doc(db, "chats", mixedId), {
          messages: arrayUnion({
            sender: id,
            message: currMessage,
            date: Timestamp.now(),
          }),
        }));
    } catch (error) {
      console.log(error);
    }

    await updateDoc(doc(db, "userChats", id), {
      [mixedId + ".lastMessage"]: {
        text: currMessage,
      },
      [mixedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", currentFriendInfo?.id), {
      [mixedId + ".lastMessage"]: {
        text: currMessage,
      },
      [mixedId + ".date"]: serverTimestamp(),
    });

    setCurrMessage("");
  };

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", mixedId), doc => {
      if (doc.exists()) {
        const { messages } = doc.data();
        const timedMessages = messages.map((msg: IMessage) => ({
          ...msg,
          date: moment(msg.date.toDate()).fromNow(),
        })); // Timestump.now() to date

        changeMessages({ messages: timedMessages });
      }
    });
    const onCntsSub = onSnapshot(doc(db, "userChats", id), doc => {
      doc.exists() && fetchContacts(doc.data());
    });

    return () => {
      onCntsSub();
      onSub();
    };
    // eslint-disable-next-line
  }, [mixedId]);

  if (loading) <CircularProgress />;

  return (
    <Box sx={mainStyles.chatBox}>
      {currentFriendInfo && (
        <>
          <Box sx={mainStyles.chat} ref={ref}>
            {messages &&
              [...messages]?.map((msg: IMessage) => {
                return (
                  <Message
                    key={Math.random()}
                    text={msg.message}
                    sender={msg.sender === id}
                    date={msg.date}
                  />
                );
              })}
          </Box>
          <Box component="form" onSubmit={sendMessage} sx={mainStyles.messageField}>
            <TextField
              value={currMessage}
              multiline
              sx={mainStyles.input}
              onChange={e => setCurrMessage(e.target.value)}
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: "15px",
                  fontSize: "20px",
                  color: "#fff",
                },
                endAdornment: (
                  <IconButton type="submit">
                    <SendOutlined />
                  </IconButton>
                ),
              }}
              placeholder="Message"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MainChat;
