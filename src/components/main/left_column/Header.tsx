import { ExitToApp, Search } from "@mui/icons-material";
import { InputAdornment, IconButton, MenuItem, Avatar } from "@mui/material";
import { Box, TextField, Menu, Typography } from "@mui/material";
import { mainStyles } from "../styles";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@fb";
import { useAuth } from "@hooks/authHook";
import { searchUser } from "@utils/searchUser";
import { DocumentData } from "firebase/firestore";

const inputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  ),
  style: {
    borderRadius: "50px",
    background: "#2c2c2c",
    width: "100%",
  },
};

type Props = {
  setPeople: (u: DocumentData[]) => void;
};

const Header = ({ setPeople }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const { photoURL, fullName, email } = useAuth();
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
          InputProps={{ ...inputProps }}
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
        <MenuItem sx={mainStyles.menuItem} onClick={() => signOut(auth)}>
          Sign Out
          <ExitToApp />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
