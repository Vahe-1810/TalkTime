import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@hooks/authHook";
import { useAuthActions, useCall, useContacts } from "@hooks/actionsHook";
import { toggleUser } from "@utils/settingUser";
import { auth, db } from "@fb";
import { CircularProgress } from "@mui/material";
import Signin from "@components/auth_components/SignIn";
import Signup from "@components/auth_components/SignUp";
import Main from "@components/main/Main";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useTSelector } from "@hooks/typedHooks";
import { user } from "@store/slicers/authSlice";

const authRoutes = [
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
  const id = useTSelector(user).currentUser?.id;
  const { setUser } = useAuthActions();
  const changeFriend = useContacts().changeFriend;
  const { setOpenModal, setMeet } = useCall();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        updateDoc(doc(db, "users", user.uid), {
          lastVisit: user?.metadata?.lastSignInTime,
          isOnline: true,
        });
      }

      if (!user) {
        changeFriend(null);

        if (id) {
          updateDoc(doc(db, "users", id), {
            isOnline: false,
          });
        }
      }
      setUser(toggleUser(user));
    });

    //eslint-disable-next-line
  }, [isAuth]);

  useEffect(() => {
    id &&
      onSnapshot(doc(db, "users", id), snap => {
        if (snap.exists()) {
          const { calling } = snap.data();
          if (calling?.type === "answer") {
            setMeet(calling);
            setOpenModal(true);
          } else {
            setOpenModal(false);
          }
        }
      });
  }, [id]);

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
          {authRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
