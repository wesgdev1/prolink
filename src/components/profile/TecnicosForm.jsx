import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { ButtonStyled } from "../StyledComponents";

import { formatError } from "./utils";
import { createTecnico, updateTecnico } from "../../api/tecnicos";
import Swal from "sweetalert2";

const nombreCompletoRqd = z.string({
  required_error: "El nombre es requerido",
});

const emailRqd = z.string({
  required_error: "El email es requerido",
});

const tipoDocumentoRqd = z.string({
  required_error: "El tipo de documento es requerido",
});

const numeroDocumentoRqd = z.string({
  required_error: "El numero de documento es requerido",
});

const telefonoRqd = z.string({
  required_error: "El telefono es requerido",
});

const direccionRqd = z.string({
  required_error: "La direccion es requerida",
});

const tiposDocumento = [
  "Cedula de ciudadania",
  "Cedula de extranjeria",
  "Pasaporte",
];

const tecnicoSchema = z.object({
  nombreCompleto: nombreCompletoRqd,
  email: emailRqd,
  tipoDocumento: tipoDocumentoRqd,
  numeroDocumento: numeroDocumentoRqd,
  telefono: telefonoRqd,
  direccion: direccionRqd,
});

export const TecnicosForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.tecnico;

  const onCreateTecnico = async (formData) => {
    const response = await createTecnico(formData);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Cliente Creado",
        text: "El Cliente se creo correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Cliente no Creado",
        text: "El Cliente no se creo correctamente, intenta nuevamente",
      });
    }
    navigate("/profile/tecnicos", { replace: true });
  };
  const initialValues = {
    nombreCompleto: "" || actionEdit?.nombreCompleto,
    email: "" || actionEdit?.email,
    tipoDocumento: "" || actionEdit?.tipoDocumento,
    numeroDocumento: "" || actionEdit?.numeroDocumento,
    telefono: "" || actionEdit?.telefono,
    direccion: "" || actionEdit?.direccion,
  };

  const onUpdateTecnico = async (formData) => {
    Swal.fire({
      title: "Esta seguro de actualizar los datos del tecnico?",
      text: "¡Los cambios seran inmediatos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Actualizar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateTecnico(actionEdit.id, formData);

        if (response) {
          Swal.fire(
            "Actualizado!",
            "Los datos del tecnico han sido actualizados.",
            "success"
          );
          navigate("/profile/tecnicos", { replace: true });
        } else
          Swal.fire(
            "Error!",
            "Hubo un error al actualizar los datos del tecnico.",
            "error"
          );
      }
    });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      if (actionEdit) {
        await onUpdateTecnico(values);
      } else {
        await onCreateTecnico(values);
        setSubmitting(false);
      }
    } catch (error) {
      const message = formatError(error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "El Tecnico no fue Creado",
        text: "El tecnico ya se encuentra registrado, verifique los datos",
      });
    }
  };

  return (
    <div className="d-flex border flex-row justify-content-center pb-5 ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(tecnicoSchema)}
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
              className="d-flex flex-column gap-4 "
              onSubmit={handleSubmit}
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
            >
              {error && (
                <Alert
                  variant="danger"
                  style={{ width: "75%", margin: "auto", marginTop: "10px" }}
                >
                  Hubo un error, intentalo nuevamente
                </Alert>
              )}
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <h3 className="pt-5 pb-3">
                  {actionEdit ? "Actualizar datos" : "Nuevo tecnico"}
                </h3>
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui el nombre del tecnico"
                  name="nombreCompleto"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nombreCompleto}
                  className={
                    touched.nombreCompleto && errors.nombreCompleto
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="nombreCompleto"
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
                  className={touched.email && errors.email ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicProdRef">
                <Form.Label>Tipo de documento</Form.Label>

                <Form.Select
                  name="tipoDocumento"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tipoDocumento}
                >
                  <option value="0">Selecciona el tipo</option>
                  {tiposDocumento.map((doc) => {
                    return (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    );
                  })}
                </Form.Select>
                <ErrorMessage
                  name="tipoDocumento"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicDocumento">
                <Form.Label>Numero Documento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe el numero de documento"
                  name="numeroDocumento"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.numeroDocumento}
                  className={
                    touched.numeroDocumento && errors.numeroDocumento
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="numeroDocumento"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe el Telefono del tecnico"
                  name="telefono"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.telefono}
                  className={
                    touched.telefono && errors.telefono ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className="" controlId="formBasicDireccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe la direccion del tecnico"
                  name="direccion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.direccion}
                  className={
                    touched.direccion && errors.direccion ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="direccion"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              {/* {actionEdit?.id && (
                <div className="d-flex gap-5">
                  {" "}
                  <Form.Label column sm="3">
                    Imagen
                  </Form.Label>
                  <img
                    width={200}
                    src={actionEdit?.fotos[0]?.url_foto}
                    alt="Imagen del Blog"
                  />{" "}
                </div>
              )} */}

              <div className="d-flex justify-content-center">
                <ButtonStyled
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    actionEdit ? (
                      "Actualizar"
                    ) : (
                      "Crear Tecnico"
                    )
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
    </div>
  );
};
