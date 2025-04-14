import { Container, Row, Col } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { removeExcustomer, updateExcustomer } from "../../api/retiros";
import {
  StyledTableContainer,
  StyledTable,
  ActionButton,
  ActionButtonsContainer,
  StatusBadge,
  LocationButton,
  CustomerName,
  NoDataText,
  TableFooter,
} from "./TableStyledComponents";

export const ExcustomerTableVisor = ({ instalaciones, cargarRetiros }) => {
  const navigate = useNavigate();
  const [instsBypage, setIntsByPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalInts = instalaciones.length;
  const lastIndex = currentPage * instsBypage;
  const firstIndex = lastIndex - instsBypage;

  const handleCopy = (instalacion) => {
    const text =
      `Servicio de Retiro\n` +
      `Nombre: ${instalacion.nameClient}\n` +
      `Telefono: ${instalacion.phone}\n` +
      `Direccion: ${instalacion.address}\n` +
      `Observaciones: ${instalacion.observation}\n` +
      `Gps: ${instalacion.ubication ? instalacion.ubication : "No disponible"}`;

    navigator.clipboard.writeText(text);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Información copiada",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const editInstalation = (instalacion) => {
    navigate(`/profile/retiros/${instalacion.id}`, {
      state: { instalacion },
    });
  };

  const deleteInstalation = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Cancelar retiro",
        text: "¿Estás seguro de cancelar el retiro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await removeExcustomer(id);

        if (response) {
          await Swal.fire({
            icon: "success",
            title: "Retiro cancelado",
            text: "El retiro ha sido cancelado correctamente.",
          });

          cargarRetiros();
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
        title: "Marcar como realizado",
        text: "¿Estás seguro de marcar como realizado el retiro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await updateExcustomer(id, {
          status: true,
        });

        if (response) {
          await Swal.fire({
            icon: "success",
            title: "Retiro actualizado",
            text: "El retiro ha sido actualizado correctamente.",
          });

          cargarRetiros();
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
    <Container fluid>
      <StyledTableContainer>
        <div className="table-responsive">
          <StyledTable hover responsive>
            <thead>
              <tr>
                <th>Fecha retiro</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>GPS</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {instalaciones
                .map((instalacion) => (
                  <tr key={instalacion.id}>
                    <td>{instalacion.dateTime}</td>
                    <td>
                      <CustomerName>{instalacion.nameClient}</CustomerName>
                    </td>
                    <td>{instalacion.phone}</td>
                    <td>{instalacion.address}</td>
                    <td className="text-center">
                      {instalacion.ubication ? (
                        <LocationButton
                          href={instalacion.ubication}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="bi bi-geo-alt-fill"></i> Ver
                        </LocationButton>
                      ) : (
                        <NoDataText>No disponible</NoDataText>
                      )}
                    </td>
                    <td className="text-center">
                      <StatusBadge status={instalacion.status}>
                        {instalacion.status ? (
                          <>
                            <i className="bi bi-check-all"></i> Realizado
                          </>
                        ) : (
                          <>
                            <i className="bi bi-hourglass-top"></i> Pendiente
                          </>
                        )}
                      </StatusBadge>
                    </td>
                    <td>
                      <ActionButtonsContainer>
                        <ActionButton
                          variant="info"
                          title="Copiar información"
                          onClick={() => handleCopy(instalacion)}
                        >
                          <i className="bi bi-clipboard-check"></i>
                        </ActionButton>
                        <ActionButton
                          title="Ver detalles"
                          onClick={() => editInstalation(instalacion)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          title="Eliminar"
                          onClick={() => deleteInstalation(instalacion.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </ActionButton>
                        <ActionButton
                          variant="success"
                          title="Marcar como realizado"
                          onClick={() => handleUpdate(instalacion.id)}
                        >
                          <i className="bi bi-check-lg"></i>
                        </ActionButton>
                      </ActionButtonsContainer>
                    </td>
                  </tr>
                ))
                .slice(firstIndex, lastIndex)}
            </tbody>
          </StyledTable>
        </div>

        <TableFooter>
          <strong>Total Retiros: {instalaciones.length}</strong>
        </TableFooter>

        <Row className="mt-3">
          <Col>
            <Paginator
              byPage={instsBypage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalInts}
            />
          </Col>
        </Row>
      </StyledTableContainer>
    </Container>
  );
};
