import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { NavLogo } from "./NavLogo";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
  ButtonHomeLogin,
  ContainerVacioStyled,
  ConteinerNavStyled,
  NavbarS,
  NavLinkStyled,
  NavLinkStyled2,
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
        <div
          style={{
            height: "20px",
            backgroundColor: "transparent",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            fontSize: "0.8rem",
            color: "white",
            borderBottom: "1px solid white",
            paddingBottom: "15px",
          }}
        >
          <span>
            <i className="bi bi-geo-alt text-red-600"></i> Cúcuta - Norte
            Santander
          </span>

          <span>
            <i className="bi bi-whatsapp text-green-500"></i> 3122821189
          </span>
        </div>
        <NavbarS expand="lg">
          <Container>
            <Navbar.Brand href="#home">Prolink</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav d-flex justify-content-center">
              <Nav className="me-auto">
                <NavLinkStyled2 to="/home">Inicio</NavLinkStyled2>
                <NavLinkStyled2 to="/contacto">Contacto</NavLinkStyled2>
              </Nav>

              <Nav className="">
                {user ? (
                  <>
                    <NavLinkStyled2 to="/profile">Mi perfil</NavLinkStyled2>
                    <NavLinkStyled2 to="home" onClick={handleLogout}>
                      Cerrar sesion
                    </NavLinkStyled2>
                  </>
                ) : (
                  <>
                    <NavLinkStyled2 to="/login">Iniciar sesion</NavLinkStyled2>
                    <NavLinkStyled2 to="/signup">Registrase</NavLinkStyled2>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </NavbarS>
        {/* <Row>
          <Col xs={4} md={3}>
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
                  <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                </Button>
              </>
            ) : (
              <nav>
                <Nav className="d-flex justify-content-center">
                  <ButtonHomeLogin onClick={() => navigate("/login")}>
                    <i className="bi bi-person-circle"></i> Iniciar sesión
                  </ButtonHomeLogin>
                  <ButtonHomeLogin onClick={() => navigate("/signup")}>
                    <i className="bi bi-person-plus"></i> Registrarse
                  </ButtonHomeLogin>
                </Nav>
              </nav>
            )}
          </Col>
        </Row> */}
      </ConteinerNavStyled>
    </>
  );
};
