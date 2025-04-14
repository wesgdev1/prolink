import styled from "@emotion/styled";
import { Table, Badge, Button } from "react-bootstrap";

export const StyledTableContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

export const StyledTable = styled(Table)(({ theme }) => ({
  borderRadius: "10px",
  overflow: "hidden",
  fontSize: "0.9rem",
  backgroundColor: "white",
  "& thead": {
    backgroundColor: theme.colors.mainColor,
    color: "white",
  },
  "& th": {
    padding: "15px",
    fontWeight: "600",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "none",
  },
  "& td": {
    padding: "12px 15px",
    verticalAlign: "middle",
  },
  "& tbody tr": {
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: `${theme.colors.secondaryColor}15`,
      transform: "scale(1.004)",
    },
  },
  "& tfoot": {
    backgroundColor: "#f8f9fa",
    fontWeight: "500",
    "& td": {
      padding: "12px 20px",
    },
  },
}));

export const ActionButton = styled(Button)(({ theme, variant }) => {
  let bgColor = theme.colors.mainColor;

  if (variant === "danger") {
    bgColor = "#dc3545";
  } else if (variant === "success") {
    bgColor = "#28a745";
  } else if (variant === "info") {
    bgColor = "#17a2b8";
  }

  return {
    width: "34px",
    height: "34px",
    padding: "0",
    margin: "0 3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    backgroundColor: "transparent",
    border: `1px solid ${bgColor}`,
    color: bgColor,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: bgColor,
      color: "white",
      transform: "translateY(-3px)",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    "&:focus": {
      boxShadow: "none",
    },
  };
});

export const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
`;

export const StatusBadge = styled(Badge)(({ theme, status }) => ({
  padding: "8px 12px",
  fontSize: "0.8rem",
  fontWeight: "600",
  borderRadius: "50px",
  backgroundColor: status ? "#28a745" : theme.colors.mainColor,
  color: "white",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  "& i": {
    fontSize: "1rem",
  },
}));

export const LocationButton = styled(Button)(({ theme }) => ({
  color: theme.colors.mainColor,
  border: "none",
  backgroundColor: "transparent",
  padding: "6px 12px",
  fontSize: "0.85rem",
  fontWeight: "500",
  transition: "all 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  "&:hover": {
    color: theme.colors.secondaryColor,
    backgroundColor: "transparent",
    transform: "scale(1.05)",
  },
  "&:focus": {
    boxShadow: "none",
  },
}));

export const CustomerName = styled.div`
  font-weight: 600;
  color: #333;
`;

export const NoDataText = styled.span`
  color: #6c757d;
  font-style: italic;
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  font-weight: 600;
  color: #333;
`;
