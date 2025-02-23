import { Service } from "./Service";

export const ServicesRadio = () => {
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
      <h3>SERVICIOS POR RADIOFRECUENCIA</h3>
      <div className="d-flex gap-3 justify-content-center flex-wrap ">
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1740339025/imagesBlog/pro3_goruf6.png"
          }
          title={"Plan 5 Megas "}
          description={"Ideal para conectar entre 1 a 3 dispositivos"}
          price={"$ 49.800"}
          priceNormal={"$55.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1740339180/imagesBlog/pro4_topjhl.png"
          }
          title={"Plan 8 Megas"}
          description={"Ideal para conectar entre 3 a 5 dispositivos"}
          price={"$78.900 "}
          priceNormal={"$100.000"}
        />
        <Service
          img={
            "https://res.cloudinary.com/dppqkypts/image/upload/v1740339026/imagesBlog/pro1_ylwc20.png"
          }
          title={"Plan 10 Megas"}
          description={"Ideal para conectar entre 5 a 7 dispositivos"}
          price={"$ 98.200"}
          priceNormal={"$120.000"}
        />
      </div>
    </div>
  );
};
