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
      <div className="mx-2  px-5  pb-5">
        <Card
          className="text-center"
          style={{
            background: "linear-gradient(to right, #000A49, #E7F6FE)",
            boxShadow: "0px 0px 30px 0px rgba(0,0,0,0.75)",
            borderRadius: "20px",
          }}
        >
          <Card.Header>
            <strong>
              {user?.tipoUsuario === "Admin"
                ? "Bienvenido Administrador"
                : user?.tipoUsuario === "Cliente"
                ? "¡Bienvenido! " + user?.cliente.nombreCompleto
                : "¡Bienvenido! " + user?.tecnico.nombreCompleto}
            </strong>
          </Card.Header>
          <Card.Body>
            {/* <img
              src={user?.tipoUsuario === "Admin" ? IMG_ADMIN : user?.urlFoto}
              alt=""
              style={{ width: "10%", borderRadius: "50%" }}
            /> */}
            <div>
              <Image
                src={
                  user?.tipoUsuario === "Admin"
                    ? IMG_ADMIN
                    : user?.urlFoto ||
                      "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                }
                roundedCircle
                width={100}
                height={100}
              />
            </div>
            {user && user?.tipoUsuario === "Admin" ? (
              <div className="d-flex justify-content-center pt-4 gap-5">
                <Card.Text>
                  <strong>Email:</strong>
                  {user?.email}
                </Card.Text>
                <Card.Text>
                  <strong>Cargo:</strong> Administrador
                </Card.Text>
              </div>
            ) : user?.tipoUsuario === "Cliente" ? (
              <div className="d-flex justify-content-center pt-4 gap-5">
                <Card.Text>
                  {" "}
                  <strong>Email:</strong> {user?.email}
                </Card.Text>

                <Card.Text>
                  <strong>Servicio:</strong> 100Mbps fibra optica
                </Card.Text>
              </div>
            ) : (
              <div className="d-flex justify-content-center pt-4 gap-5">
                <Card.Text>
                  {" "}
                  <strong>Email:</strong> {user?.email}
                </Card.Text>
                <Card.Text>
                  <strong>Cargo:</strong> Tecnico de soporte
                </Card.Text>
              </div>
            )}

            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          <Card.Footer className="text-muted">
            Ultima Conexion: hace un momento
          </Card.Footer>
        </Card>
      </div>
      <div className="d-flex  mx-2  px-5 pb-5 gap-2 ">
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
