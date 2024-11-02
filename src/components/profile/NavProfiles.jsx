import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const NavProfiles = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="bg-gray-900 text-white w-64 p-6 mx-0 rounded-lg">
        <h2 className="text-2xl font-bold mb-8">Menú</h2>
        <nav className="space-y-4">
          {user?.tipoUsuario === "Admin" ? (
            <>
              <NavLink
                to="/profile/clientes"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-person-circle mr-2"></i>
                Módulo Clientes
              </NavLink>
              <NavLink
                to="/profile/tecnicos"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-person-badge-fill mr-2"></i>
                Módulo técnicos
              </NavLink>
              <NavLink
                to="/profile/soportes"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-person-fill-gear mr-2"></i>
                Soportes Técnicos
              </NavLink>
              <NavLink
                to="/profile/instalations"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-router-fill mr-2"></i>
                Instalaciones
              </NavLink>
              <NavLink
                to="/profile/retiros"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-emoji-frown-fill mr-2"></i>
                Retiros
              </NavLink>
              <NavLink
                to="/profile/nodos"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-diagram-3-fill mr-2"></i>
                Nodos
              </NavLink>
            </>
          ) : user?.tipoUsuario === "Cliente" ? (
            <>
              <NavLink
                to="soportes/mis-soportes"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-wrench-adjustable mr-2"></i>
                Soporte técnico
              </NavLink>
              <NavLink
                to="/profile/misFacturas"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-receipt mr-2"></i>
                Mis facturas
              </NavLink>
              <NavLink
                to="/profile/realtime"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-chat-dots mr-2"></i>
                Soporte Online
              </NavLink>
              <NavLink
                to="/profile/edit"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-pencil mr-2"></i>
                Editar mi perfil
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-calendar2-week mr-2"></i>
                Agenda
              </NavLink>
              <NavLink
                to="/profile/blogs"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-book-half mr-2"></i>
                Blogs
              </NavLink>
              <NavLink
                to="soportes/mis-Soportes"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-wrench-adjustable mr-2"></i>
                Soportes técnicos
              </NavLink>
              <NavLink
                to="/profile/edit"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-200 text-white no-underline ${
                    isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-700"
                  }`
                }
              >
                <i className="bi bi-pencil mr-2"></i>
                Editar Perfil
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};
