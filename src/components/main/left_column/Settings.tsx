import { AddAPhoto, ArrowBack } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Modal, Typography, Slider } from "@mui/material";
import { mainStyles } from "../styles";
import { useState } from "react";
import PicEditor from "@components/main/left_column/PicEditor";
import { useAuth } from "@hooks/authHook";

const Settings = ({ setOpenDrawer }: { setOpenDrawer: (b: boolean) => void }) => {
  const [openModal, setOpenModal] = useState(false);
  const [photoSize, setPhotoSize] = useState(150);
  const [prevPhoto, setPrevPhoto] = useState<null | string>(null);
  const { photoURL } = useAuth();

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) {
      setPrevPhoto(null);
      return;
    }
    setPrevPhoto(URL.createObjectURL(e.currentTarget.files[0]));
    setOpenModal(true);
  };

  return (
    <>
      <Box>
        <Box sx={[mainStyles.header, { justifyContent: "left" }]}>
          <IconButton onClick={() => setOpenDrawer(false)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <IconButton component="label">
                <AddAPhoto fontSize="large" />
                <input type="file" hidden onChange={handleAddPhoto} />
              </IconButton>
            }
          >
            <Avatar sx={{ width: "150px", height: "150px" }} src={photoURL || ""} />
          </Badge>
        </Box>
      </Box>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={mainStyles.editor}>
          <Slider
            value={photoSize}
            onChange={(_, value) => setPhotoSize(+value)}
            min={100}
            max={260}
          />
          {prevPhoto && (
            <PicEditor image={prevPhoto} scale={photoSize / 100} setOpen={setOpenModal} />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Settings;
