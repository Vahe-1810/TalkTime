import { Box, Divider, TextField, Typography } from "@mui/material";
import { Avatar, Container, Button, Grid } from "@mui/material";
import { Shield } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { signupScheme } from "@utils/validation";
import { auth } from "@fb";
import { ISignup } from "@tps/type";
import { Link } from "react-router-dom";
import { toggleUser } from "@utils/settingUser";
import { useAuthActions } from "@hooks/actionsHook";
import GoogleAuth from "./GoogleAuth";
import FacebookAuth from "./FacebookAuth";
import { setUserCollection } from "@utils/createUserDB";

const Signup = () => {
  const formControl = useForm<ISignup>({
    resolver: yupResolver(signupScheme),
  });
  //prettier-ignore
  const { handleSubmit,register,formState: { errors } } = formControl
  const { setUser } = useAuthActions();

  const onSubmit = async ({ email, password }: ISignup) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setUserCollection(user);
      setUser(toggleUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <Shield />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            autoComplete="password"
            error={!!errors.confirm}
            helperText={errors.confirm?.message}
            {...register("confirm")}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Divider textAlign="center">OR</Divider>
          <GoogleAuth />
          <FacebookAuth />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
