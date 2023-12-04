import { Alert, Card, Spinner } from "react-bootstrap";

import "ldrs/ping";

import { ButtonAgent } from "../chats/StyledComponentsChats";
import { useConversaciones } from "../../domain/conversaciones/useConversaciones";
import { useContext, useState } from "react";
import { ButtonProfile } from "./StyledComponentsProfile";
import { RealtimeTable } from "./RealtimeTable";
import { ModalMessages } from "./ModalMessages";
import { AuthContext } from "../../auth/context/AuthContext";

export const RealTime = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading: loading, error } = useConversaciones();

  const [filteredData, setFilteredData] = useState([]);
  const [filtroSelected, setFiltroSelected] = useState("Todo");
  const [modalMessages, setModalMessages] = useState(false);

  const [notificacion, setNotificacion] = useState(false);
  const handleFiltro = (e) => {
    if (e.target.value === "1") {
      const filter = data?.filter((soporte) => {
        return soporte.estado === false;
      });
      setFilteredData(filter);
      setFiltroSelected("1");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "2") {
      const filter = data?.filter((soporte) => {
        return soporte.estado === true;
      });
      setFilteredData(filter);
      setFiltroSelected("2");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "Todo") {
      setFilteredData([]);
      setFiltroSelected("Todo");
    }
  };

  const abrirCaso = () => {};
  return (
    <div className="pt-5">
      <h4 className="pb-3">
        <i className="bi bi-wrench-adjustable"></i> Soportes Online
      </h4>

      <div>
        {user?.tipoUsuario === "Cliente" && (
          <>
            {" "}
            <p>
              <i className="bi bi-person-fill-gear"></i> Agentes Disponibles
            </p>
            <div className="d-flex gap-5 justify-content-center flex-wrap">
              <Card style={{ width: "12rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="d-flex gap-2">
                      <i className="bi bi-person-fill-gear"></i> Agente 1
                      <l-ping size="20" speed="1" color="green"></l-ping>
                    </Card.Title>
                    <Card.Text></Card.Text>
                    <ButtonAgent onClick={() => setModalMessages(true)}>
                      Abrir un Caso
                    </ButtonAgent>
                    <ModalMessages
                      show={modalMessages}
                      onHide={() => setModalMessages(false)}
                      recipientId="1d088966-fa12-4ae2-a5fe-c867a7c40bc7"
                    />
                  </div>
                </Card.Body>
              </Card>
              <Card style={{ width: "12rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="d-flex gap-2">
                      <i className="bi bi-person-fill-gear"></i> Agente 2
                      <l-ping size="20" speed="1" color="green"></l-ping>
                    </Card.Title>
                    <Card.Text></Card.Text>
                    <ButtonAgent variant="primary">Abrir un Caso</ButtonAgent>
                  </div>
                </Card.Body>
              </Card>
              <Card style={{ width: "12rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title className="d-flex gap-2">
                      <i className="bi bi-person-fill-gear"></i> Agente 3
                      <l-ping size="20" speed="1" color="red"></l-ping>
                    </Card.Title>
                    <Card.Text></Card.Text>
                    <ButtonAgent variant="primary">Abrir un Caso</ButtonAgent>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <hr />
          </>
        )}

        <p>
          <i className="bi bi-chat-left-text-fill"></i>Chats
        </p>
      </div>

      {loading && <Spinner animation="border" variant="info" />}
      {error && (
        <Alert variant="danger">Ocurrio un problema en el servidor</Alert>
      )}

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-5 w-50">
          <span>Ordenar:</span>
          <select
            className="form-select"
            aria-label="Default select example"
            value={filtroSelected}
            onChange={handleFiltro}
          >
            <option selected>Todo</option>
            <option value="1">Pendientes</option>
            <option value="2">Resueltas</option>
          </select>
        </div>
      </div>

      {notificacion ? (
        <div className="pt-3">
          <p>No se encontraron resultados</p>
          <ButtonProfile onClick={() => setNotificacion(false)}>
            Ver todo
          </ButtonProfile>
        </div>
      ) : filteredData.length > 0 ? (
        <>
          <p className="pt-2">
            Se encontraron: ({filteredData.length}) coincidencias
          </p>

          <ButtonProfile onClick={() => setFilteredData([])}>
            Mostra todo
          </ButtonProfile>
          <RealtimeTable conversaciones={filteredData} />
          <h1>chat filtrado</h1>
        </>
      ) : (
        data && <RealtimeTable conversaciones={data} />
      )}
    </div>
  );
};
