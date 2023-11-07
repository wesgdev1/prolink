import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { NavLink, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { MainConteiner } from "../../components/blog/StyledComponentsBlog";
import { ButtonStyled } from "../StyledComponents";

const emailRqd = z.string({
  required_error: "El correo es requerido",
});

const passwordRqd = z.string({
  required_error: "La contraseña es requerida",
});

const singUpSchema = z.object({
  email: emailRqd.email("Dirección de correo incorrecto"),
  password: passwordRqd

    .min(6, "La contraseña debe tener mínimo 6 caracteres")
    .max(16, "La contraseña debe tener máximo 16 caracteres"),
});

export const BlogsForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = async (formData) => {};
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setError(false);
    setErrorMessage("");
    await onLogin(values);
    setSubmitting(false);
  };

  return (
    <MainConteiner>
      <div className="login d-flex row w-50 bg-white">
        <div className="login__contenedor">
          {error && (
            <Alert
              variant="danger"
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
            >
              No se pudo iniciar sesión, por favor verifica tu conexión e
              intentalo nuevamente
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              navigate("/profile");
            }}
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
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Titulo del Blog</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el titulo"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      className={
                        touched.title && errors.title ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                    <Form.Text className="text-muted">
                      Elige un titulo Cool.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Ingrese su contraseña"
                      name="content"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.content}
                      className={
                        touched.content && errors.content ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-between"
                    controlId="formBasicCheckbox"
                  ></Form.Group>
                  <div className="d-flex justify-content-center">
                    <ButtonStyled
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? (
                        "CREAR BLOG"
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
      </div>
    </MainConteiner>
  );
};
