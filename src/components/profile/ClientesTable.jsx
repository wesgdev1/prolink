import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { updateCliente } from "../../api/Clientes";
import { useClientes } from "../../domain/clientes/useClientes";

export const ClientesTable = ({ clientes }) => {
  const [clientesBypage, setClientesByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalClientes = clientes.length;
  const lastIndex = currentPage * clientesBypage;
  const firstIndex = lastIndex - clientesBypage;
  const navigate = useNavigate();
  const { cargarClientes } = useClientes();
  const [dataCliente, setDataCliente] = useState([...clientes]);

  const editCliente = (cliente) => {
    navigate(`/profile/clientes/${cliente.id}`, { state: { cliente } });
  };

  const viewHistory = (cliente) => {
    navigate(`/profile/clientes/${cliente.id}/soportes`, {
      state: { cliente },
    });
  };

  const inactivarContrato = (cliente) => {
    Swal.fire({
      title: "Esta accion inactivara el contrato del cliente, estas seguro?",
      text: "¡No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Inactivar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateCliente(cliente.id, {
          contratoActivo: false,
        });

        if (response) {
          Swal.fire(
            "Inactivado!",
            "El contrato ha sido inactivado.",
            "success"
          );

          const index = dataCliente.findIndex((item) => item.id === cliente.id);
          const newData = [...dataCliente];
          newData[index].contratoActivo = false;
          setDataCliente(newData);
        }
      }
    });
  };

  const activarContrato = (cliente) => {
    Swal.fire({
      title: "Esta accion activara el contrato del cliente, estas seguro?",
      text: "¡No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Activar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateCliente(cliente.id, {
          contratoActivo: true,
        });

        if (response) {
          Swal.fire("Activado!", "El contrato ha sido activado.", "success");
          // actualizo el estado local del cliente
          const index = dataCliente.findIndex((item) => item.id === cliente.id);
          const newData = [...dataCliente];
          newData[index].contratoActivo = true;
          setDataCliente(newData);
        }
      }
    });
  };

  const createTicket = (cliente) => {
    if (cliente.soportesTecnicos.length > 0) {
      // reviso si tiene algun soporte en false osea pendiente, si lo tiene pendiente, notifico que no puede crear ticket
      const soportePendiente = cliente.soportesTecnicos.find(
        (soporte) => !soporte.estado
      );
      if (soportePendiente) {
        Swal.fire({
          icon: "error",
          title: "El cliente tiene un soporte en curso",
          text: "Numero Soporte: # " + soportePendiente.numeroSoporte,
        });
      } else {
        navigate(`/profile/ticket/add`, { state: { cliente } });
      }
    } else {
      navigate(`/profile/ticket/add`, { state: { cliente } });
    }
  };

  useEffect(() => {
    setDataCliente([...clientes]);
  }, [clientes]);

  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario activo</th>
            <th>Fecha de contrato</th>
            <th>Contrato</th>
            <th>Contrato</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dataCliente
            .map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombreCompleto}</td>
                <td>{cliente.email}</td>
                <td>{cliente.usuarioId ? "Si" : "No"}</td>
                <td> {format(new Date(cliente.createdAt), "dd/MM/yyyy")}</td>
                <td>{cliente.numeroContrato}</td>
                <td>{cliente.contratoActivo ? "Activo" : "Terminado"}</td>

                {cliente.contratoActivo ? (
                  <td>
                    <EditBlog onClick={() => inactivarContrato(cliente)}>
                      <i className="bi bi-toggle2-on"></i>
                    </EditBlog>
                    <EditBlog onClick={() => editCliente(cliente)}>
                      <i className="bi bi-eye-fill"></i>
                    </EditBlog>
                    <EditBlog onClick={() => createTicket(cliente)}>
                      <i className="bi bi-file-earmark-plus"></i>
                    </EditBlog>
                    <EditBlog onClick={() => viewHistory(cliente)}>
                      <i className="bi bi-clock-history"></i>
                    </EditBlog>
                  </td>
                ) : (
                  <td>
                    <EditBlog onClick={() => activarContrato(cliente)}>
                      <i className="bi bi-toggle2-off"></i>
                    </EditBlog>
                  </td>
                )}
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Clientes: {clientes.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={clientesBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalClientes}
      />
    </div>
  );
};
