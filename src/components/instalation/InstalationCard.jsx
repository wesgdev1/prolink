import { Card } from "react-bootstrap";

export const InstalationCard = () => {
  return (
    <Card className="text-center">
      <Card.Header>
        <strong>Nombre: </strong> Antonio Pachon
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {" "}
          <strong>Direccion:</strong> Siempreviva
        </Card.Text>
        <Card.Text>
          <strong> Ubicacion: </strong>
          <a target="_blank" href="https://www.google.com" rel="noreferrer">
            Google Maps
          </a>
        </Card.Text>
        <Card.Text>
          <strong>Email:</strong> w@hotmail.com
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Contacto: 3208719438</Card.Footer>
    </Card>
  );
};
