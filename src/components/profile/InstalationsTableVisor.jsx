import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { useState } from "react";
import { EditBlog } from "./StyledComponentsProfile";
import { removeInstalation, updateInstalation } from "../../api/instalaciones";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const InstalationsTableVisor = ({
  instalaciones,
  cargarInstalations,
}) => {
  const navigate = useNavigate();
  const [instsBypage, setIntsByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalInts = instalaciones.length;
  const lastIndex = currentPage * instsBypage;
  const firstIndex = lastIndex - instsBypage;

  const handleCopy = (instalacion) => {
    const text =
      `Servicio de instalación\n` +
      `Nombre: ${instalacion.nameClient}\n` +
      `Telefono: ${instalacion.phone}\n` +
      `Email: ${instalacion.email ? instalacion.email : "No disponible"}\n` +
      `Direccion: ${instalacion.address}\n` +
      `Observaciones: ${instalacion.observation}\n` +
      `Gps: ${instalacion.ubication ? instalacion.ubication : "No disponible"}`;

    navigator.clipboard.writeText(text);
  };

  const editInstalation = (instalacion) => {
    navigate(`/profile/instalations/${instalacion.id}`, {
      state: { instalacion },
    });
  };

  const deleteInstalation = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Cancelar instalacion",
        text: "¿Estás seguro de cancelar la instalación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      // Si el usuario confirma
      if (result.isConfirmed) {
        // Llamada a la API para eliminar la orden
        const response = await removeInstalation(id);

        // Verificar que la respuesta sea 204 OK

        if (response) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: "success",
            title: "Instalación cancelada",
            text: "La instalación ha sido cancelada correctamente.",
          });

          // Recargar las instalaciones
          cargarInstalations();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Actualizar instalacion",
        text: "¿Estás seguro de actualizar la instalación?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      // Si el usuario confirma
      if (result.isConfirmed) {
        // Llamada a la API para eliminar la orden
        const response = await updateInstalation(id, {
          viability: false,
        });

        // Verificar que la respuesta sea 204 OK

        if (response) {
          // Mostrar mensaje de éxito
          await Swal.fire({
            icon: "success",
            title: "Instalación actualizada",
            text: "La instalación ha sido actualizada correctamente.",
          });

          // Recargar las instalaciones
          cargarInstalations();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  return (
    <div className="pt-4">
      {" "}
      <Table striped bordered hover style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            <th>Fecha instalacion</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Gps</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {instalaciones
            .map((instalacion) => (
              <tr key={instalacion.id}>
                <td>{instalacion.dateTime}</td>
                <td>{instalacion.nameClient}</td>
                <td>{instalacion.phone}</td>
                <td>{instalacion.email}</td>
                <td>{instalacion.address}</td>
                <td>
                  {" "}
                  {instalacion.ubication ? (
                    <p>
                      <a
                        href={instalacion.ubication}
                        target="_blank"
                        rel="noreferrer"
                        className="no-underline text-blue-700 hover:cursor-pointer "
                      >
                        <i className="bi bi-check-circle-fill text-green-600"></i>
                        Ver
                      </a>
                    </p>
                  ) : (
                    <i className="bi bi-ban-fill text-red-600"></i>
                  )}
                </td>
                <td>
                  {instalacion.viability ? (
                    <i className="bi bi-hourglass-top text-red-700"></i>
                  ) : (
                    <i className="bi bi-check-all text-green-600"></i>
                  )}
                </td>

                <td>
                  <div className="d-flex flex">
                    <EditBlog
                      onClick={() => {
                        handleCopy(instalacion);
                      }}
                    >
                      <i className="bi bi-clipboard-check"></i>
                    </EditBlog>
                    <EditBlog
                      onClick={() => {
                        editInstalation(instalacion);
                      }}
                    >
                      <i className="bi bi-eye-fill"></i>
                    </EditBlog>
                    <EditBlog
                      onClick={() => {
                        deleteInstalation(instalacion.id);
                      }}
                    >
                      <i className="bi bi-trash3"></i>
                    </EditBlog>
                    <EditBlog
                      onClick={() => {
                        handleUpdate(instalacion.id);
                      }}
                    >
                      <i className="bi bi-check-lg"></i>
                    </EditBlog>
                  </div>
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
