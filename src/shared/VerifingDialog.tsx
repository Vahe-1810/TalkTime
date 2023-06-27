import { sendEmailVerification } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@fb";
import { useAuth } from "@hooks/authHook";
import { useTSelector } from "@hooks/typedHooks";
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { user } from "@store/slicers/authSlice";
import { clearUserOnError } from "@utils/clearUser";

const VerifingDialog = () => {
  const isVerifing = useTSelector(user).isVerifing;
  const { email, id } = useAuth();

  const handleResend = () => {
    if (auth.currentUser) {
      try {
        sendEmailVerification(auth.currentUser).then(() => {
          id && updateDoc(doc(db, "users", id), { email });
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Dialog open={isVerifing}>
      <DialogTitle textAlign={"center"}>Verify Your Email</DialogTitle>
      <DialogContent
        sx={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 1 }}
      >
        <Typography variant="h5" textAlign={"center"}>
          An email has been sent to {email}. Please check your inbox and follow the instructions to
          verify your email address and after reload the page!
        </Typography>
        <Typography variant="h5" textAlign={"center"}>
          If you haven't received the email, please check your spam folder or click the button below
          to resend the verification email.
        </Typography>
        <Button onClick={handleResend}>Resend Verification Email</Button>Or
        <Button onClick={() => auth.currentUser && clearUserOnError(auth.currentUser)}>
          Cancel Verification
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default VerifingDialog;
