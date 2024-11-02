import { Card, Image } from "react-bootstrap";
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
      <div className="mx-2 px-5 ">
        <div className="bg-gradient-to-r from-blue-900 to-purple-500 shadow-lg rounded-3xl p-4 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-right opacity-20"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/dppqkypts/image/upload/v1702437086/Copia_de_Dise%C3%B1o_sin_t%C3%ADtulo_2_ubzban.svg")`,
            }}
          ></div>

          <div className="relative z-10">
            <h2 className="text-lg font-semibold text-white mb-1">
              {user?.tipoUsuario === "Admin"
                ? "Bienvenido, Administrador"
                : user?.tipoUsuario === "Cliente"
                ? `¡Bienvenido! ${user?.cliente.nombreCompleto}`
                : `¡Bienvenido! ${user?.tecnico.nombreCompleto}`}
            </h2>

            <div className="flex justify-center mb-2">
              <img
                src={
                  user?.tipoUsuario === "Admin"
                    ? IMG_ADMIN
                    : user?.urlFoto ||
                      "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                }
                className="w-20 h-20 rounded-full shadow-lg border-4 border-white"
                alt="User profile"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-3 text-white text-xs font-light mb-4">
              <p>
                <span className="font-semibold">Email:</span> {user?.email}
              </p>

              <p>
                <span className="font-semibold">
                  {user?.tipoUsuario === "Admin"
                    ? "Cargo:"
                    : user?.tipoUsuario === "Cliente"
                    ? "Servicio:"
                    : "Cargo:"}
                </span>{" "}
                {user?.tipoUsuario === "Admin"
                  ? "Administrador"
                  : user?.tipoUsuario === "Cliente"
                  ? "100Mbps fibra óptica"
                  : "Técnico de soporte"}
              </p>
            </div>

            <div className="text-gray-300 text-xs">
              Última Conexión: hace un momento
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
