import { Col, Container, Nav, Row } from "react-bootstrap";
import { NavLogo } from "./NavLogo";
import { NavLink } from "react-router-dom";
import {
  ContainerVacioStyled,
  ConteinerNavStyled,
  NavLinkStyled,
  NavLinkStyledLogin,
} from "./StyledComponents";

export const NavComponent = () => {
  const navItems = [
    { name: "Inicio", url: "/home" },
    { name: "Blog", url: "/blog" },
    { name: "Servicios", url: "/servicios" },
    { name: "Contacto", url: "/contacto" },
  ];

  return (
    <>
      <ConteinerNavStyled fluid className="pt-3 pb-4">
        <Row>
          <Col xs={4} className md={3}>
            <NavLogo />
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center "
            md={6}
            xs={3}
          >
            <nav>
              <Nav className="d-flex justify-content-center gap-4">
                <NavLinkStyled to="/home">Inicio</NavLinkStyled>
                <NavLinkStyled to="/blogs">Blog</NavLinkStyled>
                <NavLinkStyled to="/servicios">Servicios</NavLinkStyled>
                <NavLinkStyled to="/contacto">Contacto</NavLinkStyled>
              </Nav>
            </nav>
          </Col>
          <Col
            style={{ color: "#71bbfb" }}
            className=" d-flex justify-content-end align-items-center"
            md={3}
            xs={5}
          >
            <nav>
              <Nav className="d-flex justify-content-center">
                <NavLinkStyledLogin to="/login" className="nav-link">
                  Iniciar Sesión
                </NavLinkStyledLogin>
                <NavLinkStyledLogin to="/signUp" className="nav-link">
                  Registrarse
                </NavLinkStyledLogin>
              </Nav>
            </nav>
          </Col>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
