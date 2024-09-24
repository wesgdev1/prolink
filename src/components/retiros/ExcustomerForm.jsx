import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyled } from "../StyledComponents";

import { formatError } from "../profile/utils.js";

import Swal from "sweetalert2";
import {
  createInstalation,
  updateInstalation,
} from "../../api/instalaciones.js";
import { createExcustomer, updateExcustomer } from "../../api/retiros.js";

const nameClientRqd = z.string({
  required_error: "El nombre es requerido",
});

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
  phone: phoneRqd,
  address: addressRqd,
  ubication: ubicationRqd,
  observation: observationRqd,
  dateTime: dateTimeRqd,
});

export const ExcustomerForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.instalacion;

  const onCreateExcustomer = async (formData) => {
    const response = await createExcustomer(formData);
    const { data } = response;
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Retiro agendado",
        text: "El retiro se agendo correctamente",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Retiro no agendado",
        text: "El retiro no se agendo correctamente, intente nuevamente",
      });
    }
    navigate("/profile/retiros", { replace: true });
  };
  const initialValues = {
    nameClient: "" || actionEdit?.nameClient,

    phone: "" || actionEdit?.phone,
    address: "" || actionEdit?.address,
    ubication: "" || actionEdit?.ubication ? actionEdit?.ubication : "",
    observation: "" || actionEdit?.observation,
    dateTime: "" || actionEdit?.dateTime,
  };

  const onUpdateExcustomer = async (formData) => {
    const response = await updateExcustomer(actionEdit.id, formData);
    const { data } = response;

    if (data) {
      Swal.fire({
        icon: "success",
        title: "Retiro actualizado",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Retiro no actualizado",
        text: " El retiro no se actualizo correctamente, intente nuevamente",
      });
    }
    navigate("/profile/retiros", { replace: true });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      if (actionEdit) {
        await onUpdateExcustomer(values);
      } else {
        await onCreateExcustomer(values);
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
          No se pudo agendar el retiro, intente nuevamente.
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
        }) => (
          <>
            <Form
              className="d-flex flex-column gap-2 "
              onSubmit={handleSubmit}
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
            >
              <h5>Informacion de el retiro</h5>
              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Nombre del cliente*</Form.Label>
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
                <Form.Label>Fecha retiro *</Form.Label>
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

              <div className="d-flex justify-content-center gap-4 pt-3">
                <ButtonStyled
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/profile/retiros")}
                >
                  Cancelar
                </ButtonStyled>
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
                      "Agendar Retiro"
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
