import { AboutUs } from "../components/AboutUs";
import { Carrousel } from "../components/Carrousel";
import { NavComponent } from "../components/NavComponent";

export const Home = () => {
  return (
    <>
      <NavComponent />
      <Carrousel />
      <AboutUs />
      <AboutUs />
      <AboutUs />
    </>
  );
};
