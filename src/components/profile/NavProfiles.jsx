import { NavLink } from "react-router-dom";
import { NavLinkStyled, NavStyled } from "./StyledComponentsProfile";
import { Divisor } from "./Divisor";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const NavProfiles = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="d-flex justify-content-between">
        {user?.tipoUsuario === "Admin" ? (
          <nav>
            <NavStyled>
              <NavLinkStyled to="/profile/clientes">
                <i className="bi bi-person-circle"></i>
                Modulo Clientes
              </NavLinkStyled>

              <NavLinkStyled to="/profile/tecnicos">
                <i className="bi bi-person-badge-fill"></i>
                Modulo tecnicos
              </NavLinkStyled>
              <NavLinkStyled to="facturas">
                <i className="bi bi-receipt-cutoff"></i>Cargar Facturas
              </NavLinkStyled>
              <NavLinkStyled to="/profile/soportes">
                <i className="bi bi-person-fill-gear"></i>
                Soportes Tecnicos
              </NavLinkStyled>
              <NavLinkStyled to="/profile/realtime">
                <i className="bi bi-chat-dots"></i>
                Soportes Online
              </NavLinkStyled>
              <NavLinkStyled to="/profile/pings">
                <i className="bi bi-hdd-stack"></i>
                Hosts
              </NavLinkStyled>
              <NavLinkStyled to="/profile/blogs">
                <i className="bi bi-book-half"></i>Modulo de Blogs
              </NavLinkStyled>
            </NavStyled>
          </nav>
        ) : user?.tipoUsuario === "Cliente" ? (
          <nav>
            <NavStyled>
              <NavLinkStyled to="soportes/mis-soportes">
                <i className="bi bi-wrench-adjustable"></i>
                Soporte tecnico
              </NavLinkStyled>

              <NavLinkStyled to="/profile/misFacturas">
                <i className="bi bi-receipt"></i>
                Mis facturas
              </NavLinkStyled>
              <NavLinkStyled to="/profile/realtime">
                <i className="bi bi-chat-dots"></i>
                Soporte Online
              </NavLinkStyled>
              <NavLinkStyled to="/profile/realtime">
                <i className="bi bi-pencil"></i>
                Editar mi perfil
              </NavLinkStyled>
            </NavStyled>
          </nav>
        ) : (
          <nav>
            <NavStyled>
              <NavLinkStyled to="/profile">
                {" "}
                <i className="bi bi-calendar2-week"></i> Agenda
              </NavLinkStyled>
              <NavLinkStyled to="/profile/blogs">
                <i className="bi bi-book-half"></i>Blogs
              </NavLinkStyled>
              <NavLinkStyled to="soportes/mis-Soportes">
                <i className="bi bi-wrench-adjustable"></i> Soportes tecnicos
              </NavLinkStyled>
              <NavLinkStyled to="/profile">
                <i className="bi bi-pencil"></i>Editar Perfil
              </NavLinkStyled>
            </NavStyled>
          </nav>
        )}
      </div>
    </div>
  );
};
