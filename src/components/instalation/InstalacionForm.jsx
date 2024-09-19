import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyled } from "../StyledComponents";
import { createBlog, updateBlog } from "../../api/blogs";
import { formatError } from "../profile/utils.js";
import { Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  createInstalation,
  updateInstalation,
} from "../../api/instalaciones.js";

const nameClientRqd = z.string({
  required_error: "El nombre es requerido",
});
const emailRqd = z.string().optional();
const phoneRqd = z.string({
  required_error: "El telefono es requerido",
});

const addressRqd = z.string({
  required_error: "La direccion es requerida",
});
const observationRqd = z.string().optional();

const ubicationRqd = z
  .string({
    required_error: "La ubicacion es requerida",
  })
  .optional();
const dateTimeRqd = z.string().optional();

const singUpSchema = z.object({
  nameClient: nameClientRqd,
  email: emailRqd,
  phone: phoneRqd,
  address: addressRqd,
  ubication: ubicationRqd,
  observation: observationRqd,
  dateTime: dateTimeRqd,
});

export const InstalacionForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.instalacion;

  const onCreateInstalation = async (formData) => {
    const response = await createInstalation(formData);
    const { data } = response;
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Instalacion agendada",
        text: "La instalacion se agendo correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Instalacion no agendada",
        text: "La instalacion no se agendo correctamente, intena nuevamente",
      });
    }
    navigate("/profile/instalations", { replace: true });
  };
  const initialValues = {
    nameClient: "" || actionEdit?.nameClient,
    email: "" || actionEdit?.email ? actionEdit?.email : "",
    phone: "" || actionEdit?.phone,
    address: "" || actionEdit?.address,
    ubication: "" || actionEdit?.ubication ? actionEdit?.ubication : "",
    observation: "" || actionEdit?.observation,
    dateTime: "" || actionEdit?.dateTime,
  };

  const onUpdateInstalacion = async (formData) => {
    const response = await updateInstalation(actionEdit.id, formData);
    const { data } = response;

    if (data) {
      Swal.fire({
        icon: "success",
        title: "Instalacion Actualizada",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Instalacion no actualizada",
        text: "La instalacion no se actualizo correctamente, intente nuevamente",
      });
    }
    navigate("/profile/instalations", { replace: true });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (actionEdit) {
        await onUpdateInstalacion(values);
      } else {
        await onCreateInstalation(values);
      }
    } catch (error) {
      const message = formatError(error);
      setError(message);
    }
  };

  return (
    <div className="d-flex  flex-row justify-content-center pb-5 ">
      {error && (
        <Alert
          variant="danger"
          style={{ width: "75%", margin: "auto", marginTop: "10px" }}
        >
          No se pudo crear la instalacion, intente nuevamente.
        </Alert>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(singUpSchema)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <>
            <Form
              className="d-flex flex-column gap-2 "
              onSubmit={handleSubmit}
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
            >
              <h5>Informacion de la instalacion</h5>
              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Nombre del cliente potencial *</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ingrese el nombre"
                  name="nameClient"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nameClient}
                  className={
                    touched.nameClient && errors.nameClient ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="nameClient"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ingrese el email"
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
                <Form.Label>Celular *</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ingrese el numero de telefono"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  className={touched.phone && errors.phone ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Direccion *</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ingrese la direccion"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  className={
                    touched.address && errors.address ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Ubicacion Gps</Form.Label>
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Ingrese la ubicacion gps"
                  name="ubication"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ubication}
                  className={
                    touched.ubication && errors.ubication ? "is-invalid" : ""
                  }
                />
                <ErrorMessage
                  name="ubication"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Fecha estimada instalacion *</Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="dateTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateTime}
                  className={
                    touched.dateTime && errors.dateTime ? "is-invalid" : null
                  }
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Obervaciones</Form.Label>
                <Form.Control
                  type="text"
                  as={"textarea"}
                  size="sm"
                  placeholder="Ingrese las observaciones como el tipo de instalacion, velocidad, etc"
                  name="observation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.observation}
                  className={
                    touched.observation && errors.observation
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="observation"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <ButtonStyled
                  variant="primary"
                  type="submit"
                  size="sm"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    actionEdit ? (
                      "Actualizar datos"
                    ) : (
                      "Agendar instalacion"
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
