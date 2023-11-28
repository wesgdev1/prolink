import Alert from "react-bootstrap/Alert";
import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { NavLink, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { Button } from "react-bootstrap";
import { ButtonStyled, MainConteiner } from "../components/StyledComponents";
import { AuthContext } from "../auth/context/AuthContext";
import { signIn, signUp } from "../api/auth";
import { setSession } from "../api/sessions";

const emailRqd = z.string({
  required_error: "El correo es requerido",
});

const numeroDocumentoRqd = z.string({
  required_error: "El numero de documento es requerido",
});

const passwordRqd = z.string({
  required_error: "La contraseña es requerida",
});
const confirmationPasswordRqd = z.string({
  required_error: "La confirmacion de contraseña es requerida",
});

const tipoUsuarioRqd = z.string({
  required_error: "El tipo de usuario es requerido",
});

const imageRqd = z.any().optional();

const singUpSchema = z
  .object({
    email: emailRqd.email("Dirección de correo incorrecto"),
    password: passwordRqd

      .min(6, "La contraseña debe tener mínimo 6 caracteres")
      .max(16, "La contraseña debe tener máximo 16 caracteres"),
    confirmationPassword: confirmationPasswordRqd,

    tipoUsuario: tipoUsuarioRqd,
    images: imageRqd,
    numeroDocumento: numeroDocumentoRqd,
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmationPassword"],
  });

const tiposUsuario = ["Tecnico", "Cliente"];

export function SignUp() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // const onLogin = async (formData) => {};
  const initialValues = {
    email: "",
    numeroDocumento: "",
    password: "",
    confirmationPassword: "",
    tipoUsuario: "",
    images: "",
  };

  // llamado al ApiAgent

  const onRegister = async (formData) => {
    try {
      const response = await signUp(formData);

      const { data, meta } = response;
      console.log("data", data);
      if (data) {
        console.log("se registro");
      }

      // login(data);
      // setSession(meta.token);

      navigate("/login", { replace: true });
    } catch (error) {
      console.log("errorsoski de creacion");
      setError(true);
    }
  };

  // manejador del submit

  const onSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("numeroDocumento", values.numeroDocumento);
    formData.append("password", values.password);
    formData.append("tipoUsuario", values.tipoUsuario);
    if (values.images && values.images.length > 0) {
      values.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    setSubmitting(true);
    await onRegister(formData);
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
              {error}
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
                  className="Form_login my-5 d-flex flex-column gap-2 "
                  onSubmit={handleSubmit}
                >
                  <div className="d-flex justify-content-center flex-column align-items-center gap-2">
                    <img
                      style={{ width: "10%", height: "auto" }}
                      src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1698873285/PROLINK_LOGO_pauqtg.png"
                      alt="logo"
                    ></img>

                    <h2>Creacion de Usario</h2>
                    <p>Diligenicie los siguiente campos</p>
                  </div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Ingrese un correo valido"
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

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero documento</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su documento"
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
                  <Form.Group className="mb-3" controlId="formBasicProdRef">
                    <Form.Label>Tipo de Usuario</Form.Label>

                    <Form.Select
                      name="tipoUsuario"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.tipoUsuario}
                    >
                      <option value="0">Selecciona el tipo</option>
                      {tiposUsuario.map((usuario) => {
                        return (
                          <option key={usuario} value={usuario}>
                            {usuario}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <ErrorMessage
                      name="tipoUsuario"
                      component="div"
                      className="invalid-feedback"
                    />
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
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirme su Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      name="confirmationPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmationPassword}
                      className={
                        touched.confirmationPassword &&
                        errors.confirmationPassword
                          ? "is-invalid"
                          : ""
                      }
                    />
                    <ErrorMessage
                      name="confirmationPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <Form.Group
                    className="align-items-center"
                    controlId="formProdFileIMG"
                  >
                    <Form.Label className="mb-3">Foto de Perfil</Form.Label>

                    <Form.Control
                      type="file"
                      multiple
                      size="sm"
                      name="images"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => {
                        const file = Array.from(e.currentTarget.files);
                        setFieldValue("images", file);
                      }}
                      className={
                        touched.images && errors.images ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="images"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center pt-5">
                    <ButtonStyled
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {!isSubmitting ? (
                        "Crear Usuario  "
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
