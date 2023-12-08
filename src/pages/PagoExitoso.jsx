import { ContainerBlog } from "../components/blog/StyledComponentsBlog";
import { useLocation } from "react-router-dom";
import { useFactura } from "../domain/useFactura";
import { Table } from "react-bootstrap";

export const PagoExitoso = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ref = params.get("ref");
  const { data, loading, error } = useFactura({ id: ref });
  return (
    <ContainerBlog>
      <div className="d-flex justify-content-center flex-column align-items-center gap-2 pt-5 pb-5">
        <h1>Pago exitoso</h1>
        {console.log(ref)}
        {loading && <p>Cargando...</p>}
        {data && (
          <div className="d-flex flex-column align-items-center">
            <p>
              El pago de su factura {data?.referencia} se ha realizado
              Exitosamente
            </p>
            <i className="bi bi-file-check-fill  fs-1 "></i>
            <p>Gracias por su pago</p>
            <p>Detalles del pago:</p>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Id del pago</td>
                  <td>#{data?.pagos[0].referenciaPago}</td>
                </tr>
                <tr>
                  <td>Metodo de Pago</td>
                  <td>
                    <i className="bi bi-credit-card-fill"></i>Credit Card
                  </td>
                </tr>
                <tr>
                  <td>Plataforma de pago</td>
                  <td>Mercado Pago</td>
                </tr>
              </tbody>
            </Table>

            <p>Lo invitamos a registrase y visitar nuestra aplicacion Web</p>
            <p>www.prolink.com.co</p>
          </div>
        )}
      </div>
    </ContainerBlog>
  );
};
