import { componentsStyles } from "@components/auth_components/styles";
import { db } from "@fb";
import { useCall } from "@hooks/actionsHook";
import { useAuth } from "@hooks/authHook";
import { useTSelector } from "@hooks/typedHooks";
import { CallEnd, Videocam } from "@mui/icons-material";
import { Avatar, Box, Modal, Typography, IconButton } from "@mui/material";
import { callState } from "@store/slicers/callSlice";
import { joinToCall } from "@utils/joinToCall";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";

const VideoCallModal = () => {
  const { setOpenModal } = useCall();
  const { openModal, calling } = useTSelector(callState);
  const id = useAuth().id;
  const mixedId = [id, calling?.id]?.sort().join("");

  const handleClose = () => {
    setOpenModal(false);
  };

  const acceptCall = async () => {
    calling.isCall && id && (await joinToCall({ ...calling }));
    try {
      id &&
        (await updateDoc(doc(db, "users", id), {
          calling: {
            ...calling,
            type: null,
          },
        }));
    } catch (e) {
      console.log(e);
    }
  };

  const hangUp = async () => {
    calling &&
      (await updateDoc(doc(db, "users", calling.id), {
        calling: {
          isCall: false,
          meetId: null,
          type: null,
          caller: null,
        },
      }));

    id &&
      (await updateDoc(doc(db, "users", id), {
        calling: {
          isCall: false,
          meetId: null,
          type: null,
          caller: null,
        },
      }));

    await updateDoc(doc(db, "chats", mixedId), {
      messages: arrayUnion({
        sender: id,
        message: "call cancled",
        date: Timestamp.now(),
      }),
    });
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      sx={{ ...componentsStyles.columnCenter, justifyContent: "start", p: 3 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "300px",
          height: "100px",
          bgcolor: "#212121",
          borderRadius: 5,
          paddingInline: 3,
          gap: 2,
        }}
      >
        <Avatar sx={{ width: 56, height: 56 }} src={calling.caller || ""} />
        <Typography variant="h5">{calling?.fullName?.split(" ")[0] || "User"}</Typography>
        <IconButton TouchRippleProps={{ style: { color: "green" } }} onClick={acceptCall}>
          <Videocam fontSize="large" color="secondary" />
        </IconButton>
        <IconButton TouchRippleProps={{ style: { color: "red" } }} onClick={hangUp}>
          <CallEnd fontSize="large" color="error" />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default VideoCallModal;
