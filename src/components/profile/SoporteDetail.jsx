import React, { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Alert, Badge, Card, Form, Spinner } from "react-bootstrap";
import { useSoporte } from "../../domain/soportes/useSoporte";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyledFactura } from "../facturas/StyledComponentsFacturas";
import { updateSoporte } from "../../api/soportes";
import { formatError } from "./utils";
import { format } from "date-fns";

const solucionRqd = z.string({
  required_error: "La descripcion de la solicion es requerida",
});

const solucionSchema = z.object({
  solucion: solucionRqd.min(
    6,
    "La descripcion de la solucion debe tener mínimo 5 caracteres"
  ),
});

export const SoporteDetail = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error: error2 } = useSoporte({ id });
  const initialValues = {
    solucion: "",
  };

  const onCerrarSoporte = async (values) => {
    const response = await updateSoporte(id, { ...values, estado: true });
    const { data } = response;
    navigate("/profile/soportes/mis-Soportes");
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      await onCerrarSoporte(values);
      setSubmitting(false);
    } catch (error) {
      const message = formatError(error);
      setError(message);
    }
  };
  return (
    <>
      {loading && <Spinner animation="border" variant="info" />}
      {error2 && <Alert variant="danger">{error}</Alert>}
      {data && (
        <div className="pt-4">
          <h5>
            {" "}
            <i className="bi bi-clipboard-data-fill"></i>Detalle de soporte
            numero # {data?.numeroSoporte}{" "}
          </h5>
          <hr />
          <div className="d-flex justify-content-around">
            <div>
              <p>
                <i className="bi bi-radioactive"></i>
                Estado:{" "}
                {data?.estado ? (
                  <Badge bg="success">Resuelto</Badge>
                ) : (
                  <Badge bg="danger">Pendiente</Badge>
                )}
              </p>
              <p>
                <i className="bi bi-calendar3"></i>Fecha de Agendamiento:{" "}
                {data?.fechaGeneracion}
              </p>
            </div>
            <div>
              <p>
                <i className="bi bi-hourglass-bottom"></i>Hora atencion tecnica:{" "}
                {data?.horaGeneracion}
              </p>
              <p>
                <i className="bi bi-person-fill-check"></i>Tecnico asignado:{" "}
                {data?.tecnico?.nombreCompleto}
              </p>
            </div>
          </div>

          <hr />
          <div className="d-flex gap-5 justify-content-center flex-wrap pt-2 ">
            <Card
              style={{
                width: "18rem",
                // background: "linear-gradient(to right, #71bbfb, #5e2bff)",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
            >
              <Card.Body>
                <Card.Title>Datos del Cliente</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Nombre: {data.cliente?.nombreCompleto}
                </Card.Subtitle>
                <Card.Text>Email: {data.cliente?.email}</Card.Text>
                <Card.Text>Telefono: {data.cliente?.telefono}</Card.Text>
                <Card.Text>Direccion: {data.cliente?.direccion}</Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                // background: "linear-gradient(to right, #71bbfb, #5e2bff)",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
            >
              <Card.Body>
                <Card.Title>Datos Tecnicos</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Servicio: {data.cliente?.servicio}
                </Card.Subtitle>
                <Card.Text>
                  Ip Navegacion: {data.cliente?.ipNavegacion}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "18rem",
                // background: "linear-gradient(to right, #71bbfb, #FB484B )",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
            >
              <Card.Body>
                <Card.Title>Falla reportada</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Tipo: {data?.titulo}
                </Card.Subtitle>
                <Card.Text>Descripcion: {data?.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="pt-3">
            {/* aqui describo la solucion si esta en estado resuelto o genero el formulario de solucion si esta en pendiente para cerrar soporte */}
            {data?.estado ? (
              <Card
                style={{
                  width: "100%",
                  background: "linear-gradient(to right, #EFFFEA  , #186B00 )",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                }}
              >
                <Card.Body>
                  <Card.Title>Solucion [Caso cerrado]</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Tipo: {data?.titulo}
                  </Card.Subtitle>
                  <Card.Text>{data?.solucion}</Card.Text>
                  <Card.Text>
                    Fecha de cierre:
                    {format(new Date(data?.updatedAt), "dd/MM/yyyy")}
                  </Card.Text>
                </Card.Body>
              </Card>
            ) : (
              <div className="d-flex flex-column gap-2">
                <h5> Descripcion de la Solucion: </h5>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={toFormikValidationSchema(solucionSchema)}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <>
                      <Form
                        className="d-flex flex-column gap-2 "
                        onSubmit={handleSubmit}
                      >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control
                            as={"textarea"}
                            rows={5}
                            placeholder="Ingrese detalladamente la solucion del soporte"
                            name="solucion"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.solucion}
                            className={
                              touched.solucion && errors.solucion
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="solucion"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 d-flex justify-content-between"
                          controlId="formBasicCheckbox"
                        ></Form.Group>
                        <div className="d-flex justify-content-center">
                          <ButtonStyledFactura
                            variant="primary"
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {!isSubmitting ? (
                              "CERRAR SOPORTE"
                            ) : (
                              <Spinner
                                as="span"
                                animation="grow"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                          </ButtonStyledFactura>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
