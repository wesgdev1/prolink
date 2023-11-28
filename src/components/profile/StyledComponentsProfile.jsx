import styled from "@emotion/styled";
import { Button, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ContainerProfile = styled("div")(({ theme }) => ({
  paddingTop: "150px",
}));

export const NavStyled = styled(Nav)(({ theme }) => ({
  display: "flex",
  width: "200px",
  flexDirection: "column",
  gap: "3rem",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  border: "1px solid #A2A2A2 ",
  // backgroundColor: "#A2A2A2 ",
  borderRadius: "10px",
  color: "#000",

  fontWeight: "bold",
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  fontSize: "1rem",
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: `${theme.colors.mainColor}`,
    // fontSize: "1.2rem",
  },
}));

export const EditBlog = styled(Button)(({ theme }) => ({
  fontSize: "0.8rem",
  color: theme.colors.mainColor,
  background: "transparent",
  border: "none",
  "&:hover": {
    color: "white",
    background: theme.colors.mainColor,
  },
}));

export const ButtonProfile = styled(Button)(({ theme }) => ({
  width: "25%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));
export const ButtonPBlog = styled(Button)(({ theme }) => ({
  width: "60%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));
