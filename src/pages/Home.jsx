import { Button } from "react-bootstrap";
import { AboutUs } from "../components/AboutUs";
import { Carrousel } from "../components/Carrousel";
import { NavComponent } from "../components/NavComponent";
import { Services } from "../components/servicios/Services";
import { ButtonWhatsapp } from "../components/ButtonWhatsapp";
import { Payments } from "../components/Payment";

export const Home = () => {
  return (
    <>
      <Carrousel />
      <AboutUs />
      <Services />
      <hr />
      <Payments />
      <ButtonWhatsapp />
    </>
  );
};
