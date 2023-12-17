import { useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { Paginator } from "../Paginator";
import { EditBlog } from "./StyledComponentsProfile";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { createPago } from "../../api/pagos";

export const FacturasTable = ({ facturas }) => {
  const { user } = useContext(AuthContext);
  const [facturasBypage, setFacturasByPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const totalFacturas = facturas?.length;
  const lastIndex = currentPage * facturasBypage;
  const firstIndex = lastIndex - facturasBypage;
  const navigate = useNavigate();

  const handlePayClick = async (factura) => {
    const { data: url } = await createPago({
      referencia: factura.referencia,
      descripcion: factura.descripcionServicio,
      valor: factura.total,
      idReferencia: factura.id,
    });

    window.open(url, "_blank");
    console.log(url);
  };

  const verDetalleSoporte = (factura) => {};
  return (
    <div className="pt-4">
      <Table responsive style={{ fontSize: "0.8rem" }}>
        <thead>
          <tr>
            {user.tipoUsuario === "Admin" ? <th>Cliente</th> : null}
            <th>Contrato</th>
            <th>Factura</th>
            <th>Total</th>
            <th>Fecha límite</th>
            <th>Estado</th>
            {user.tipoUsuario === "Cliente" ? <th>Acciones</th> : null}
          </tr>
        </thead>

        <tbody>
          {facturas
            .map((factura) => (
              <tr key={factura.id}>
                {user.tipoUsuario === "Admin" ? (
                  <td>{factura.cliente?.nombreCompleto}</td>
                ) : null}
                <td>{factura.referencia}</td>
                <td>{factura.numeroFactura}</td>
                <td>{factura.total}</td>
                <td>{format(new Date(factura.fechaLimite), "dd/MM/yyyy")}</td>

                <td>
                  {factura.estado ? (
                    <Badge bg="success">Pagado</Badge>
                  ) : new Date(factura?.fechaLimite) < new Date() ? (
                    <Badge bg="danger">Vencida</Badge>
                  ) : (
                    <Badge bg="warning">Pendiente</Badge>
                  )}
                </td>
                {user.tipoUsuario === "Cliente" ? (
                  <td>
                    {factura.estado ? (
                      <EditBlog>
                        <i className="bi bi-check-circle-fill"></i> Pagada
                      </EditBlog>
                    ) : new Date(factura?.fechaLimite) < new Date() ? (
                      <EditBlog>
                        <i className=" bi-x-circle-fill"></i>
                      </EditBlog>
                    ) : (
                      <EditBlog onClick={() => handlePayClick(factura)}>
                        <i className="bi bi-credit-card-2-front-fill"></i> Pagar
                      </EditBlog>
                    )}
                  </td>
                ) : null}
              </tr>
            ))
            .slice(firstIndex, lastIndex)}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="3">
              <strong>Total Facturas: {facturas.length}</strong>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Paginator
        byPage={facturasBypage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={totalFacturas}
      />
    </div>
  );
};
