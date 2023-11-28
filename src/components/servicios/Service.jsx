import { Button, Card } from "react-bootstrap";
import { ButtonInfo } from "./StyledComponentsServices";

export const Service = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://res.cloudinary.com/dppqkypts/image/upload/v1700692550/1plan_vtvvyn.png"
      />
      <Card.Body>
        <Card.Title>Internet + DirecTv GO</Card.Title>
        <Card.Text>
          Hasta 450 megas de internet + DirecTv GO con 3 meses de regalo
        </Card.Text>
        <hr />
        <Card.Text>
          <h4>$ 3.000</h4>
        </Card.Text>
        <ButtonInfo>Solicitar Informacion</ButtonInfo>
      </Card.Body>
    </Card>
  );
};
