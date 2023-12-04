import styled from "@emotion/styled";
import { Button, Form } from "react-bootstrap";
export const ButtonAgent = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  fontSize: "0.8rem",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));

export const ListMessages = styled.ul(() => ({
  width: "100%",
  listStyle: "none",
}));

export const ListMessagesItem = styled.li(() => ({
  fontSize: "0.9rem",
  maxWidth: "400px",
  margin: "5px auto 5px 16px",
  padding: 7,
  color: "white",
  background: "linear-gradient(to right, #000000 , #20BFFF  )",
  borderRadius: "10px 10px 10px 0",
  "&.user": {
    margin: "5px 16px 10px auto",

    color: "white",
    background: "linear-gradient(to right, #B56BFF, #20BFFF )",
    textAlign: "end",
    borderRadius: "20px 20px 20px 20px",
  },
}));

export const FormTextStyle = styled(Form.Control)(() => ({
  border: "none",
  height: 4,
  margin: 5,
}));

export const ButtonSentStyle = styled(Button)(({ theme }) => ({
  color: theme.colors.mainColor,
  background: "transparent",
  borderColor: theme.colors.mainColor,
  "&:hover": {
    background: theme.colors.mainColor,
    color: "white",
  },
}));
export const ButtonChat = styled(Button)(({ theme }) => ({
  width: "80%",
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));
