import { ArrowBack } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { mainStyles } from "../../styles";
import AvatarSettings from "./AvatarSettings";
import PersonalSettings from "./PersonalSettings";

const Settings = ({ setOpenDrawer }: { setOpenDrawer: (b: boolean) => void }) => {
  return (
    <>
      <Box>
        <Box sx={[mainStyles.header, { justifyContent: "left" }]}>
          <IconButton onClick={() => setOpenDrawer(false)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Settings</Typography>
        </Box>
        <AvatarSettings />
        <PersonalSettings />
      </Box>
    </>
  );
};

export default Settings;
