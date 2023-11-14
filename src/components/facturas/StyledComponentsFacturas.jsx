import styled from "@emotion/styled";
import { Button } from "react-bootstrap";

export const ContainerFacturas = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  flexDirection: "row",
  gap: "50px",
  paddingTop: "10px",
}));

export const ButtonPay = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.colors.mainColor,
  borderColor: "white",
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondayColor,
  },
}));

export const ButtonStyledFactura = styled(Button)(({ theme }) => ({
  width: "60%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));
