import { Button, Carousel } from "react-bootstrap";
import { ButtonHome, CaptionStyled } from "./StyledComponents";

export const Carrousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          style={{ width: "10%" }}
          className="d-block w-100"
          src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1698877962/top_sb6rkf.jpg"
          alt="First slide"
        />
        <CaptionStyled>
          <p className="fs-2">CONECTANDO MUNDOS</p>
          <ButtonHome>SERVICIOS</ButtonHome>
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
