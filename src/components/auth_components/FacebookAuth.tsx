import { auth } from "@fb";
import { Button, Typography } from "@mui/material";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const FacebookAuth = () => {
  const facebookSignin = async () => {
    try {
      const facebookProvider = new FacebookAuthProvider();
      await signInWithPopup(auth, facebookProvider);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      onClick={facebookSignin}
      fullWidth
      startIcon={
        <img
          width="40"
          height="40"
          src="https://img.icons8.com/fluency/48/facebook-new.png"
          alt="facebook-new"
        />
      }
      sx={{
        color: "#fff",
        justifyContent: "flex-start",
        pl: 5,
        mt: 1.5,
      }}
      variant="outlined"
    >
      <Typography variant="h6">Facebook</Typography>
    </Button>
  );
};

export default FacebookAuth;
