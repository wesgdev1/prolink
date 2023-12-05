import styled from "@emotion/styled";
import { Badge, Button, Card } from "react-bootstrap";

export const ContainerBlog = styled("div")(({ theme }) => ({
  paddingTop: "150px",
}));

export const MainConteiner = styled("div")(({ theme }) => ({
  paddingTop: "2rem",
  paddingLeft: "2rem",
  marginLeft: "2rem",
  display: "flex",
  border: "1px solid #A2A2A2 ",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  width: "100%",
  borderRadius: "10px",
}));

export const MainConteinerBlogForm = styled("div")(({ theme }) => ({
  paddingTop: "2rem",
  paddingLeft: "2rem",
  marginLeft: "2rem",
  display: "flex",
  border: "1px solid #A2A2A2 ",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "between",
  width: "100%",
  borderRadius: "10px",
}));

export const CardStyled = styled(Card)(({ theme }) => ({
  // borderColor: theme.colors.mainColor,
  boxShadow: `3px 3px 10px gray`,
  borderRadius: "20px",

  width: "24%",
  height: "500px",
  "&:hover": {
    boxShadow: `3px 3px 30px ${theme.colors.mainColor}`,
  },
}));

export const CardImgStyled = styled(Card.Img)(({ theme }) => ({
  width: "100%",
  height: "200px",

  borderRadius: "20px 20px 0px 0px",
}));

export const CardDescroptionStyle = styled(Card.Text)(() => ({
  height: "85px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  "& *": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
}));

export const AutorStyled = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontSize: "0.8rem",
}));

export const ButtonLeerStyled = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.colors.mainColor,
  borderColor: "white",
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const BadgeStyled = styled(Badge)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const CardCategory = styled(Card.Text)(({ theme }) => ({
  color: theme.colors.mainColor,
  fontWeight: "bold",
  fontSize: "0.8rem",
}));

export const ContainerBlogDetail = styled("div")(({ theme }) => ({
  paddingTop: "9rem",
  paddingLeft: "9rem",
  paddingRight: "9rem",
}));
