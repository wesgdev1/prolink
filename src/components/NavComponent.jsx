import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { NavLogo } from "./NavLogo";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  ButtonHomeLogin,
  ContainerVacioStyled,
  ConteinerNavStyled,
  NavLinkStyled,
  NavLinkStyledLogin,
} from "./StyledComponents";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

export const NavComponent = () => {
  const navItems = [
    { name: "Inicio", url: "/home" },
    { name: "Blog", url: "/blog" },
    { name: "Servicios", url: "/servicios" },
    { name: "Contacto", url: "/contacto" },
  ];

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

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
                {/* <NavLinkStyled to="/servicios">Servicios</NavLinkStyled> */}
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
            {user ? (
              <>
                <NavLinkStyledLogin to="/profile" className="nav-link">
                  <i className="bi bi-person-circle"></i> Perfil
                </NavLinkStyledLogin>
                <Button onClick={handleLogout} className="nav-link ms-4">
                  <i className="bi bi-box-arrow-right"></i> Cerrar sesion
                </Button>
              </>
            ) : (
              <nav>
                <Nav className="d-flex justify-content-center">
                  <ButtonHomeLogin onClick={() => navigate("/login")}>
                    <i className="bi bi-person-circle"></i> Iniciar sesion
                  </ButtonHomeLogin>
                  <ButtonHomeLogin onClick={() => navigate("/signup")}>
                    <i className="bi bi-person-plus"></i> Registrarse
                  </ButtonHomeLogin>
                </Nav>
              </nav>
            )}
          </Col>
        </Row>
      </ConteinerNavStyled>
    </>
  );
};
