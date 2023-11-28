import styled from "@emotion/styled";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ButtonInfo = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));
