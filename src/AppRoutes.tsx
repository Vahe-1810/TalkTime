import Signin from "@components/auth_components/SignIn";
import Signup from "@components/auth_components/SignUp";
import Main from "@components/main/Main";
import { useAuth } from "@hooks/authHook";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuthActions } from "@hooks/actionsHook";
import { onAuthStateChanged } from "firebase/auth";
import { toggleUser } from "@utils/settingUser";
import { auth } from "@fb";
import { CircularProgress } from "@mui/material";

const AuthRoutes = [
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
];

const AppRoutes = () => {
  const { isAuth, loading } = useAuth();
  const { setUser } = useAuthActions();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setUser(toggleUser(user));
    });
    //eslint-disable-next-line
  }, [isAuth]);

  if (loading) return <CircularProgress variant="indeterminate" size={100} />;

  return (
    <Routes>
      {isAuth ? (
        <>
          <Route index element={<Main />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {AuthRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
