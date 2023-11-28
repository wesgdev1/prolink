import { useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

export const SoportesTable = ({ soportes }) => {
  const [soportesBypage, setSoportesByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalSoportes = soportes.length;
  const lastIndex = currentPage * soportesBypage;
  const firstIndex = lastIndex - soportesBypage;
  const navigate = useNavigate();

  const verDetalleSoporte = (soporte) => {
    navigate(`/profile/soportes/${soporte.id}`);
  };
  return (
    <div className="pt-4">
      {" "}
      <Table responsive style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Cliente</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {soportes
            .map((soporte) => (
              <tr key={soporte.id}>
                <td>{soporte.numeroSoporte}</td>
                <td>
                  {/* {format(new Date(soporte.fechaGeneracion), "dd/MM/yyyy")} */}
                  {/* {format(
                    new Date(`${soporte.fechaGeneracion}T00:00:00.000Z`),
                    "dd/MM/yyyy",
                    {
                      timeZone: "UTC",
                    }
                  )} */}
                  {format(parseISO(soporte.fechaGeneracion), "dd/MM/yyyy", {
                    timeZone: "UTC",
                  })}
                </td>
                <td>{soporte.horaGeneracion}</td>
                <td>{soporte.cliente.nombreCompleto}</td>
                <td>{soporte.descripcion}</td>
                <td>
                  {soporte.estado ? (
                    <Badge bg="success">Resuelto</Badge>
                  ) : (
                    <Badge bg="danger">Pendiente</Badge>
                  )}
                </td>

                <td>
                  <EditBlog onClick={() => verDetalleSoporte(soporte)}>
                    {/* Ver detalle de soporte */}
                    <i className="bi bi-box-arrow-in-right"></i>
                  </EditBlog>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total soportes: {soportes.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={soportesBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalSoportes}
      />
    </div>
  );
};
