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
              <NavLinkStyled to="/profile">Crear Cliente</NavLinkStyled>
              <NavLinkStyled to="/profile">Crear Tecnico</NavLinkStyled>
              <NavLinkStyled to="facturas">Cargar Facturas</NavLinkStyled>
              <NavLinkStyled to="/profile">Crear Soportes</NavLinkStyled>
              <NavLinkStyled to="/profile">habilitar Blogs</NavLinkStyled>
            </NavStyled>
          </nav>
        ) : user?.tipoUsuario === "Cliente" ? (
          <nav>
            <NavStyled>
              <NavLinkStyled to="/profile">Soporte tenico</NavLinkStyled>
              <NavLinkStyled to="/profile">Pagar Factura</NavLinkStyled>
            </NavStyled>
          </nav>
        ) : (
          <nav>
            <NavStyled>
              <NavLinkStyled to="blogs">Blogs</NavLinkStyled>
              <NavLinkStyled to="blogs">Soportes tecnicos</NavLinkStyled>
            </NavStyled>
          </nav>
        )}
      </div>
    </div>
  );
};
