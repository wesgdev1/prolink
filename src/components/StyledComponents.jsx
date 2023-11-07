import styled from "@emotion/styled";
import { Button, Carousel, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ButtonHome = styled(Button)(({ theme }) => ({
  width: "40%",
  backgroundColor: theme.colors.mainColor,
  borderColor: "white",
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const CaptionStyled = styled(Carousel.Caption)(({ theme }) => ({
  "& p": {
    color: "white",
    fontWeight: "bold",
    fontSize: "38px",
    textShadow: "3px 4px 1px #000000",
  },
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.mainColor,
    fontSize: "1.2rem",
  },
}));

export const NavLinkStyledLogin = styled(NavLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.mainColor,
    fontSize: "1.2rem",
  },
}));
export const NavLinkStyledRegister = styled(NavLink)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.mainColor,
    fontSize: "1.2rem",
  },
}));

export const ConteinerNavStyled = styled(Container)(({ theme }) => ({
  // background: `linear-gradient(4deg, black 70%, ${theme.colors.mainColor} 100%)`,

  background: "#000011",
  height: "15%",
  position: "fixed",
  top: 0,

  zIndex: 1,
  overflow: "hidden",

  "::after": {
    content: "''",
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: "5px",
    background: theme.colors.secondaryColor,
    filter: "blur(8px)",
  },
}));

export const ContainerVacioStyled = styled("div")(({ theme }) => ({
  height: "15%",
}));

export const MainConteiner = styled("div")(({ theme }) => ({
  display: "flex",

  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  backgroundImage: `url("https://res.cloudinary.com/db9nfgjqr/image/upload/v1698974214/Dise%C3%B1o_sin_t%C3%ADtulo_6_ukijmg.png")`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  // background: `linear-gradient(100deg, black 10%, ${theme.colors.mainColor} 90%)`,
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  width: "40%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));

export const FooterContainer = styled("div")(({ theme }) => ({
  background: `linear-gradient(100deg, black 70%, ${theme.colors.secondaryColor} 100%)`,
  height: "auto",
  width: "100vw",
  color: "white",
  paddingBottom: "3rem",
}));

export const ButtonWhatsappStyled = styled(Button)(({ theme }) => ({
  width: "40%",

  backgroundColor: theme.colors.mainColor,
  borderColor: "white",
  color: "white",
  position: "fixed",
  bottom: "2%",
  right: "2%",

  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const IconStyled = styled("a")(({ theme }) => ({
  backgroundColor: "green",
  color: "white",
  borderRadius: "50%",
  width: "100px",
  lineHeight: "100px",
  position: "fixed",
  bottom: "2%",
  right: "2%",
  textAlign: "center",
  fontSize: "2rem",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  zIndex: 100,
  "&:hover": {
    textDecoration: "none",
    color: "green",
    backgroundColor: "white",
  },
}));
