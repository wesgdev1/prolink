import Alert from "react-bootstrap/Alert";
import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { NavLink, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Button } from "react-bootstrap";
import {
  ButtonStyled,
  MainConteiner,
  NavLinkStyledRegister,
} from "../components/StyledComponents";
import { AuthContext } from "../auth/context/AuthContext";
import { signIn } from "../api/auth";
import { setSession } from "../api/sessions";

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

export function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const onLogin = async (formData) => {};
  const initialValues = {
    email: "",
    password: "",
  };

  // llamado al ApiAgent

  const onLogin = async (formData) => {
    const response = await signIn(formData);

    const { data, meta } = response;

    login(data);
    setSession(meta.token);

    navigate("/profile", { replace: true });
  };

  // manejador del submit

  const onSubmit = async (values, { setSubmitting }) => {
    // navigate("/profile");
    // console.log(values);
    // console.log(login);
    // login({ user: { ...values } });
    setSubmitting(true);
    await onLogin(values);
    setSubmitting(false);
  };
  return (
    <MainConteiner className="img-fluid pt-5">
      {/* <h1 className="">Iniciar sesion</h1> */}
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
                  className="Form_login my-5 d-flex flex-column gap-2 "
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex justify-content-center flex-column align-items-center gap-2">
                    <img
                      style={{ width: "10%", height: "auto" }}
                      src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1698873285/PROLINK_LOGO_pauqtg.png"
                      alt="logo"
                    ></img>

                    <h2>Iniciar sesion</h2>
                    <p>
                      Ingrese las credenciales para acceder a la aplicacion.
                    </p>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese su correo"
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
                    <Form.Text className="text-muted">
                      Nosotros nunca compartiremos su correo con nadie más.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={
                        touched.password && errors.password ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 d-flex justify-content-between"
                    controlId="formBasicCheckbox"
                  >
                    <Form.Check type="checkbox" label="Recuerdáme" />
                    <NavLink
                      to={"/Recoverypassword"}
                      style={{ textDecoration: "none", color: "darkblue" }}
                    >
                      ¿Olvidaste tu Constraseña?
                    </NavLink>
                  </Form.Group>
                  <div className="d-flex justify-content-center">
                    <ButtonStyled
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? (
                        "Iniciar Sesión"
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
                  <div className="d-flex gap-1 mt-2 justify-content-center">
                    <label>¿No tienes un usuario?</label>
                    <NavLink
                      style={{ textDecoration: "none", color: "darkblue" }}
                      to={"/profile"}
                    >
                      Registrate
                    </NavLink>
                  </div>
                  <div className="d-flex gap-1 mt-2 justify-content-center">
                    <NavLink
                      style={{ textDecoration: "none", color: "darkblue" }}
                      to={"/home"}
                    >
                      Volver al Inicio
                    </NavLink>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </MainConteiner>
  );
}
