import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

type TypeMessage = {
  text: string;
  sender: boolean;
  date: string;
};

const MessagePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: "#766ac8",
  marginBottom: theme.spacing(2),
  maxWidth: "60%",
}));

const Message = ({ text, sender, date }: TypeMessage) => {
  return (
    <MessagePaper
      sx={{
        alignSelf: sender ? "flex-end" : "flex-start",
        wordBreak: "break-all",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {text}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, alignSelf: "flex-end" }}>
        {date}
      </Typography>
    </MessagePaper>
  );
};

export default Message;
