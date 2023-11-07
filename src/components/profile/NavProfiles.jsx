import { NavLink } from "react-router-dom";
import { NavLinkStyled, NavStyled } from "./StyledComponentsProfile";
import { Divisor } from "./Divisor";

export const NavProfiles = () => {
  return (
    <div>
      <nav>
        <NavStyled>
          <NavLinkStyled to="blogs">Blogs</NavLinkStyled>

          <NavLinkStyled to="blogs">Soportes tecnicos</NavLinkStyled>

          <NavLinkStyled to="blogs">Cargar facturas</NavLinkStyled>
          <NavLinkStyled to="blogs">Soportes tecnicos</NavLinkStyled>
        </NavStyled>
      </nav>
    </div>
  );
};
