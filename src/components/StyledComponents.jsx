import styled from "@emotion/styled";
import {
  Button,
  Card,
  Carousel,
  Container,
  Navbar,
  Pagination,
} from "react-bootstrap";
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
    color: "black",
    // fontWeight: "bold",
    fontSize: "38px",
    // textShadow: "3px 4px 1px #000000",
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

export const NavLinkStyled2 = styled(NavLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  marginLeft: "10px",
  "&:hover": {
    color: theme.colors.mainColor,
  },
}));

export const NavLinkStyledLogin = styled(NavLink)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  "&:hover": {
    color: theme.colors.mainColor,
    fontSize: "1.2rem",
  },

  // en moviles quiero que desaparezca
}));

export const ControlsProfileMenu = styled("div")(({ theme }) => ({
  "@media (max-width: 768px)": {
    display: "none",
  },
}));
export const ButtonHomeLogin = styled(Button)(({ theme }) => ({
  color: theme.colors.mainColor,
  background: "transparent",
  border: "none",
  "&:hover": {
    color: "white",
    background: theme.colors.mainColor,
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

  position: "fixed",
  top: 0,

  zIndex: 10,
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

  // backgroundImage: `url("https://res.cloudinary.com/db9nfgjqr/image/upload/v1698974214/Dise%C3%B1o_sin_t%C3%ADtulo_6_ukijmg.png")`,
  backgroundSize: "cover",
  // da trasparencia a la imagen de fondo usa la propieda de trasnparecnia

  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "white",

  // coloca un gradiante blanco y gris, pero que predonomine bastan el blanco

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

export const ButtonStyled2 = styled(Button)(({ theme }) => ({
  width: "90%",
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
  // width: "100vw",
  color: "white",
  paddingBottom: "3rem",
  paddingLeft: "10px",
  paddingRight: "10px",
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
  width: "70px",
  lineHeight: "70px",
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

export const PaginationStyle = styled(Pagination)(({ theme }) => ({
  justifyContent: "center",
}));

export const PagPrevStyle = styled(Pagination.Prev)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "5px",
  },
}));
export const PagItemStyle = styled(Pagination.Item)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "50%",
  },
  "&.active .page-link": {
    backgroundColor: theme.colors.mainColor,
    color: "white",
  },
}));

export const PagEllipsisStyle = styled(Pagination.Ellipsis)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "50%",
  },
}));

export const PagNextStyle = styled(Pagination.Next)(({ theme }) => ({
  margin: 5,
  "& * ": {
    color: theme.colors.mainColor,
    borderRadius: "5px",
  },
}));

export const ImgStyled = styled("img")(({ theme }) => ({
  width: "60%",
  height: "60%",
  objectFit: "cover",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
}));

export const ContainerContacto = styled("div")(({ theme }) => ({
  paddingTop: "100px",
}));

export const CardStyledContacto = styled(Card)(({ theme }) => ({
  marginTop: "150px",
  width: "370px",

  boxShadow: `10px 10px 10px grey`,
  borderRadius: "10px",
  padding: "30px",
}));

export const ParrafoStyled = styled("p")(({ theme }) => ({
  textAlign: "justify",
}));

export const ButtonStyledUpdate = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));

export const CardInformationConsultas = styled(Card)(({ theme }) => ({
  width: "10rem",
  boxShadow: `3px 3px 20px grey`,
  "&:hover": {
    boxShadow: `10px 10px 10px ${theme.colors.mainColor}`,
  },
}));

export const NavbarS = styled(Navbar)(({ theme }) => ({
  background: "transparent",
  color: "white",
  "& a": {
    color: "white",
    "&:hover": {
      color: theme.colors.mainColor,
    },
  },

  "& .navbar-toggler": {
    color: "white",
    borderColor: "white",
    backgroundColor: "white",
  },
}));
