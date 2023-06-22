import { auth, db } from "@fb";
import { useAuthActions } from "@hooks/actionsHook";
import { Button, Typography } from "@mui/material";
import { setUserCollection } from "@utils/createUserDB";
import { googleToggle, toggleUser } from "@utils/settingUser";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const GoogleAuth = () => {
  const googleProvider = new GoogleAuthProvider();
  const { setUser } = useAuthActions();

  const googleSignin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const checkUser = await getDoc(doc(db, "users", user.uid));

      if (checkUser.exists()) {
        setUser(googleToggle(checkUser.data()));
        return;
      }
      await setUserCollection(user);
      setUser(toggleUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={googleSignin}
      fullWidth
      startIcon={
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
      sx={{
        color: "#fff",
        textAlign: "start",
        justifyContent: "flex-start",
        pl: 5,
        mt: 1.5,
      }}
      variant="outlined"
    >
      <Typography variant="h6"> Google</Typography>
    </Button>
  );
};

export default GoogleAuth;
