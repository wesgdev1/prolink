import styled from "@emotion/styled";
import { Button, Nav, Tabs } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ContainerProfile = styled("div")(({ theme }) => ({
  paddingTop: "150px",
}));

export const NavStyled = styled(Nav)(({ theme }) => ({
  display: "flex",
  width: "200px",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2rem",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  paddingLeft: "2rem",
  paddingRight: "2rem",
  // border: "1px solid #A2A2A2 ",
  // borderRight: "1px solid #A2A2A2",
  // boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",

  boxShadow: "inset -10px 0px 10px -10px rgba(64, 0, 129, 0.5)",
  height: "80vh",

  // background: " #D0CFD1 ",
  borderRadius: "10px",
  color: "#000",

  fontWeight: "bold",
}));

export const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  display: "flex",
  paddingTop: "0.8rem",

  gap: "5px",
  fontSize: "0.9rem",
  color: "#000",
  textDecoration: "none",
  "&:hover": {
    color: `${theme.colors.mainColor}`,
    // fontSize: "1.2rem",
  },
  borderTop: "0.3px solid #A2A2A2",

  borderRadius: "3px",
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

export const ContainerCalendar = styled("div")(({ theme }) => ({
  width: "30rem",
  margin: "auto",
  paddingTop: "20px",
  marginTop: "50px",
  fontSize: "1rem",

  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.50)",
  borderRadius: "10px",
  "& > *:first-of-type": {
    margin: "20px",
    paddingBottom: "20px",
  },
  "& *": {
    color: "black",
  },
}));

export const ButtonPing = styled(Button)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.colors.mainColor,
  background: "transparent",
  border: "none",
  "&:hover": {
    color: "white",
    background: theme.colors.mainColor,
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.colors.mainColor,
  },
  "& .MuiTabs-root": {
    color: "red",
  },
}));
