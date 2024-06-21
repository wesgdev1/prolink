import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { useState } from "react";
import { EditBlog } from "./StyledComponentsProfile";

export const InstalationsTableVisor = ({ instalaciones }) => {
  const [instsBypage, setIntsByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalInts = instalaciones.length;
  const lastIndex = currentPage * instsBypage;
  const firstIndex = lastIndex - instsBypage;
  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Viabilidad</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instalaciones
            .map((instalacion) => (
              <tr key={instalacion.id}>
                <td>{instalacion.nameClient}</td>
                <td>{instalacion.phone}</td>
                <td>{instalacion.email}</td>
                <td>{instalacion.address}</td>
                <td>
                  {instalacion.viability ? (
                    <i className="bi bi-hourglass-top">En espera de visita </i>
                  ) : (
                    <i className="bi bi-ban">Negativa</i>
                  )}
                </td>

                <td>
                  <EditBlog>
                    <i className="bi bi-toggle2-on"></i>
                  </EditBlog>
                  <EditBlog>
                    <i className="bi bi-eye-fill"></i>
                  </EditBlog>
                  <EditBlog>
                    <i className="bi bi-trash3"></i>
                  </EditBlog>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Instalaciones: {instalaciones.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={instsBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalInts}
      />
    </div>
  );
};
