import React from "react";
import { ContainerBlog } from "../components/blog/StyledComponentsBlog";
import { useLocation } from "react-router-dom";

export const PagoExitoso = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ref = params.get("ref");
  return (
    <ContainerBlog>
      <div className="d-flex justify-content-center flex-column align-items-center gap-2">
        <h1>Pago exitoso</h1>
        <p>El pago de su factura {ref} se ha realizado Exitosamente</p>
        <p>Lo invitamos a registrase y visitar nuestra aplicacion Web</p>
        <p>www.prolink.com.co</p>
      </div>
    </ContainerBlog>
  );
};
