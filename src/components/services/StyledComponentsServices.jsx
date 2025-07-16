import styled from "@emotion/styled";
import { Button, Card, Container } from "react-bootstrap";

export const ButtonInfo = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
  },
}));

// Contenedor principal de servicios
export const ServicesContainer = styled(Container)(() => ({
  paddingBottom: "50px",
}));

// Header solo con título
export const ServicesHeader = styled("div")(() => ({
  textAlign: "center",
  marginBottom: "30px",
}));

export const ServicesTitle = styled("h2")(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  background: `linear-gradient(135deg, ${theme.colors.mainColor}, ${theme.colors.secondaryColor})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "0",
  textAlign: "left",

  gap: "15px",
  "&::before": {
    content: '"📡"',
    fontSize: "2rem",
  },
}));

// Sección de búsqueda y controles
export const SearchSection = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "30px",
  gap: "20px",
  flexWrap: "wrap",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "15px",
  },
}));

export const SearchContainer = styled("div")(() => ({
  display: "flex",
  gap: "15px",
  alignItems: "center",
  flex: 1,
  maxWidth: "600px",
  "@media (max-width: 768px)": {
    width: "100%",
    maxWidth: "none",
    flexDirection: "column",
    gap: "10px",
  },
}));

export const SearchInput = styled("input")(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "12px",
  border: `2px solid ${theme.colors.mainColor}30`,
  fontSize: "0.95rem",
  transition: "all 0.3s ease",
  outline: "none",
  flex: 1,
  minWidth: "250px",
  "&:focus": {
    borderColor: theme.colors.mainColor,
    boxShadow: `0 0 0 3px ${theme.colors.mainColor}20`,
  },
  "&::placeholder": {
    color: "#9ca3af",
  },
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "12px",
  border: `2px solid ${theme.colors.mainColor}30`,
  fontSize: "0.95rem",
  transition: "all 0.3s ease",
  outline: "none",
  minWidth: "180px",
  backgroundColor: "white",
  cursor: "pointer",
  "&:focus": {
    borderColor: theme.colors.mainColor,
    boxShadow: `0 0 0 3px ${theme.colors.mainColor}20`,
  },
}));

export const SearchStats = styled("div")(() => ({
  fontSize: "0.9rem",
  color: "#6b7280",
  fontWeight: "500",
  whiteSpace: "nowrap",
}));

export const AddServiceButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.colors.mainColor,
  borderColor: theme.colors.mainColor,
  color: "white",
  fontWeight: "600",
  padding: "12px 24px",
  borderRadius: "12px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "1rem",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: theme.colors.secondaryColor,
    borderColor: theme.colors.secondaryColor,
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
}));

// Contenedor de tarjetas
export const ServicesGrid = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr",
    gap: "15px",
  },
}));

// Tarjeta de servicio
export const ServiceCard = styled(Card)(({ theme }) => ({
  border: "none",
  borderRadius: "16px",
  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1), 0 1px 6px rgba(0,0,0,0.1)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  minHeight: "280px",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 16px 32px rgba(0,0,0,0.15), 0 1px 6px rgba(0,0,0,0.1)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.colors.mainColor}, ${theme.colors.secondaryColor})`,
  },
}));

export const ServiceCardHeader = styled(Card.Header)(() => ({
  backgroundColor: "transparent",
  border: "none",
  paddingTop: "20px",
  paddingBottom: "15px",
  position: "relative",
}));

export const ServiceTypeChip = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: `${theme.colors.mainColor}15`,
  color: theme.colors.mainColor,
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "0.8rem",
  fontWeight: "600",
  marginBottom: "12px",
  border: `1px solid ${theme.colors.mainColor}30`,
}));

export const ServiceName = styled("h3")(() => ({
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "#1a202c",
  marginBottom: "8px",
  lineHeight: "1.3",
}));

export const ServiceDescription = styled("p")(() => ({
  color: "#64748b",
  fontSize: "0.85rem",
  lineHeight: "1.4",
  marginBottom: "0",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const ServiceCardBody = styled(Card.Body)(() => ({
  padding: "0 20px 15px 20px",
}));

export const ServiceSpecs = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginBottom: "15px",
}));

export const ServiceSpec = styled("div")(() => ({
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#f8fafc",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
}));

export const SpecValue = styled("div")(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: "700",
  color: theme.colors.mainColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
}));

export const SpecLabel = styled("div")(() => ({
  fontSize: "0.75rem",
  color: "#64748b",
  marginTop: "3px",
  fontWeight: "500",
}));

export const ServicePrice = styled("div")(() => ({
  textAlign: "center",
  marginBottom: "18px",
}));

export const PriceValue = styled("div")(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: "800",
  color: theme.colors.mainColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  "&::before": {
    content: '"$"',
    fontSize: "1.2rem",
    color: "#64748b",
  },
}));

export const PriceLabel = styled("div")(() => ({
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: "500",
}));

export const ServiceCardFooter = styled("div")(() => ({
  padding: "0 20px 20px 20px",
  display: "flex",
  gap: "8px",
}));

export const EditServiceButton = styled(Button)(({ theme }) => ({
  flex: 1,
  backgroundColor: "transparent",
  borderColor: theme.colors.mainColor,
  color: theme.colors.mainColor,
  fontWeight: "600",
  padding: "8px 16px",
  borderRadius: "8px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  fontSize: "0.85rem",
  "&:hover": {
    backgroundColor: theme.colors.mainColor,
    borderColor: theme.colors.mainColor,
    color: "white",
    transform: "translateY(-1px)",
  },
}));

export const StatusBadge = styled("div")(({ theme, status }) => ({
  position: "absolute",
  top: "15px",
  right: "15px",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: "600",
  backgroundColor: status ? "#10b981" : "#ef4444",
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "&::before": {
    content: '"●"',
    fontSize: "0.8rem",
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "60px 20px",
  color: "#64748b",
}));

export const EmptyStateIcon = styled("div")(({ theme }) => ({
  fontSize: "4rem",
  marginBottom: "20px",
  opacity: 0.5,
}));

export const EmptyStateText = styled("h3")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "10px",
}));

export const EmptyStateSubtext = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  color: "#6b7280",
  marginBottom: "0",
}));

export const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 20px",
}));
