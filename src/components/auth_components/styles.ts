export const componentsStyles = {
  signInputProps: {
    sx: {
      color: "white",
      bgcolor: "rgba(0,0,0,0.8)",
      ":hover": {
        bgcolor: "rgba(0,0,0,0.6)",
      },
      ":focus-within": {
        bgcolor: "rgba(0,0,0,0.5)",
      },
      borderRadius: "15px",
    },
    disableUnderline: true,
  },
  columnCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  googleButton: {
    color: "#fff",
    textAlign: "start",
    justifyContent: "flex-start",
    pl: 5,
    mt: 1.5,
  },
};
