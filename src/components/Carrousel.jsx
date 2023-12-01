import { Button, Carousel } from "react-bootstrap";
import { ButtonHome, CaptionStyled } from "./StyledComponents";
import { useNavigate } from "react-router-dom";

export const Carrousel = () => {
  const navigate = useNavigate();

  const handleClickFactura = () => {
    navigate("/facturas");
  };

  return (
    <Carousel className="pt-5 mt-5 pb-2">
      <Carousel.Item>
        <img
          style={{ width: "100%" }}
          className="d-block w-100"
          src="https://res.cloudinary.com/dppqkypts/image/upload/v1701397521/Dise%C3%B1o_sin_t%C3%ADtulo_ihpxop.svg"
          alt="First slide"
        />
        <CaptionStyled>
          <p>CONECTANDO MUNDOS</p>
          <ButtonHome>SERVICIOS</ButtonHome>
        </CaptionStyled>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ width: "10%" }}
          className="d-block w-100"
          src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1699069305/Dise%C3%B1o_sin_t%C3%ADtulo_10_p30azn.png"
          alt="First slide"
        />
        <CaptionStyled>
          <ButtonHome onClick={handleClickFactura}>Paga tu factura</ButtonHome>
        </CaptionStyled>
      </Carousel.Item>

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=eee"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};
