import { Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { useState } from "react";
import { EditBlog } from "./StyledComponentsProfile";
import { removeInstalation, updateInstalation } from "../../api/instalaciones";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./InstalationsTableVisor.css";

export const InstalationsTableVisor = ({
  instalaciones,
  cargarInstalations,
}) => {
  const navigate = useNavigate();
  const [instsBypage] = useState(10);
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

    // Toast notification
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Información copiada",
      showConfirmButton: false,
      timer: 2000,
    });
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

      if (result.isConfirmed) {
        const response = await removeInstalation(id);

        if (response) {
          await Swal.fire({
            icon: "success",
            title: "Instalación cancelada",
            text: "La instalación ha sido cancelada correctamente.",
          });

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

      if (result.isConfirmed) {
        const response = await updateInstalation(id, {
          viability: false,
        });

        if (response) {
          await Swal.fire({
            icon: "success",
            title: "Instalación actualizada",
            text: "La instalación ha sido actualizada correctamente.",
          });

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
    <div className="instalations-container">
      <div className="table-wrapper">
        <div className="table-header">
          <h3 className="table-title">
            <i className="bi bi-tools table-icon"></i>
            Instalaciones
          </h3>
          <div className="table-stats">
            <span className="stats-badge">{instalaciones.length}</span>
          </div>
        </div>

        <div className="table-content">
          <Table
            className="modern-table"
            striped
            bordered
            hover
            style={{ fontSize: "0.8rem" }}
          >
            <thead className="table-head">
              <tr>
                <th>
                  <i className="bi bi-calendar3"></i>
                  Fecha
                </th>
                <th>
                  <i className="bi bi-person"></i>
                  Cliente
                </th>
                <th>
                  <i className="bi bi-telephone"></i>
                  Teléfono
                </th>
                <th>
                  <i className="bi bi-envelope"></i>
                  Email
                </th>
                <th>
                  <i className="bi bi-geo-alt"></i>
                  Dirección
                </th>
                <th>
                  <i className="bi bi-pin-map"></i>
                  GPS
                </th>
                <th>
                  <i className="bi bi-check-circle"></i>
                  Estado
                </th>
                <th>
                  <i className="bi bi-gear"></i>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {instalaciones
                .map((instalacion) => (
                  <tr key={instalacion.id} className="table-row">
                    <td>
                      <div className="date-container">
                        <span className="date-text">
                          {instalacion.dateTime}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="name-container">
                        <div className="name-avatar">
                          {instalacion.nameClient.charAt(0).toUpperCase()}
                        </div>
                        <span className="name-text">
                          {instalacion.nameClient}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="phone-container">
                        <i className="bi bi-phone phone-icon"></i>
                        <span className="phone-text">{instalacion.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="email-container">
                        <span className="email-text">
                          {instalacion.email || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="address-container">
                        <span className="address-text">
                          {instalacion.address}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="gps-container">
                        {instalacion.ubication ? (
                          <a
                            href={instalacion.ubication}
                            target="_blank"
                            rel="noreferrer"
                            className="gps-link"
                          >
                            <i className="bi bi-check-circle-fill gps-icon-available"></i>
                            <span>Ver</span>
                          </a>
                        ) : (
                          <div className="gps-unavailable">
                            <i className="bi bi-ban-fill gps-icon-unavailable"></i>
                            <span>N/A</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="status-container">
                        {instalacion.viability ? (
                          <div className="status-pending">
                            <i className="bi bi-clock status-icon-pending"></i>
                            <span>Pendiente</span>
                          </div>
                        ) : (
                          <div className="status-completed">
                            <i className="bi bi-check-circle status-icon-completed"></i>
                            <span>Completada</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="actions-container">
                        <div
                          className="action-btn copy-btn"
                          onClick={() => handleCopy(instalacion)}
                          title="Copiar"
                        >
                          <EditBlog>
                            <i className="bi bi-clipboard-check"></i>
                          </EditBlog>
                        </div>
                        <div
                          className="action-btn view-btn"
                          onClick={() => editInstalation(instalacion)}
                          title="Ver"
                        >
                          <EditBlog>
                            <i className="bi bi-eye-fill"></i>
                          </EditBlog>
                        </div>
                        <div
                          className="action-btn delete-btn"
                          onClick={() => deleteInstalation(instalacion.id)}
                          title="Cancelar"
                        >
                          <EditBlog>
                            <i className="bi bi-trash3"></i>
                          </EditBlog>
                        </div>
                        <div
                          className="action-btn update-btn"
                          onClick={() => handleUpdate(instalacion.id)}
                          title="Completar"
                        >
                          <EditBlog>
                            <i className="bi bi-check-lg"></i>
                          </EditBlog>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
                .slice(firstIndex, lastIndex)}
            </tbody>
            <tfoot className="table-foot">
              <tr>
                <td colSpan="8" className="footer-cell">
                  <div className="footer-content">
                    <div className="footer-stats">
                      <i className="bi bi-list-check"></i>
                      <strong>
                        Total Instalaciones: {instalaciones.length}
                      </strong>
                    </div>
                    <div className="footer-info">
                      Mostrando {firstIndex + 1} -{" "}
                      {Math.min(lastIndex, instalaciones.length)} de{" "}
                      {instalaciones.length}
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>

        <div className="pagination-wrapper">
          <Paginator
            byPage={instsBypage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={totalInts}
          />
        </div>
      </div>
    </div>
  );
};

InstalationsTableVisor.propTypes = {
  instalaciones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      dateTime: PropTypes.string.isRequired,
      nameClient: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      email: PropTypes.string,
      address: PropTypes.string.isRequired,
      observation: PropTypes.string,
      ubication: PropTypes.string,
      viability: PropTypes.bool.isRequired,
    })
  ).isRequired,
  cargarInstalations: PropTypes.func.isRequired,
};
