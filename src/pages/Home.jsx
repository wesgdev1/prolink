import { Button } from "react-bootstrap";
import { AboutUs } from "../components/AboutUs";
import { Carrousel } from "../components/Carrousel";
import { NavComponent } from "../components/NavComponent";
import { Services } from "../components/servicios/Services";
import { ButtonWhatsapp } from "../components/ButtonWhatsapp";
import { Payments } from "../components/Payment";
import { FirstSection } from "../components/home/FirstSection";
import { ServicesRadio } from "../components/servicios/ServicesRadio";
import { TestV } from "../components/home/TestV";

export const Home = () => {
  return (
    <>
      <FirstSection />
      {/* <Carrousel /> */}
      <AboutUs />
      <ServicesRadio />
      <Services />
      <TestV />
      <hr />
      <Payments />
      <ButtonWhatsapp />
    </>
  );
};
