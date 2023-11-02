import React from "react";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { NavLogo } from "./NavLogo";

export const NavComponent = () => {
  const navItems = [
    { name: "Inicio", url: "/home" },
    { name: "Blog", url: "/blog" },
    { name: "Servicios", url: "/servicios" },
    { name: "Contacto", url: "/contacto" },
  ];
  return (
    <>
      <Container
        fluid
        className="pt-5 pb-4"
        style={{ backgroundColor: "#000000" }}
      >
        <Row>
          <Col className md={3}>
            <NavLogo />
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center "
            md={6}
          >
            <nav>
              <Nav activeKey="/home" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link href="/home">Inicio</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">Blog</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Servicios</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Contacto</Nav.Link>
                </Nav.Item>
              </Nav>
            </nav>
          </Col>
          <Col
            style={{ color: "#71bbfb" }}
            className=" d-flex justify-content-end align-items-center"
            md={3}
          >
            <p>Iniciar sesion | Registrarse</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
