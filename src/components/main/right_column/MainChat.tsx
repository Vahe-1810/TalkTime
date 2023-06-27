// @ts-nocheck
import { Box, CircularProgress, IconButton, TextField } from "@mui/material";
import Message from "./Message";
import { SendOutlined } from "@mui/icons-material";
import { mainStyles } from "../styles";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";
import { IMessage } from "@tps/type";
import { Timestamp, arrayUnion, doc, getDoc } from "firebase/firestore";
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
  const { changeMessages } = useContacts();
  const mixedId = useMemo(
    () => [id, currentFriendInfo?.id]?.sort().join(""),
    [currentFriendInfo?.id, id]
  );

  useEffect(() => {
    if (currentFriendInfo) {
      if (currMessage.length === 1) {
        getDoc(doc(db, "userChats", currentFriendInfo?.id)).then(resp => {
          const data = resp.data();

          updateDoc(doc(db, "userChats", currentFriendInfo?.id), {
            [mixedId + ".lastMessage"]: {
              ...data[mixedId].lastMessage,
              typing: true,
            },
          });
        });
      } else if (!currMessage.length) {
        getDoc(doc(db, "userChats", currentFriendInfo?.id)).then(resp => {
          const data = resp.data();

          updateDoc(doc(db, "userChats", currentFriendInfo?.id), {
            [mixedId + ".lastMessage"]: {
              ...data[mixedId].lastMessage,
              typing: false,
            },
          });
        });
      }
    }
  }, [currMessage]);

  useEffect(() => {
    console.log("optimize");
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
    const onSub = onSnapshot(doc(db, "chats", mixedId), doc => {
      if (doc.exists()) {
        const { messages } = doc.data();
        const timedMessages = messages.map((msg: IMessage) => ({
          ...msg,
          date: msg.date instanceof Timestamp ? moment(msg.date.toDate()).fromNow() : msg.date,
        })); // Timestump.now() to date

        changeMessages({ messages: timedMessages });
      }
    });

    return () => {
      onSub();
    };
    // eslint-disable-next-line
  }, [mixedId, messages?.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey && e.code === "Enter") {
      setCurrMessage(currMessage + "\n");
      return;
    }
    if (e.code === "Enter") sendMessage(e);
  };

  const sendMessage = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrMessage("");
    if (!currMessage) return;
    const chatData =
      currentFriendInfo?.id && (await getDoc(doc(db, "userChats", currentFriendInfo.id))).data();
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

    id &&
      (await updateDoc(doc(db, "userChats", id), {
        [mixedId + ".lastMessage"]: {
          text: currMessage,
          sender: id,
          unread: 0,
        },
        [mixedId + ".date"]: serverTimestamp(),
      }));

    currentFriendInfo?.id &&
      (await updateDoc(doc(db, "userChats", currentFriendInfo.id), {
        [mixedId + ".lastMessage"]: {
          text: currMessage,
          sender: id,
          unread: chatData && chatData[mixedId].lastMessage.unread + 1,
        },
        [mixedId + ".date"]: serverTimestamp(),
      }));
  };

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
                    date={msg.date instanceof Timestamp ? msg.date.toDate().toString() : msg.date}
                  />
                );
              })}
          </Box>
          <Box component="form" onSubmit={sendMessage} sx={mainStyles.messageField}>
            <TextField
              value={currMessage}
              multiline
              sx={mainStyles.input}
              onKeyDown={handleKeyDown}
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
