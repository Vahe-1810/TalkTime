import { FC, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import VerifingDialog from "@shared/VerifingDialog";
import { useAuthActions } from "@hooks/actionsHook";
import { useAuth } from "@hooks/authHook";
import VideoCallModal from "@components/call_components/VideoCallModal";

const App: FC = () => {
  const { setVerifing } = useAuthActions();
  const { isAuth, id } = useAuth();

  useEffect(() => {
    if (!isAuth && id) setVerifing(true);
  }, [isAuth, id]);

  return (
    <>
      <div className="app">
        <AppRoutes />
        <VerifingDialog />
      </div>
      <VideoCallModal />
    </>
  );
};

export default App;
