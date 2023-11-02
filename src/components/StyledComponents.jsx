import styled from "@emotion/styled";
import { Button, Carousel } from "react-bootstrap";

export const ButtonHome = styled(Button)(({ theme }) => ({
  width: "40%",
  backgroundColor: theme.colors.mainColor,
  borderColor: "#71BBFB",
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const CaptionStyled = styled(Carousel.Caption)(({ theme }) => ({
  "& p": {
    color: "white",
    textShadow: "3px 4px 1px #000000",
  },
}));
