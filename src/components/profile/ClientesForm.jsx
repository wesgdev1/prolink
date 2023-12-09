import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { ButtonStyled } from "../StyledComponents";
import { updateBlog } from "../../api/blogs";
import { formatError } from "./utils";
import { createCliente, updateCliente } from "../../api/Clientes";
import Swal from "sweetalert2";

const nombreCompletoRqd = z.string({
  required_error: "El nombre es requerido",
});

const emailRqd = z.string({
  required_error: "El email es requerido",
});

const numeroContratoRqd = z.string({
  required_error: "El numero de contrato es requerido",
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

const servicioRqd = z.string({
  required_error: "El servicio es requerido",
});

const ipNavegacionRqd = z.string({
  required_error: "La ip de navegacion es requerida",
});

const tiposDocumento = [
  "Cedula de ciudadania",
  "Cedula de extranjeria",
  "Pasaporte",
  "NIT",
];

const servicios = [
  "Internet Fibra optica 100MB",
  "Internet Fibra optica 200MB",
  "Internet Fibra optica 300MB",
  "Internet Fibra optica 400MB",
  "Internet Fibra optica 500MB",
];

const tecnicoSchema = z.object({
  nombreCompleto: nombreCompletoRqd,
  email: emailRqd,
  tipoDocumento: tipoDocumentoRqd,
  numeroDocumento: numeroDocumentoRqd,
  telefono: telefonoRqd,
  direccion: direccionRqd,
  numeroContrato: numeroContratoRqd,
  servicio: servicioRqd,
  ipNavegacion: ipNavegacionRqd,
});

export const ClientesForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.cliente;

  const onCreateCliente = async (formData) => {
    const response = await createCliente(formData);
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
    navigate("/profile/clientes", { replace: true });
  };
  const initialValues = {
    nombreCompleto: "" || actionEdit?.nombreCompleto,
    email: "" || actionEdit?.email,
    tipoDocumento: "" || actionEdit?.tipoDocumento,
    numeroDocumento: "" || actionEdit?.numeroDocumento,
    telefono: "" || actionEdit?.telefono,
    direccion: "" || actionEdit?.direccion,
    numeroContrato: "" || actionEdit?.numeroContrato,
    servicio: "" || actionEdit?.servicio,
    ipNavegacion: "" || actionEdit?.ipNavegacion,
  };

  const onUpdateCliente = async (formData) => {
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
        const response = await updateCliente(actionEdit.id, formData);

        if (response) {
          Swal.fire(
            "Actualizado!",
            "Los datos del tecnico han sido actualizados.",
            "success"
          );
          navigate("/profile/clientes", { replace: true });
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
        await onUpdateCliente(values);
      } else {
        await onCreateCliente(values);
        setSubmitting(false);
      }
    } catch (error) {
      const message = formatError(error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Cliente no Creado",
        text: "El correo o el numero de documento ya se encuentra registrado, verifica los datos",
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
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <h3 className="pt-5 pb-3">
                  {actionEdit
                    ? "Actualizar datos de usuario"
                    : " Registro de nuevo Cliente"}
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
              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Contrato</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escibe aqui el numero de contrato"
                  name="numeroContrato"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.numeroContrato}
                  className={
                    touched.numeroContrato && errors.numeroContrato
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="numeroContrato"
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
                  placeholder="Escribe el Telefono del cliente"
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
                  placeholder="Escribe la direccion del cliente"
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
              <Form.Group className=" " controlId="formBasicProdRef">
                <Form.Label>Servicio de Internet</Form.Label>

                <Form.Select
                  name="servicio"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.servicio}
                >
                  <option value="0">Seleccione el plan</option>
                  {servicios.map((service) => {
                    return (
                      <option key={service} value={service}>
                        {service}
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
              <Form.Group className="" controlId="formBasicDireccion">
                <Form.Label>Ip navegacion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Escribe la Ip de navegacion del cliente"
                  name="ipNavegacion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ipNavegacion}
                  className={
                    touched.ipNavegacion && errors.ipNavegacion
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="ipNavegacion"
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
                >
                  {!isSubmitting ? (
                    actionEdit ? (
                      "Actualizar"
                    ) : (
                      "Crear Cliente"
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
