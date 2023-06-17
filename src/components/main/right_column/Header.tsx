import { Call, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";
import { ListItem, Menu } from "@mui/material";
import { ListItemAvatar, ListItemText } from "@mui/material";
import { mainStyles } from "../styles";
import moment from "moment";
import { useState } from "react";
import InfoTab from "./InfoTab";
import { useAuth } from "@hooks/authHook";
import { TypeOpen } from "@tps/type";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";

const Header = ({ open, setOpen }: TypeOpen) => {
  const { email } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const friend = useTSelector(messageState).currentFriendInfo;

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setMenuOpen(false);
  };

  return (
    <>
      <Box sx={mainStyles.contactHeader}>
        <ListItem>
          <IconButton disableRipple>
            <ListItemAvatar>
              <Avatar src={friend?.photoURL || ""} />
            </ListItemAvatar>
          </IconButton>
          <ListItemText
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
            primaryTypographyProps={mainStyles.contactListItemPrm}
            secondaryTypographyProps={mainStyles.contactListItemScr}
            primary={friend?.fullName || friend?.email}
            secondary={moment(friend?.lastVisit).fromNow()}
          />
        </ListItem>
        <Box sx={mainStyles.toolBox}>
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <Call />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
        </Box>
        <InfoTab open={open} setOpen={setOpen} />
      </Box>
      <Menu open={menuOpen} onClose={handleClose} anchorEl={anchor}></Menu>
    </>
  );
};

export default Header;
