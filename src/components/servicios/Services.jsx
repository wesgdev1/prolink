import { Service } from "./Service";

export const Services = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dppqkypts/image/upload/v1701964129/Dise%C3%B1o_sin_t%C3%ADtulo_14_j0uubt.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="pt-5 mb-4 d-flex flex-column justify-content-center align-items-center gap-5"
    >
      <h3>SERVICIOS FIBRA OPTICA</h3>
      <div className="d-flex gap-3 justify-content-center flex-wrap ">
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701294367/Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_dwakut.png"
          }
          title={"Plan Familia "}
          description={"Hasta 500 megas de internet "}
          price={"$ 79.900"}
          priceNormal={"$150.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701963754/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_2_e9htbp.png"
          }
          title={"Plan Profesional"}
          description={"Hasta 300 megas de internet "}
          price={"$ 69.900"}
          priceNormal={"$140.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701963747/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_1_dj9wft.png"
          }
          title={"Plan Hogar"}
          description={"Hasta 100 megas de internet "}
          price={"$ 55.900"}
          priceNormal={"$80.000"}
        />
      </div>
    </div>
  );
};
