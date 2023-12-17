import { ParrafoStyled } from "./StyledComponents";

export const AboutUs = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center pt-5 pb-5">
      <h1 className="">¿ QUIÉNES SOMOS ?</h1>
      <ParrafoStyled className="pt-5 mx-5 ">
        <strong>ProLink </strong>es una empresa líder en el sector de las
        telecomunicaciones, dedicada a proporcionar servicios de internet y
        fibra óptica de vanguardia. Nos enorgullece ser pioneros en la entrega
        de soluciones tecnológicas innovadoras que conectan comunidades,
        negocios y hogares, creando un puente hacia un futuro digital más rápido
        y eficiente. Nuestro <strong>objetivo</strong> es ofrecer un servicio de
        calidad, con la mejor tecnología y la mejor atención al cliente, para
        que nuestros usuarios puedan disfrutar de una experiencia única. Nuestra{" "}
        <strong>misión </strong>es brindar un servicio de internet de alta
        velocidad, confiable y de calidad, para que nuestros clientes puedan
        disfrutar de una experiencia única. Nuestra <strong>vision</strong> es
        ser la empresa líder en el sector de las telecomunicaciones, ofreciendo
        servicios de internet y fibra óptica de vanguardia.
      </ParrafoStyled>
    </div>
  );
};
