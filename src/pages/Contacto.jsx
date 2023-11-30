import {
  CardStyledContacto,
  ContainerContacto,
} from "../components/StyledComponents";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ButtonProfile } from "../components/profile/StyledComponentsProfile";

export const Contacto = () => {
  return (
    <ContainerContacto>
      <section>
        <div
          className="position-relative"
          style={{ height: "100vh", backgroundColor: "#e2e8f0" }}
        >
          <iframe
            title="map"
            width="100%"
            height="100%"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3952.0722442346355!2d-72.49631502518135!3d7.887510705811896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNTMnMTUuMCJOIDcywrAyOSczNy41Ilc!5e0!3m2!1ses-419!2sco!4v1701287138887!5m2!1ses-419!2sco"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
        </div>
        {/* quiero que este container superponga mi anterior div pero en la mitad del elemento*/}

        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "40%",
            transform: "translate(50%, -50%)",
          }}
        >
          {" "}
          <CardStyledContacto>
            <Form>
              <div className="pb-4">
                <h3>Solicita aqui informacion de servicios y precios</h3>
              </div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tu correo Electronico</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tu Celular</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Escribe tu consulta</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Escribe detalladamente tu consulta"
                />
              </Form.Group>

              <ButtonProfile>Enviar</ButtonProfile>
            </Form>
          </CardStyledContacto>
        </div>
      </section>
    </ContainerContacto>
  );
};
