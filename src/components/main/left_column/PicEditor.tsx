import AvatarEditor, { AvatarEditorProps } from "react-avatar-editor";
import { useRef, useState } from "react";
import { Check } from "@mui/icons-material";
import { Button, CircularProgress, Modal } from "@mui/material";
import { useAuthActions } from "@hooks/actionsHook";
import { useTSelector } from "@hooks/typedHooks";
import { user } from "@store/slicers/authSlice";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@fb";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

interface Props extends AvatarEditorProps {
  setOpen: (b: boolean) => void;
}

const PicEditor = ({ scale, image, setOpen }: Props) => {
  const editorRef = useRef<AvatarEditor | null>(null);
  const { changeUserInfo } = useAuthActions();
  const currentUser = useTSelector(user).currentUser;
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (editorRef.current) {
      setLoading(true);
      try {
        const canvas = editorRef.current.getImageScaledToCanvas();
        const dataURL = canvas.toDataURL();
        const blob = await (await fetch(dataURL)).blob();
        const photoRef = ref(storage, `${currentUser?.id}/${currentUser?.email}.png`);
        await uploadBytes(photoRef, blob);
        const getPhoto = await getDownloadURL(photoRef);
        auth.currentUser && (await updateProfile(auth.currentUser, { photoURL: getPhoto }));
        currentUser?.id &&
          (await updateDoc(doc(db, "users", currentUser?.id), {
            photoURL: getPhoto,
          }));
        currentUser && changeUserInfo({ ...currentUser, photoURL: dataURL });
      } catch (error) {
        console.log(error);
      } finally {
        setOpen(false);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <AvatarEditor
        ref={editorRef}
        image={image}
        width={300}
        height={300}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        borderRadius={1000}
        disableHiDPIScaling
      />
      <Button variant="contained" onClick={handleSave}>
        <Check />
      </Button>
      <Modal
        open={loading}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Modal>
    </>
  );
};

export default PicEditor;
