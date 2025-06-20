import { AboutUs } from "../components/AboutUs";
import { Services } from "../components/servicios/Services";
import { ButtonWhatsapp } from "../components/ButtonWhatsapp";
import { Payments } from "../components/Payment";
import { FirstSection } from "../components/home/FirstSection";
import { ServicesRadio } from "../components/servicios/ServicesRadio";
import { TestV } from "../components/home/TestV";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="fade-in-up">
        <FirstSection />
      </div>

      <div className="fade-in-up delay-1">
        <AboutUs />
      </div>

      <div className="section-divider"></div>

      <div className="fade-in-up delay-2">
        <ServicesRadio />
      </div>

      <div className="section-divider"></div>

      <div className="fade-in-up delay-3">
        <Services />
      </div>

      <div className="fade-in-up delay-4">
        <TestV />
      </div>

      <div className="section-divider"></div>

      <div className="fade-in-up delay-4">
        <Payments />
      </div>

      <ButtonWhatsapp />
    </div>
  );
};
