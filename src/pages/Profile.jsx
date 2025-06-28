import { NavProfiles } from "../components/profile/NavProfiles";
import { ProfilesRoutes } from "../components/profile/ProfileRoutes";
import { ContainerProfile } from "../components/profile/StyledComponentsProfile";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

const IMG_ADMIN =
  "https://res.cloudinary.com/dppqkypts/image/upload/v1700682370/ADMIN_zafi93.png";

export const Profile = () => {
  // consumo el contexto
  const { user } = useContext(AuthContext);

  return (
    <ContainerProfile>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Image with Gradient Border */}
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                <img
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-800"
                  src={
                    user?.tipoUsuario === "Admin"
                      ? IMG_ADMIN
                      : user?.urlFoto ||
                        "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                  }
                  alt="User profile"
                />
              </div>

              {/* User Info */}
              <div className="text-center sm:text-left flex-grow">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {user?.tipoUsuario === "Admin"
                    ? "Administrador"
                    : user?.cliente?.nombreCompleto ||
                      user?.tecnico?.nombreCompleto}
                </h2>
                <p className="text-md text-indigo-400 font-medium">
                  {user?.tipoUsuario === "Cliente"
                    ? "Cliente de Fibra Óptica"
                    : "Equipo Prolink"}
                </p>
                <p className="mt-2 text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                  <i className="bi bi-envelope-fill"></i>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Footer with additional info */}
          <div className="bg-gray-900 px-6 py-3 sm:px-8 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-2">
              <p className="flex items-center gap-2">
                <i className="bi bi-wifi text-green-400"></i>
                <span>
                  <span className="font-semibold text-gray-300">
                    Servicio Contratado:
                  </span>{" "}
                  {user?.tipoUsuario === "Cliente"
                    ? "100Mbps Fibra Óptica"
                    : "N/A"}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <i className="bi bi-clock-history"></i>
                <span>Última Conexión: hace un momento</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex  mx-2  px-2 pb-5 gap-2 ">
        <div className="">
          <NavProfiles />
        </div>
        {/* <div className="d-flex px-5 flex-grow-1"> */}
        <div className=" px-5 flex-grow-1 p">
          <ProfilesRoutes />
        </div>
      </div>
    </ContainerProfile>
  );
};
