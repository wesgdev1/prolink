import { useState } from "react";
import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";

export const TecnicosTable = ({ tecnicos }) => {
  const [tecnicosBypage, setTecnicosByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalTecnicos = tecnicos.length;
  const lastIndex = currentPage * tecnicosBypage;
  const firstIndex = lastIndex - tecnicosBypage;
  const navigate = useNavigate();

  const editTecnico = (tecnico) => {
    navigate(`/profile/tecnicos/${tecnico.id}`, { state: { tecnico } });
  };
  const viewHistory = (tecnico) => {
    navigate(`/profile/tecnicos/${tecnico.id}/soportes`, {
      state: { tecnico },
    });
  };
  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario activo</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tecnicos
            .map((tecnico) => (
              <tr key={tecnico.id}>
                <td>{tecnico.nombreCompleto}</td>
                <td>{tecnico.email}</td>
                <td>{tecnico.usuarioId ? "Si" : "No"}</td>
                <td>{"Tecnico"}</td>

                <td>
                  <EditBlog onClick={() => editTecnico(tecnico)}>
                    <i className="bi bi-eye-fill"></i>
                  </EditBlog>
                  <EditBlog onClick={() => viewHistory(tecnico)}>
                    <i className="bi bi-clock-history"></i>
                  </EditBlog>
                </td>
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Técnicos: {tecnicos.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={tecnicosBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalTecnicos}
      />
    </div>
  );
};
