import { AddAPhoto } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Modal, Slider } from "@mui/material";
import PicEditor from "../PicEditor";
import { useState } from "react";
import { useAuth } from "@hooks/authHook";
import { mainStyles } from "@components/main/styles";

const AvatarSettings = () => {
  const [openModal, setOpenModal] = useState(false);
  const [photoSize, setPhotoSize] = useState(150);
  const { photoURL } = useAuth();
  const [prevPhoto, setPrevPhoto] = useState<null | string>(null);

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

export default AvatarSettings;
