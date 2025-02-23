import { Card } from "react-bootstrap";
import { ButtonInfo } from "./StyledComponentsServices";
import { useNavigate } from "react-router-dom";

export const Service = ({ img, title, description, price, priceNormal }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        width: "10rem",
        borderRadius: "20px",
        boxShadow: "3px 3px 10px gray",
        fontSize: "0.8rem",
      }}
    >
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title
          style={{
            fontSize: "1rem",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <hr />
        <Card.Text>
          <h5>{price}</h5>
        </Card.Text>
        <Card.Text>
          <p
            style={{
              textDecoration: "line-through",
            }}
          >
            {priceNormal}
          </p>
        </Card.Text>
        <ButtonInfo onClick={() => navigate("/contacto")}>
          ¡Lo quiero!
        </ButtonInfo>
      </Card.Body>
    </Card>
  );
};
