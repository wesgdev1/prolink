import {
  ButtonStyled,
  CardStyledContacto,
  ContainerContacto,
} from "../components/StyledComponents";
import { Col, Form, Row, Spinner } from "react-bootstrap";

import Swal from "sweetalert2";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { useState } from "react";
import { createConsulta } from "../api/consultas";
import { ButtonWhatsapp } from "../components/ButtonWhatsapp";

const nombreRqd = z.string({
  required_error: "El nombre es requerido",
});
const emailRqd = z.string({
  required_error: "El email es requerido",
});

const telefonoRqd = z.number({
  required_error: "El telefono es requerido",
});

const mensajeRqd = z.string({
  required_error: "El mensaje es requerido",
});

const consultaSchema = z.object({
  nombre: nombreRqd.min(3, "El nombre debe tener mínimo 6 caracteres"),
  email: emailRqd.email("El email no es valido"),
  telefono: telefonoRqd.min(6, "El telefono debe tener mínimo 6 caracteres"),
  mensaje: mensajeRqd.min(6, "El mensaje debe tener mínimo 6 caracteres"),
});

export const Contacto = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  };

  const onCreateQuery = async (values) => {
    try {
      const response = await createConsulta(values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Consulta creada",
          text: "Se ha creado la consulta correctamente, pronto nos pondremos en contacto contigo",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo crear la consulta, intentalo de nuevo",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setError(false);
    setErrorMessage("");
    await onCreateQuery(values);
    resetForm();
  };
  return (
    <ContainerContacto>
      <Row>
        <Col xs={12}>
          <section>
            <div
              className="position-relative"
              style={{ height: "100vh", backgroundColor: "#e2e8f0" }}
            >
              <iframe
                title="map"
                width="100%"
                height="100%"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3952.0722442346355!2d-72.49631502518135!3d7.887510705811896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNTMnMTUuMCJOIDcywrAyOSczNy41Ilc!5e0!3m2!1ses-419!2sco!4v1701287138887!5m2!1ses-419!2sco"
                style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
              ></iframe>
            </div>
            {/* quiero que este container superponga mi anterior div pero en la mitad del elemento*/}

            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "50%",
                transform: "translate(50%, -50%)",
              }}
            >
              <CardStyledContacto>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={toFormikValidationSchema(consultaSchema)}
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
                        className="d-flex flex-column  "
                        onSubmit={handleSubmit}
                        style={{
                          width: "100%",
                          margin: "auto",
                          marginTop: "10px",
                        }}
                      >
                        <h5 className="pb-5">
                          Escribe aquí tus dudas o consultas sobre nuestros
                          servicios.
                        </h5>
                        <Form.Group
                          className=""
                          controlId="formBasicNombreCompleto"
                        >
                          <Form.Label>Nombre Completo</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Escibe aqui el nombre del tecnico"
                            name="nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nombre}
                            className={
                              touched.nombre && errors.nombre
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="nombre"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Escibe aqui el email del tecnico"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className={
                              touched.email && errors.email ? "is-invalid" : ""
                            }
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label>Teléfono</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Escibe aqui el numero de contrato"
                            name="telefono"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.telefono}
                            className={
                              touched.telefono && errors.telefono
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="telefono"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>

                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Label>Mensaje</Form.Label>
                          <Form.Control
                            as={"textarea"}
                            rows={3}
                            placeholder="Escibe aqui tu consulta"
                            name="mensaje"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mensaje}
                            className={
                              touched.mensaje && errors.mensaje
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="mensaje"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                          <ButtonStyled
                            variant="primary"
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="mt-3"
                          >
                            {!isSubmitting ? (
                              "Enviar"
                            ) : (
                              <Spinner
                                as="span"
                                animation="grow"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                          </ButtonStyled>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </CardStyledContacto>
            </div>
          </section>
        </Col>
      </Row>
      <ButtonWhatsapp />
    </ContainerContacto>
  );
};
