import { Card } from "react-bootstrap";
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
      <div className="mx-2  px-5  pb-3">
        <Card className="text-center">
          <Card.Header>
            {user?.tipoUsuario === "Admin"
              ? "Bienvenido Administrador"
              : user?.tipoUsuario === "Cliente"
              ? "¡Bienvenido! " + user?.cliente.nombreCompleto
              : "¡Bienvenido! " + user?.tecnico.nombreCompleto}
          </Card.Header>
          <Card.Body>
            <img
              src={user?.tipoUsuario === "Admin" ? IMG_ADMIN : user?.urlFoto}
              alt=""
              style={{ width: "10%", borderRadius: "50%" }}
            />
            {user && user?.tipoUsuario === "Admin" ? (
              <div className="d-flex justify-content-between pt-4">
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Cargo: Administrador</Card.Text>
              </div>
            ) : user?.tipoUsuario === "Cliente" ? (
              <div className="d-flex justify-content-between pt-4">
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Casos abiertos: 1 caso abierto</Card.Text>
              </div>
            ) : (
              <div className="d-flex justify-content-between pt-4">
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Soporte del dia: 10 soportes pendientes</Card.Text>
              </div>
            )}

            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          <Card.Footer className="text-muted">
            Ultima Conexion: hace un momento
          </Card.Footer>
        </Card>
      </div>
      <div className="d-flex  mx-2  px-5 pb-5 gap-5 ">
        <div className="">
          <NavProfiles />
        </div>
        {/* <div className="d-flex px-5 flex-grow-1"> */}
        <div className=" px-5 flex-grow-1">
          <ProfilesRoutes />
        </div>
      </div>
    </ContainerProfile>
  );
};
