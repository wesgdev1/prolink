import { AboutUs } from "../components/AboutUs";
import { Carrousel } from "../components/Carrousel";
import { NavComponent } from "../components/NavComponent";
import { Services } from "../components/servicios/Services";

export const Home = () => {
  return (
    <>
      <Carrousel />
      <AboutUs />
      <Services />
      <AboutUs />
    </>
  );
};
