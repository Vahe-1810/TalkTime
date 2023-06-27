import { auth, db } from "@fb";
import { useAuthActions } from "@hooks/actionsHook";
import { useAuth } from "@hooks/authHook";
import { useTSelector } from "@hooks/typedHooks";
import { Check } from "@mui/icons-material";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { user } from "@store/slicers/authSlice";

const PersonalSettings = () => {
  const currUser = useAuth();
  const [userName, setUserName] = useState(currUser.fullName || "");
  const [email, setEmail] = useState(currUser.email);
  const [isTyped, setIsTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useTSelector(user);
  const { changeUserInfo, setVerifing } = useAuthActions();

  const handleChangeName = async () => {
    setLoading(true);

    try {
      if (auth.currentUser && currUser.id) {
        if (userName !== currUser.fullName) {
          await updateProfile(auth.currentUser, { displayName: userName });
          updateDoc(doc(db, "users", currUser.id), {
            fullName: userName,
          });
        }
        if (email && email !== currUser.email) {
          setVerifing(true);
          await updateEmail(auth.currentUser, email);
          await sendEmailVerification(auth.currentUser);
        }
      }
      currentUser && changeUserInfo({ ...currentUser, fullName: userName });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, alignItems: "center" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TextField
            label="Username"
            value={userName}
            onChange={e => {
              setUserName(e.target.value);
              setIsTyped(true);
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setIsTyped(true);
            }}
          />
          {isTyped && userName && (
            <Button variant="contained" onClick={handleChangeName}>
              <Check />
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default PersonalSettings;
