import { Card, Spinner } from "react-bootstrap";
import { useSoportesDia } from "../../domain/soportes/useSoportesDia";
import { VictoryPie, VictoryLabel } from "victory";
import { useClientes } from "../../domain/clientes/useClientes";
import { useTecnicos } from "../../domain/tecnicos/useTecnicos";
import { useMyBlogs } from "../../domain/useMyBlogs";

export const Information = () => {
  const fecha = new Date();
  const opcionesFecha = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opcionesFecha);

  const { data, loading, error } = useSoportesDia();
  const { data: dataCliente, loading: loading2, error: error2 } = useClientes();
  const {
    data: dataTecnicos,
    loading: loading3,
    error: error3,
  } = useTecnicos();
  const { data: dataBlogs, loading: loading4, error: error4 } = useMyBlogs();

  const contarResueltos = () => {
    let contador = 0;
    data?.forEach((soporte) => {
      if (soporte.estado) {
        contador++;
      }
    });
    return contador;
  };
  const contarPendientes = () => {
    let contador = 0;
    data?.forEach((soporte) => {
      if (!soporte.estado) {
        contador++;
      }
    });
    return contador;
  };
  return (
    <>
      {loading && <Spinner animation="border" variant="info" />}
      {error && <p>Hubo un error</p>}
      {data && dataCliente && dataBlogs && dataTecnicos && (
        <div>
          <div className="d-flex flex-column align-items-center pt-3 flex-wrap ">
            <h2>Informacion diaria</h2>

            <p>{fechaFormateada}</p>
            <div style={{ height: "180px", width: "500px" }}>
              <VictoryPie
                colorScale={["green", "red"]}
                data={[
                  { x: "Resueltos", y: contarResueltos() },
                  { x: "Pendientes", y: contarPendientes() },
                ]}
                animate={{
                  duration: 2000,
                }}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                labelComponent={
                  <VictoryLabel angle={0} style={{ fontSize: 20 }} />
                }
              />
            </div>

            <div className="d-flex gap-5 pt-5 justify-content-center">
              <Card border="success" style={{ width: "10rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Text>Clientes</Card.Text>

                    <Card.Text>
                      <i
                        style={{ fontSize: "3rem" }}
                        className="bi bi-person"
                      ></i>
                    </Card.Text>
                    <Card.Text>{dataCliente.length}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
              <Card border="success" style={{ width: "10rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Text>Tecnicos</Card.Text>

                    <Card.Text>
                      <i
                        style={{ fontSize: "3rem" }}
                        className="bi bi-person-vcard"
                      ></i>
                    </Card.Text>
                    <Card.Text>{dataTecnicos.length}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
              <Card border="success" style={{ width: "10rem" }}>
                <Card.Body>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Text>Blogs</Card.Text>

                    <Card.Text>
                      <i
                        style={{ fontSize: "3rem" }}
                        className="bi bi-file-text"
                      ></i>
                    </Card.Text>
                    <Card.Text>{dataBlogs.length}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
