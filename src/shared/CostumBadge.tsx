import { Badge, BadgeProps, styled } from "@mui/material";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(0.5)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const CostumBadge = (props: BadgeProps) => {
  return <StyledBadge {...props} />;
};
