import { IconStyled } from "./StyledComponents";
import "./ButtonWhatsapp.css";

export const ButtonWhatsapp = () => {
  return (
    <>
      <div
        className="whatsapp-button-container"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        <IconStyled
          href="https://api.whatsapp.com/send?phone=573122821189&text=Hola%2C+quiero+saber+mas+sobre+el+Internet+de+alta+de+Velocidad+de+Prolink%21"
          target="_blank"
          className="whatsapp-button"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            backgroundColor: "#25D366",
            borderRadius: "50%",
            color: "white",
            fontSize: "28px",
            boxShadow:
              "0 8px 32px rgba(37, 211, 102, 0.4), 0 4px 16px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            border: "3px solid rgba(255, 255, 255, 0.9)",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1) rotate(5deg)";
            e.target.style.boxShadow =
              "0 12px 40px rgba(37, 211, 102, 0.6), 0 6px 20px rgba(0, 0, 0, 0.15)";
            e.target.style.backgroundColor = "#128C7E";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1) rotate(0deg)";
            e.target.style.boxShadow =
              "0 8px 32px rgba(37, 211, 102, 0.4), 0 4px 16px rgba(0, 0, 0, 0.1)";
            e.target.style.backgroundColor = "#25D366";
          }}
        >
          {/* Efecto de ondas */}
          <div className="wave-1" />
          <div className="wave-2" />

          <i className="bi bi-whatsapp" style={{ zIndex: 2 }}></i>
        </IconStyled>

        {/* Tooltip mejorado */}
        <div
          className="whatsapp-tooltip"
          style={{
            position: "absolute",
            right: "70px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "500",
            whiteSpace: "nowrap",
            opacity: 0,
            visibility: "hidden",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          ¡Chatea con nosotros!
          <div
            style={{
              position: "absolute",
              right: "-6px",
              top: "50%",
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderLeft: "6px solid rgba(0, 0, 0, 0.8)",
            }}
          />
        </div>
      </div>
    </>
  );
};
