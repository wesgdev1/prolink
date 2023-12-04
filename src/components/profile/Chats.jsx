import Image from "react-bootstrap/Image";
import Swal from "sweetalert2";

import { useContext, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { Button, ListGroup } from "react-bootstrap";
import {
  ButtonChat,
  FormTextStyle,
  ListMessages,
  ListMessagesItem,
} from "../chats/StyledComponentsChats";
import { ButtonProfile } from "./StyledComponentsProfile";
import { useNavigate, useParams } from "react-router-dom";
import {
  useConversacion,
  useUpdateConversacion,
} from "../../domain/conversaciones/useConversacion";
import { createMessage } from "../../api/mensajes";
import { format, formatDistanceToNow } from "date-fns";

export const Chats = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modalReport, setModalReport] = useState(false);
  const { id } = useParams();
  const { data, loading, error } = useConversacion({ id });
  const {
    data: dataUp,
    loading: loadingUp,
    error: errorUp,
    actions: { updateConversacion },
  } = useUpdateConversacion();
  const [mensajeContenido, setMensajeContenido] = useState("");
  const handleInputChange = (event) => {
    setMensajeContenido(event.target.value);
  };
  const cerraCaso = async () => {
    await updateConversacion(id, { estado: true });
    Swal.fire({
      icon: "success",
      title: "Caso cerrado con exito",
      text: "Te redireccionaremos a tus mensajes",
    });

    navigate("/profile/realtime");
  };

  const generarTicket = async () => {
    navigate("/profile/ticket/add", {
      state: {
        cliente: {
          id: data?.usuarioA.cliente.id,
          nombreCompleto: data?.usuarioA.cliente.nombreCompleto,
        },
      },
    });
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (mensajeContenido !== "") {
      const { response: mensaje } = await createMessage({
        content: mensajeContenido,
        conversacionId: id,
      });
      setMensajeContenido("");
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && mensajeContenido !== "") {
      event.preventDefault();
      const { response: mensaje } = await createMessage({
        content: mensajeContenido,
        conversacionId: id,
      });
      setMensajeContenido("");
    }
  };

  return (
    <>
      <div className="m-auto w-100 p-4 ">
        <div className="d-flex">
          <div className="d-flex flex-column w-50">
            <span className="fs-6 fw-bold mb-4">
              Caso: {data?.numeroConversacion}
            </span>
            <div className="d-flex gap-3">
              <Image
                src="https://res.cloudinary.com/dppqkypts/image/upload/v1700753804/imagesBlog/8d3a5d84b2a92cb6cea3e801c619cf83.png"
                style={{ height: 50, width: 50, borderRadius: "50%" }}
              />
              <div className="text-start">
                {user?.tipoUsuario === "Cliente" ? (
                  <span className="fs-5 fw-bold">Mis datos</span>
                ) : (
                  <span className="fs-5 fw-bold">Datos del Cliente</span>
                )}

                <ListGroup style={{ fontSize: "0.8rem" }}>
                  <ListGroup.Item>
                    <div>
                      <strong>Servicio:</strong>
                    </div>
                    <div>{data?.usuarioA.cliente.servicio}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <strong>Ip:</strong>
                    </div>
                    <div>{data?.usuarioA.cliente.ipNavegacion}</div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div>
                      <strong>Direccion:</strong>
                    </div>
                    <div>{data?.usuarioA.cliente.direccion}</div>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-auto mb-2 mx-2">
              {user.tipoUsuario !== "Admin" ? null : (
                <>
                  {data?.estado ? null : (
                    <div className="d-flex gap-2">
                      <ButtonChat onClick={cerraCaso} className="ms-auto">
                        <i className="bi bi-x-circle-fill"></i> Cerrar caso
                      </ButtonChat>
                      <ButtonChat onClick={generarTicket} className="ms-auto">
                        <i className="bi bi-person-gear"></i> Generar soporte en
                        sitio
                      </ButtonChat>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div
            className="border rounded shadow w-75 justify-content-between pt-4 d-flex flex-column"
            style={{ height: "460px" }}
          >
            <div className="overflow-auto" style={{ maxHeight: "360px" }}>
              <ListMessages className="list-group">
                {
                  //Aqui Va la funcion .map para imprimir el history de los mensajes Cliente-empresa
                  <>
                    {data?.mensajes.map((mensaje) => (
                      <ListMessagesItem
                        className={
                          (user?.tipoUsuario === "Cliente" &&
                          user?.id === mensaje.usuarioId
                            ? "user"
                            : "") ||
                          (user?.tipoUsuario === "Admin" &&
                          user?.id === mensaje.usuarioId
                            ? "user"
                            : "")
                        }
                        key={mensaje.id}
                      >
                        <strong>
                          {" "}
                          {format(
                            new Date(mensaje.createdAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </strong>{" "}
                        <Image
                          src={
                            user?.tipoUsuario === "Cliente"
                              ? mensaje.usuarioId === user?.id
                                ? user?.urlFoto
                                : "https://res.cloudinary.com/dppqkypts/image/upload/v1700682370/ADMIN_zafi93.png"
                              : mensaje.usuarioId === user?.id
                              ? "https://res.cloudinary.com/dppqkypts/image/upload/v1700682370/ADMIN_zafi93.png"
                              : data?.usuarioA.urlFoto
                          }
                          style={{ height: 30, width: 30, borderRadius: "50%" }}
                        />
                        <p className="pt-2 lh-1 m-0 text-start">
                          {mensaje.content}
                        </p>
                      </ListMessagesItem>
                    ))}
                  </>
                }
              </ListMessages>
            </div>

            {data?.estado ? null : (
              <div className="d-flex align-items-center border rounded p-1 m-3">
                <FormTextStyle
                  size="sm"
                  type="text"
                  placeholder="Escribe tu mensaje"
                  value={mensajeContenido}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                />
                <ButtonProfile onClick={handlerSubmit}>
                  <i className="bi bi-send " />
                </ButtonProfile>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
