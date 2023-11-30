import { Button, Card } from "react-bootstrap";
import { ButtonInfo } from "./StyledComponentsServices";

export const Service = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://res.cloudinary.com/dppqkypts/image/upload/v1701294367/Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_dwakut.png"
      />
      <Card.Body>
        <Card.Title>Internet + DirecTv GO</Card.Title>
        <Card.Text>
          Hasta 450 megas de internet + DirecTv GO con 3 meses de regalo
        </Card.Text>
        <hr />
        <Card.Text>
          <h4>$ 49.900</h4>
        </Card.Text>
        <ButtonInfo>Solicitar Informacion</ButtonInfo>
      </Card.Body>
    </Card>
  );
};
