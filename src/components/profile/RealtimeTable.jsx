import { useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

export const RealtimeTable = ({ conversaciones }) => {
  const [conversacionesBypage, setConversacionesByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalConversaciones = conversaciones?.length;
  const lastIndex = currentPage * conversacionesBypage;
  const firstIndex = lastIndex - conversacionesBypage;
  const navigate = useNavigate();

  const verChat = (conversacion) => {
    navigate(`/profile/realtime/chats/${conversacion.id}`);
  };
  return (
    <div className="pt-4">
      {" "}
      <Table responsive style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th># Caso</th>
            <th>Fecha Creacion</th>
            <th>Agente</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {conversaciones
            .map((conversacion) => (
              <tr key={conversacion.id}>
                <td>{conversacion.numeroConversacion}</td>
                <td>
                  {format(parseISO(conversacion.createdAt), "dd/MM/yyyy", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>{"Agente 1"}</td>

                <td>
                  {conversacion.estado ? (
                    <Badge bg="success">Resuelto</Badge>
                  ) : (
                    <Badge bg="danger">Pendiente</Badge>
                  )}
                </td>

                <td>
                  <EditBlog onClick={() => verChat(conversacion)}>
                    <i className="bi bi-chat-left-text-fill"></i>
                  </EditBlog>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total soportes: {conversaciones?.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={conversacionesBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalConversaciones}
      />
    </div>
  );
};
