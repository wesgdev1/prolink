import { Col, Image, Row } from "react-bootstrap";
import { ButtonProfile } from "./profile/StyledComponentsProfile";
import { useNavigate } from "react-router-dom";

export const Payments = () => {
  const navigate = useNavigate();
  return (
    <Row className="pt-5 pb-2">
      <Col md={5}>
        <div className="d-flex justify-content-end">
          <Image
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1701398326/paga-tu-factura-home_extraLargeThumb_spdkmn.webp"
            rounded
            style={{ width: "55%" }}
          />
        </div>
      </Col>

      <Col md={7}>
        <div className="d-flex  flex-column justify-content-end mx-5 pt-5">
          <h2>¿COMO PUEDES PAGAR?</h2>

          <p>
            Cuenta Bancolombia Ahorros Numero: 80927482734 - Prolink
            Comunicaciones SAS
          </p>
          <p>Nit: 9010290012</p>
          <p>
            Si requieres asesoria o tienes dudas al momento de elegir algunos de
            nuestros planes da click en el siguiente boton.
          </p>
          <ButtonProfile onClick={() => navigate("/contacto")}>
            ¡Solicitar informacion!
          </ButtonProfile>
        </div>
      </Col>
    </Row>
  );
};
