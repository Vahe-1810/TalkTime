import { Avatar, ImageListItem, ListItemSecondaryAction } from "@mui/material";
import { List, ListItemButton, ListItemText, IconButton } from "@mui/material";
import { ImageListItemBar, Typography, Box, Drawer } from "@mui/material";
import { NotificationsNoneOutlined, Clear } from "@mui/icons-material";
import { CallOutlined, EditOutlined } from "@mui/icons-material";
import { mainStyles } from "../styles";
import CustomSwitch from "@shared/CustomSwitch";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";
import moment from "moment";

const InfoTab = ({ open, setOpen }: { open: boolean; setOpen: (a: boolean) => void }) => {
  const friend = useTSelector(messageState).currentFriendInfo;

  return (
    <Drawer open={open} anchor="right" sx={mainStyles.userInfo} variant="persistent">
      <Box sx={mainStyles.userInfoHeader}>
        <IconButton onClick={() => setOpen(false)}>
          <Clear />
        </IconButton>
        <Typography variant="h5">User Info</Typography>
        <IconButton>
          <EditOutlined />
        </IconButton>
      </Box>
      <ImageListItem>
        <Avatar
          src={friend?.photoURL || ""}
          style={{ width: "100%", height: "100%" }}
          variant="square"
        />
        <ImageListItemBar
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
          }}
          title={friend?.fullName || friend?.email || "user"}
          subtitle={moment(friend?.lastVisit).fromNow()}
          position="bottom"
        />
      </ImageListItem>
      <Box>
        <List>
          <ListItemButton sx={mainStyles.contactListItem}>
            <CallOutlined />
            <ListItemText
              primary={friend?.phoneNumber || "Empty"}
              secondary="Phone"
              primaryTypographyProps={mainStyles.contactListItemPrm}
              secondaryTypographyProps={mainStyles.contactListItemScr}
            />
          </ListItemButton>
          <ListItemButton sx={mainStyles.contactListItem}>
            <NotificationsNoneOutlined />
            <ListItemText
              primary="Notification"
              primaryTypographyProps={mainStyles.contactListItemPrm}
            />
            <ListItemSecondaryAction>
              <CustomSwitch />
            </ListItemSecondaryAction>
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default InfoTab;
