import { ButtonPay } from "./StyledComponentsFacturas";
import { Badge, Card } from "react-bootstrap";
import { format } from "date-fns";
import { createPago } from "../../api/pagos";

export const FacturaDetail = ({ factura }) => {
  const handlePayClick = async () => {
    const { data: url } = await createPago({
      referencia: factura.referencia,
      descripcion: factura.descripcionServicio,
      valor: factura.total,
      idReferencia: factura.id,
    });

    window.open(url, "_blank");
  };
  return (
    <div>
      {factura && (
        <Card style={{ width: "18rem", height: "19rem", borderRadius: "15px" }}>
          <Card.Body>
            <Card.Title>
              <i className="bi bi-receipt-cutoff"></i> Factura{" "}
              {factura.numeroFactura}{" "}
            </Card.Title>
            <Card.Text>Usuario: {factura.cliente.nombreCompleto}</Card.Text>
            <Card.Text>Servicio: {factura.descripcionServicio}</Card.Text>
            <Card.Text>Valor: $ {factura?.total}</Card.Text>
            <Card.Text>
              Fecha limite de pago:{" "}
              {format(new Date(factura?.fechaLimite), "dd/MM/yyyy")}
            </Card.Text>
            {new Date(factura?.fechaLimite) < new Date() &&
            factura.estado === false ? (
              <Card.Text>Estado: Vencida</Card.Text>
            ) : (
              <Card.Text>
                Estado:{" "}
                {factura?.estado ? (
                  <Badge bg="success">
                    {" "}
                    <i className="bi bi-check-all" style={{ color: "white" }}>
                      Pagada
                    </i>
                  </Badge>
                ) : (
                  "Pendiente"
                )}
              </Card.Text>
            )}
            {factura?.estado ? null : new Date(factura?.fechaLimite) <
              new Date() ? (
              <Badge bg="secondary">Vencido</Badge>
            ) : (
              <ButtonPay onClick={handlePayClick}>Pagar Online</ButtonPay>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
