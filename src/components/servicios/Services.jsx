import { Service } from "./Service";

export const Services = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://res.cloudinary.com/db9nfgjqr/image/upload/v1698974214/Dise%C3%B1o_sin_t%C3%ADtulo_6_ukijmg.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="pt-5 d-flex flex-column justify-content-center align-items-center gap-5"
    >
      <h1>SERVICIOS</h1>
      <div className="d-flex gap-2 justify-content-center flex-wrap ">
        <Service />
        <Service />
        <Service />
      </div>
    </div>
  );
};
