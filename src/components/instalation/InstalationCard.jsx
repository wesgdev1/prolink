import { Card, Image } from "react-bootstrap";

export const InstalationCard = () => {
  return (
    <Card className="text-center  ">
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
        <Card.Text>
          <strong>Tecnico asignado:</strong>
          <Image
            src="https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
            roundedCircle
            width={50}
            height={50}
          ></Image>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Contacto: 3208719438</Card.Footer>
    </Card>
  );
};
