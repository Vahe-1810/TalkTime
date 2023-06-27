import { ArrowBack, Call, Delete, MoreVert, Search } from "@mui/icons-material";
import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material";
import { ListItem, Menu } from "@mui/material";
import { ListItemAvatar, ListItemText, MenuItem } from "@mui/material";
import { mainStyles } from "../styles";
import moment from "moment";
import { useState } from "react";
import InfoTab from "./InfoTab";
import { TypeOpen } from "@tps/type";
import { useTSelector } from "@hooks/typedHooks";
import { messageState } from "@store/slicers/messageSlice";
import { theme } from "@theme/mui-theme";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@fb";
import { useAuth } from "@hooks/authHook";

const Header = ({ open, setOpen, setOpenChat }: TypeOpen) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const friend = useTSelector(messageState).currentFriendInfo;
  const phoneSize = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useAuth();
  const mixedId = friend && [id, friend.id].sort().join("");

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

  const handleClearChat = async () => {
    if (mixedId && id) {
      await setDoc(doc(db, "chats", mixedId), {
        messages: [],
      });
      await updateDoc(doc(db, "userChats", id), {
        [mixedId + ".lastMessage"]: {
          unread: 0,
        },
      });
      await updateDoc(doc(db, "userChats", friend.id), {
        [mixedId + ".lastMessage"]: {
          unread: 0,
        },
      });
    }
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
          {!phoneSize && (
            <>
              <IconButton>
                <Search />
              </IconButton>
              <IconButton>
                <Call />
              </IconButton>
            </>
          )}
          <IconButton onClick={handleOpen}>
            <MoreVert />
          </IconButton>
        </Box>
        <InfoTab open={open} setOpen={setOpen} />
      </Box>
      <Menu open={menuOpen} onClose={handleClose} anchorEl={anchor}>
        {phoneSize ? (
          <div>
            <MenuItem>
              <Search />
              Search
            </MenuItem>
            <MenuItem>
              <Call />
              Call
            </MenuItem>
            <MenuItem onClick={handleClearChat}>
              <Delete /> Clear chat
            </MenuItem>
          </div>
        ) : (
          <MenuItem onClick={handleClearChat}>
            <Delete /> Clear chat
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default Header;
