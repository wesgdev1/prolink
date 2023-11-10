import React from "react";
import { ButtonPay, ContainerFacturas } from "./StyledComponentsFacturas";
import { Badge, Button, Card } from "react-bootstrap";
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
    console.log(url);
  };
  return (
    <div>
      {factura && (
        <Card style={{ width: "18rem", height: "270px" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Factura {factura.referencia} </Card.Title>
            <Card.Text>Servicio: {factura.descripcionServicio}</Card.Text>
            <Card.Text>Valor a cancelar: $ {factura?.total}</Card.Text>
            <Card.Text>
              Fecha limite de pago:{" "}
              {format(new Date(factura?.fechaLimite), "dd/MM/yyyy")}
            </Card.Text>
            {
              // realiza la comparacion entre mi fecha limite con la actual
              new Date(factura?.fechaLimite) < new Date() ? (
                <Card.Text>Estado: Vencida</Card.Text>
              ) : (
                <Card.Text>
                  Estado: {factura?.estado ? "Pagada" : "Pendiente"}
                </Card.Text>
              )
            }
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
