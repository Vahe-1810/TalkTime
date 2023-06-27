import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import { Avatar, Container, Button, Grid } from "@mui/material";
import { Shield, Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { auth } from "@fb";
import { signinScheme } from "@utils/validation";
import { ISignin } from "@tps/type";
import { Link } from "react-router-dom";
import { toggleUser } from "@utils/settingUser";
import { useAuthActions } from "@hooks/actionsHook";
import GoogleAuth from "./GoogleAuth";
import FacebookAuth from "./FacebookAuth";
import { useState } from "react";
import { componentsStyles } from "@components/auth_components/styles";

const Signin = () => {
  const [showPass, setShowPass] = useState(false);
  const formControl = useForm<ISignin>({
    resolver: yupResolver(signinScheme),
  });
  //prettier-ignore
  const {handleSubmit, register, formState: { errors }} = formControl;
  const setUser = useAuthActions().setUser;

  const onSubmit = async ({ email, password }: ISignin) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUser(toggleUser(user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="xs" sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={componentsStyles.columnCenter}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Shield />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type={showPass ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                ...componentsStyles.signInputProps,
                endAdornment: (
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
              {...register("password")}
            />
            <Grid container>
              <Grid item xs>
                <Link to="/">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Divider textAlign="center">OR</Divider>
            <GoogleAuth />
            <FacebookAuth />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signin;
