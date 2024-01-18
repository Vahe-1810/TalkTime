import { ExitToApp, Search, Settings } from "@mui/icons-material";
import { IconButton, MenuItem, Avatar } from "@mui/material";
import { Box, TextField, Menu, Typography } from "@mui/material";
import { mainStyles } from "../styles";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@fb";
import { useAuth } from "@hooks/authHook";
import { searchUser } from "@utils/searchUser";
import { DocumentData, doc, updateDoc } from "firebase/firestore";

const inputProps = {
  style: {
    borderRadius: "50px",
    background: "#2c2c2c",
    width: "100%",
  },
};

type Props = {
  setPeople: (u: DocumentData[]) => void;
  setOpenDrawer: (b: boolean) => void;
};

const Header = ({ setPeople, setOpenDrawer }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const { photoURL, fullName, email, id } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const menuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const menuClose = () => {
    setOpen(false);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      searchUser(searchValue, setPeople);
    }
  };

  return (
    <>
      <Box sx={mainStyles.header}>
        <IconButton onClick={menuOpen}>
          <Avatar src={photoURL || ""} />
        </IconButton>
        <TextField
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={onEnter}
          variant="outlined"
          type="text"
          placeholder="Search"
          InputProps={{
            ...inputProps,
            endAdornment: (
              <IconButton onClick={() => searchUser(searchValue, setPeople)}>
                <Search />
              </IconButton>
            ),
          }}
          size="small"
          InputLabelProps={{
            shrink: false,
            sx: {
              paddingInline: 4,
              color: "#a2aca7",
            },
          }}
        />
      </Box>
      <Menu open={open} anchorEl={anchorEl} onClose={menuClose}>
        <MenuItem disabled>
          <Typography variant="subtitle1">{fullName || email}</Typography>
        </MenuItem>
        <MenuItem
          sx={mainStyles.menuItem}
          onClick={() => {
            setOpenDrawer(true);
            menuClose();
          }}
        >
          <Settings /> Settings
        </MenuItem>
        <MenuItem
          sx={mainStyles.menuItem}
          onClick={() =>
            signOut(auth).then(() => {
              id &&
                updateDoc(doc(db, "users", id), {
                  isOnline: false,
                });
            })
          }
        >
          <ExitToApp /> Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
