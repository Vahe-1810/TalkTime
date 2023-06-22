import { ArrowBack, Call, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material";
import { ListItem, Menu } from "@mui/material";
import { ListItemAvatar, ListItemText } from "@mui/material";
import { mainStyles } from "../styles";
import moment from "moment";
import { useState } from "react";
import InfoTab from "./InfoTab";
import { TypeOpen } from "@tps/type";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";
import { theme } from "@theme/mui-theme";

const Header = ({ open, setOpen, setOpenChat }: TypeOpen) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const friend = useTSelector(messageState).currentFriendInfo;
  const phoneSize = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(e.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setMenuOpen(false);
  };

  const handleGoBack = () => {
    setOpenChat(false);
  };

  return (
    <>
      <Box sx={mainStyles.contactHeader}>
        <ListItem>
          {phoneSize && (
            <IconButton onClick={handleGoBack}>
              <ArrowBack />
            </IconButton>
          )}
          <IconButton disableRipple>
            <ListItemAvatar sx={{ display: "flex", alignItems: "center" }}>
              <Avatar src={friend?.photoURL || ""} alt={friend?.fullName || friend?.email || ""} />
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
