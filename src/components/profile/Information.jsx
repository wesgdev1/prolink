import { Button, Card, Offcanvas, Spinner } from "react-bootstrap";
import { useSoportesDia } from "../../domain/soportes/useSoportesDia";
import { VictoryPie, VictoryLabel } from "victory";
import { useClientes } from "../../domain/clientes/useClientes";
import { useTecnicos } from "../../domain/tecnicos/useTecnicos";

import { useBlogs } from "../../domain/useBlogs";
import { Zoom } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useConsultas } from "../../domain/useConsultas";
import {
  ButtonConsulta,
  StyledCardConsultas,
  StyledOffCanvas,
} from "./StyledComponentsProfile";
import Swal from "sweetalert2";
import { updateConsulta } from "../../api/consultas";

export const Information = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
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
  const { data: dataBlogs, loading: loading4, error: error4 } = useBlogs();
  const {
    data: dataConsultas,
    loading: loading5,
    error: error5,
  } = useConsultas();

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

  const calcularActivos = () => {
    let contador = 0;
    dataBlogs?.forEach((blog) => {
      if (blog.published) {
        contador++;
      }
    });
    return contador;
  };

  const handleUpdate = (consulta) => {
    Swal.fire({
      title: "¿Desea marcar como resuelta  la consulta?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateConsulta(consulta, { estado: true });

        Swal.fire("Actualizado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se actualizo", "", "info");
      }
    });
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
            {data?.length > 0 ? (
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
            ) : (
              <p>No hay soportes en el momento</p>
            )}
            <Zoom left>
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
                <Card
                  border="success"
                  style={{ width: "10rem", boxShadow: "3px 3px 20px gray" }}
                >
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
                      <Card.Text>Blogs Activos</Card.Text>

                      <Card.Text>
                        <i
                          style={{ fontSize: "3rem" }}
                          className="bi bi-file-text"
                        ></i>
                      </Card.Text>
                      <Card.Text>{calcularActivos()}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>

                <Card
                  border="success"
                  style={{ width: "10rem" }}
                  // onClick={() => navigate("/profile/consultas")}
                  onClick={handleShow}
                >
                  <Card.Body>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                      <Card.Text>Consultas</Card.Text>

                      <Card.Text>
                        <i
                          style={{ fontSize: "3rem" }}
                          className="bi bi-cursor-fill"
                        ></i>
                      </Card.Text>
                      <Card.Text>{dataCliente.length}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Zoom>
          </div>
        </div>
      )}

      <StyledOffCanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Consultas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loading5 && <Spinner animation="border" variant="info" />}

          {dataConsultas.length > 0
            ? dataConsultas.map((consulta) => (
                <StyledCardConsultas key={consulta.id} className="mb-2">
                  <Card.Body>
                    <Card.Title>{consulta.nombre}</Card.Title>
                    <Card.Text>{consulta.createdAt}</Card.Text>
                    <Card.Text>{consulta.mensaje}</Card.Text>
                    <div className="d-flex justify-content-between ">
                      <Card.Text>{consulta.telefono}</Card.Text>
                      <Card.Text>{consulta.email}</Card.Text>
                      <ButtonConsulta onClick={() => handleUpdate(consulta.id)}>
                        <i className="bi bi-clipboard-check-fill"></i>
                      </ButtonConsulta>
                    </div>
                  </Card.Body>
                </StyledCardConsultas>
              ))
            : null}
        </Offcanvas.Body>
      </StyledOffCanvas>
    </>
  );
};
