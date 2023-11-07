import { Button } from "react-bootstrap";
import { AboutUs } from "../components/AboutUs";
import { Carrousel } from "../components/Carrousel";
import { NavComponent } from "../components/NavComponent";
import { Services } from "../components/servicios/Services";
import { ButtonWhatsapp } from "../components/ButtonWhatsapp";

export const Home = () => {
  return (
    <>
      <Carrousel />
      <AboutUs />
      <Services />
      <AboutUs />
      <ButtonWhatsapp />
    </>
  );
};
