import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NavbarS, NavLinkStyled2 } from "./StyledComponents";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import "./NavComponent.css";

export const NavComponent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <>
      <div className={`modern-nav-container ${scrolled ? "scrolled" : ""}`}>
        {/* Top bar con información de contacto */}
        <div className="top-info-bar">
          <div className="info-container">
            <div className="info-item">
              <div className="info-icon location-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
              <span className="info-text">Cúcuta - Norte de Santander</span>
            </div>

            <div className="info-divider"></div>

            <div className="info-item">
              <div className="info-icon whatsapp-icon">
                <i className="bi bi-whatsapp"></i>
              </div>
              <span className="info-text">3122821189</span>
            </div>
          </div>
        </div>

        {/* Navbar principal */}
        <div className="main-navbar">
          <div className="navbar-background"></div>
          <div className="navbar-glow"></div>

          <NavbarS expand="lg" className="custom-navbar">
            <Container>
              {/* Logo con efecto futurista */}
              <Navbar.Brand className="brand-container" href="/home">
                <div className="brand-glow"></div>
                <div className="brand-text">
                  <span className="brand-pro">Pro</span>
                  <span className="brand-link">link</span>
                </div>
                <div className="brand-subtitle">Comunicaciones</div>
              </Navbar.Brand>

              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                className="custom-toggle"
              >
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
                <div className="hamburger-line"></div>
              </Navbar.Toggle>

              <Navbar.Collapse
                id="basic-navbar-nav"
                className="navbar-collapse-custom"
              >
                {/* Navegación principal */}
                <Nav className="main-nav">
                  <div className="nav-item-wrapper">
                    <NavLinkStyled2 to="/home" className="modern-nav-link">
                      <span className="nav-text">Inicio</span>
                      <div className="nav-hover-effect"></div>
                    </NavLinkStyled2>
                  </div>

                  <div className="nav-item-wrapper">
                    <NavLinkStyled2 to="/contacto" className="modern-nav-link">
                      <span className="nav-text">Contacto</span>
                      <div className="nav-hover-effect"></div>
                    </NavLinkStyled2>
                  </div>
                </Nav>

                {/* Navegación de usuario */}
                <Nav className="user-nav">
                  {user ? (
                    <>
                      <div className="nav-item-wrapper">
                        <NavLinkStyled2
                          to="/profile"
                          className="modern-nav-link profile-link"
                        >
                          <div className="nav-icon">
                            <i className="bi bi-person-circle"></i>
                          </div>
                          <span className="nav-text">Mi perfil</span>
                          <div className="nav-hover-effect"></div>
                        </NavLinkStyled2>
                      </div>

                      <div className="nav-item-wrapper">
                        <button
                          onClick={handleLogout}
                          className="modern-nav-button logout-btn"
                        >
                          <div className="btn-background"></div>
                          <div className="nav-icon">
                            <i className="bi bi-box-arrow-right"></i>
                          </div>
                          <span className="nav-text">Cerrar sesión</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="nav-item-wrapper">
                        <NavLinkStyled2
                          to="/login"
                          className="modern-nav-link login-link"
                        >
                          <div className="nav-icon">
                            <i className="bi bi-person-check"></i>
                          </div>
                          <span className="nav-text">Iniciar sesión</span>
                          <div className="nav-hover-effect"></div>
                        </NavLinkStyled2>
                      </div>

                      <div className="nav-item-wrapper">
                        <NavLinkStyled2
                          to="/signup"
                          className="modern-nav-button signup-btn"
                        >
                          <div className="btn-background"></div>
                          <div className="nav-icon">
                            <i className="bi bi-person-plus"></i>
                          </div>
                          <span className="nav-text">Registrarse</span>
                          <div className="btn-glow"></div>
                        </NavLinkStyled2>
                      </div>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </NavbarS>
        </div>

        {/* Indicador de conectividad */}
        <div className="connectivity-indicator">
          <div className="signal-dot active"></div>
          <div className="signal-dot active"></div>
          <div className="signal-dot active"></div>
          <div className="signal-dot"></div>
          <span className="signal-text">Conectado</span>
        </div>
      </div>
    </>
  );
};
