import { Switch, SwitchProps, alpha, styled } from "@mui/material";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#766ac8",
    "&:hover": {
      backgroundColor: alpha("#766ac8", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#766ac8",
  },
}));

const CustomSwitch = (props: SwitchProps) => {
  return <PinkSwitch {...props} />;
};

export default CustomSwitch;
