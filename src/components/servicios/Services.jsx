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
      className="pt-5 d-flex flex-column justify-content-center align-items-center gap-5"
    >
      <h1>SERVICIOS</h1>
      <div className="d-flex gap-4 justify-content-center flex-wrap ">
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701294367/Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_dwakut.png"
          }
          title={"Internet + DirecTv GO"}
          description={
            "Hasta 450 megas de internet + DirecTv GO con 3 meses de regalo"
          }
          price={"$ 89.900"}
          priceNormal={"$150.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701963747/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_1_dj9wft.png"
          }
          title={"Internet "}
          description={
            "Hasta 450 megas de internet + DirecTv GO con 3 meses de regalo"
          }
          price={"$ 39.900"}
          priceNormal={"$50.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1701963754/Copia_de_Blue_and_Yellow_Modern_Internet_Services_Provider_Promotion_Instagram_Post_2_e9htbp.png"
          }
          title={"Internet + DirecTv GO"}
          description={
            "Hasta 450 megas de internet + DirecTv GO con 3 meses de regalo"
          }
          price={"$ 69.900"}
          priceNormal={"$80.000"}
        />
      </div>
    </div>
  );
};
