import { useContext, useState } from "react";

import Form from "react-bootstrap/Form";

import { NavLink, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { MainConteiner } from "../components/StyledComponents";
import { AuthContext } from "../auth/context/AuthContext";
import { signIn } from "../api/auth";
import { setSession } from "../api/sessions";
import "./Login.css";

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

  const initialValues = {
    email: "",
    password: "",
  };

  const onLogin = async (formData) => {
    try {
      const response = await signIn(formData);

      const { data, meta } = response;

      login(data);
      setSession(meta.token);

      navigate("/profile", { replace: true });
    } catch (error) {
      console.log("errorsoski");
      setError(true);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    await onLogin(values);
    setSubmitting(false);
  };

  return (
    <MainConteiner className="login-wrapper">
      {/* Fondo minimalista */}
      <div className="login-bg">
        <div className="bg-gradient"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      {/* Contenedor del login */}
      <div className="login-container">
        <div className="login-card">
          {/* Header minimalista */}
          <div className="login-header">
            <div className="logo-wrapper">
              <img
                src="https://res.cloudinary.com/db9nfgjqr/image/upload/v1698873285/PROLINK_LOGO_pauqtg.png"
                alt="Prolink"
                className="logo"
              />
            </div>
            <h1 className="login-title">Bienvenido</h1>
            <p className="login-subtitle">Inicia sesión en tu cuenta</p>
          </div>

          {/* Error alert minimalista */}
          {error && (
            <div className="error-banner">
              <span className="error-icon">⚠</span>
              <span>Credenciales incorrectas</span>
            </div>
          )}

          {/* Formulario minimalista */}
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
              <Form onSubmit={handleSubmit} className="login-form">
                {/* Email Field */}
                <div className="field-group">
                  <div className="input-wrapper">
                    <Form.Control
                      type="email"
                      placeholder="Correo electrónico"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={`input-field ${
                        touched.email && errors.email ? "error" : ""
                      }`}
                    />
                    <div className="input-border"></div>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="field-error"
                  />
                </div>

                {/* Password Field */}
                <div className="field-group">
                  <div className="input-wrapper">
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className={`input-field ${
                        touched.password && errors.password ? "error" : ""
                      }`}
                    />
                    <div className="input-border"></div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="field-error"
                  />
                </div>

                {/* Options */}
                <div className="form-options">
                  <label className="checkbox-wrapper">
                    <Form.Check type="checkbox" className="checkbox-input" />
                    <span className="checkbox-text">Recordarme</span>
                  </label>

                  <NavLink to="/Recoverypassword" className="forgot-link">
                    ¿Olvidaste tu contraseña?
                  </NavLink>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? (
                    <div className="btn-spinner"></div>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </button>

                {/* Back Link */}
                <NavLink to="/home" className="back-link">
                  ← Volver al inicio
                </NavLink>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainConteiner>
  );
}
