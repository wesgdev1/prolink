import { Col, Row } from "react-bootstrap";
import { FooterContainer } from "../StyledComponents";

export const Footer = () => {
  return (
    <FooterContainer>
      <Row>
        <Col sm>
          <div className="d-flex flex-column align-items-center justify-content-center pt-5">
            <h2>Prolink</h2>
            <p>Empresa del sector de las telecomunicaciones</p>
          </div>
        </Col>
        <Col sm>
          <div className="d-flex flex-column align-items-center justify-content-center pt-5">
            <h2>Enlaces</h2>
            <p>Blogs</p>
            <p>Servicios</p>
            <p>Contacto</p>
          </div>
        </Col>
        <Col sm>
          <div className=" d-flex flex-column align-items-center justify-content-center pt-5 gap-3">
            <h2>Contacto</h2>
            <i className="bi bi-whatsapp"> 312 282 1189</i>

            <i className="bi bi-facebook"> @prolinkComunicaciones</i>
            <i className="bi bi-instagram"> @prolinkComunicaciones</i>
          </div>
        </Col>
      </Row>
      <div className="pt-2 d-flex justify-content-center">
        © 2023 Prolink Comunicaciones
      </div>
    </FooterContainer>
  );
};
