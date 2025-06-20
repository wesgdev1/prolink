import { Card } from "react-bootstrap";
import { ButtonInfo } from "./StyledComponentsServices";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Service.css";

export const Service = ({ img, title, description, price, priceNormal }) => {
  const navigate = useNavigate();
  return (
    <div className="service-card-wrapper">
      <Card
        className="service-card"
        style={{
          width: "280px",
          minHeight: "420px",
          border: "none",
          borderRadius: "20px",
          background: "linear-gradient(145deg, #ffffff, #f8fafc)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow =
            "0 20px 40px rgba(0,0,0,0.15), 0 1px 8px rgba(0,0,0,0.1)";
          const shine = e.currentTarget.querySelector(".card-shine");
          const image = e.currentTarget.querySelector(".service-image");
          if (shine) {
            shine.style.opacity = "1";
            shine.style.transform = "rotate(45deg) translate(50%, 50%)";
          }
          if (image) {
            image.style.transform = "scale(1.05)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.1), 0 1px 8px rgba(0,0,0,0.1)";
          const shine = e.currentTarget.querySelector(".card-shine");
          const image = e.currentTarget.querySelector(".service-image");
          if (shine) {
            shine.style.opacity = "0";
            shine.style.transform = "rotate(45deg)";
          }
          if (image) {
            image.style.transform = "scale(1)";
          }
        }}
      >
        {/* Efecto de brillo en hover */}
        <div
          className="card-shine"
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background:
              "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
            transform: "rotate(45deg)",
            transition: "all 0.6s ease",
            opacity: 0,
            zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              height: "200px",
              overflow: "hidden",
              borderRadius: "20px 20px 0 0",
              position: "relative",
            }}
          >
            <Card.Img
              variant="top"
              src={img}
              style={{
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.4s ease",
              }}
              className="service-image"
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(transparent 60%, rgba(0,0,0,0.1))",
              }}
            />
          </div>

          <Card.Body style={{ padding: "1.5rem" }}>
            <Card.Title
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "0.75rem",
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </Card.Title>

            <Card.Text
              style={{
                color: "#64748b",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                marginBottom: "1rem",
              }}
            >
              {description}
            </Card.Text>

            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
                margin: "1rem 0",
              }}
            />

            <div style={{ marginBottom: "1rem" }}>
              <Card.Text style={{ margin: 0 }}>
                <h5
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "800",
                    color: "#059669",
                    margin: 0,
                    textShadow: "0 2px 4px rgba(5, 150, 105, 0.1)",
                  }}
                >
                  {price}
                </h5>
              </Card.Text>

              <Card.Text style={{ margin: 0 }}>
                <p
                  style={{
                    textDecoration: "line-through",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    margin: 0,
                  }}
                >
                  {priceNormal}
                </p>
              </Card.Text>
            </div>

            <ButtonInfo
              onClick={() => navigate("/contacto")}
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                border: "none",
                borderRadius: "12px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                width: "100%",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)",
                textTransform: "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #2563eb, #7c3aed)";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 6px 20px rgba(59, 130, 246, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(135deg, #3b82f6, #8b5cf6)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(59, 130, 246, 0.4)";
              }}
            >
              ¡Lo quiero!
            </ButtonInfo>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

Service.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  priceNormal: PropTypes.string.isRequired,
};
