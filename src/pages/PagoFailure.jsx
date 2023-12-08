import { ContainerBlog } from "../components/blog/StyledComponentsBlog";
import { Link } from "react-router-dom";

export const PagoFailure = () => {
  return (
    <ContainerBlog>
      <div className="d-flex justify-content-center flex-column align-items-center gap-2 pt-5 pb-5">
        <h1>Hubo un error en el pago</h1>
        <i className="bi bi-bookmark-x-fill fs-1"></i>

        <p>El pago de su factura No se ha realizado !</p>
        <p>Vuelve a intentarlo mas tarde</p>
        <Link
          to="/facturas"
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          Ir a Modulo de facturas
        </Link>
        <p>www.prolink.com.co</p>
      </div>
    </ContainerBlog>
  );
};
