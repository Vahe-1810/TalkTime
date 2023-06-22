export const mainStyles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  leftSideContainer: {
    justifyContent: "start",
    flexDirection: "column",
    alignItems: "center",
    width: { md: "25%", xs: "100%" },
    height: "100%",
    background: "#212121",
    borderRight: "1px solid #2c2c2c",
  },
  contacts: {
    width: { md: "75%", xs: "100%" },
    height: "calc(100vh - 56px)",
  },
  header: {
    height: "56px",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  paper: {
    bgcolor: "#212121",
    maxHeight: "calc(100vh - 56px)",
    overflow: "auto",
    opacity: 1,
    width: "100%",
  },
  contactList: {
    width: "95%",
    maxWidth: 360,
  },
  contactListItem: {
    borderRadius: "12px",
    "&:hover": {
      background: "#2c2c2c",
    },
    gap: 1,
  },
  contactListItemPrm: {
    fontWeight: 600,
  },
  contactListItemScr: {
    color: "#aaaaaa",
  },
  costumBadge: {
    "& .MuiBadge-badge": {
      right: 5,
      top: 15,
      padding: "0 4px",
      background: "#766ac8",
      color: "#fff",
      fontSize: 15,
      fontWeight: 550,
      minWidth: 25,
      minHeight: 25,
      borderRadius: "50%",
    },
  },
  contactHeader: {
    height: "56px",
    background: "#212121",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toolBox: {
    display: "flex",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 300,
      backgroundColor: "#212121",
    },
  },
  userInfoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "56px",
    fontWeight: "700",
  },
  chatBox: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  chat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "transparent",
    maxHeight: 1000,
    overflow: "auto",
    opacity: 1,
    margin: "0 200px",
    width: "80%",
  },
  messageField: {
    height: "150px",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    background: "#212121",
    borderRadius: "15px",
    fontSize: "25px",
    transition: "color 50ms linear 0s !important",
  },
  menuItem: {
    background: "#212121",
    "&:hover": {
      background: "#2c2c2c",
    },
  },
  editor: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "transparent",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
  },
};

export const addCenter = {
  display: "flex",
  justofyContent: "center",
  alignItems: "center",
};
