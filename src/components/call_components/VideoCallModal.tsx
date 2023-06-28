import { componentsStyles } from "@components/auth_components/styles";
import { useCall } from "@hooks/actionsHook";
import { useTSelector } from "@hooks/typedHooks";
import { Box, Button, Modal } from "@mui/material";
import { callState } from "@store/slicers/callSlice";
import { joinToCall } from "@utils/joinToCall";

type Props = {
  open: boolean;
  setOpenVideo: (b: boolean) => void;
};

const VideoCallModal = ({}: Props) => {
  const { setOpenModal } = useCall();
  const { openModal, calling } = useTSelector(callState);

  const handleClose = () => {
    setOpenModal(false);
  };

  const acceptCall = () => {
    calling.isCall && joinToCall(calling);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      sx={{ ...componentsStyles.columnCenter, justifyContent: "center" }}
    >
      <Box
        sx={{
          ...componentsStyles.columnCenter,
          width: "75%",
          height: "75%",
          bgcolor: "grey",
        }}
      >
        <Button onClick={acceptCall}>Answer</Button>
      </Box>
    </Modal>
  );
};

export default VideoCallModal;
