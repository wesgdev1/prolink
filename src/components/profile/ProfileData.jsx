import { Form, Image, Spinner, Tab, Tabs } from "react-bootstrap";
import { ButtonStyled, ButtonStyledUpdate } from "../StyledComponents";
import { ErrorMessage, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import Swal from "sweetalert2";
import { formatError } from "./utils";
import { changePassword, updateProfile } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { StyledTabs } from "./StyledComponentsProfile";

const passwordRqd = z.string({
  required_error: "La contraseña actual es requerida",
});
const passwordNewRqd = z.string({
  required_error: "La contraseña nueva es requerida",
});
const passwordNewConfirmationRqd = z.string({
  required_error: "La confirmacion es requerida",
});
const imageRqd = z.any();
const newImageSchema = z.object({
  images: imageRqd,
});

const newPasswordSchema = z
  .object({
    password: passwordRqd,
    newPassword: passwordNewRqd
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),

    newPasswordConfirmation: passwordNewConfirmationRqd
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña debe tener menos de 20 caracteres"),
  })

  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Las contraseñas no coinciden",
    path: ["newPasswordConfirmation"],
  });

export const ProfileData = () => {
  const { user, cambiarImagen } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    newPassword: "",
    newPasswordConfirmation: "",
  };

  const initialValuesImage = {
    images: "",
  };

  const onChangePassword = async (values) => {
    try {
      const response = await changePassword(values);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Contraseña actualizada",
          text: "Se actualizo la contraseña correctamente,",
        });

        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "No se pudo actualizar la contraseña",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      onChangePassword(values);
    } catch (error) {
      const message = formatError(error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "No se pudo actualizar la contraseña",
      });
    }
  };

  const onUpdateImage = async (values) => {
    try {
      const response = await updateProfile(user?.id, values);
      if (response) {
        console.log(response.data);
        cambiarImagen(response.data.urlFoto);
        Swal.fire({
          icon: "success",
          title: "Imagen de perfil actualizada",
          text: "Se actualizo la imagen de perfil correctamente,",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "No se pudo actualizar la imagen de perfil",
      });
    }
  };

  const onSubmitImage = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    if (values.images && values.images.length > 0) {
      values.images.forEach((image) => {
        formData.append("images", image);
      });

      setSubmitting(true);
      await onUpdateImage(formData);
      setSubmitting(false);
      resetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "Debes seleccionar una imagen",
      });
    }
  };

  return (
    <div className="pt-5">
      <h4>
        <i className="bi bi-pencil-square"></i>Editar mi Perfil
      </h4>
      <hr />

      <div className="pt-5">
        <StyledTabs
          defaultActiveKey="ImagenPerfil"
          transition={true}
          id="fill-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="ImagenPerfil"
            title={<span style={{ color: "gray" }}>Imagen de Perfil</span>}
          >
            <div className="">
              <div className="pt-4 d-flex justify-content-center flex-column align-items-center">
                <Image
                  src={
                    user?.urlFoto ||
                    "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                  }
                  roundedCircle
                  width={150}
                  height={150}
                />

                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmitImage}
                  validationSchema={toFormikValidationSchema(newImageSchema)}
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
                        className=" my-5 d-flex flex-column gap-2 w-50 align-items-center"
                        onSubmit={handleSubmit}
                      >
                        <Form.Group
                          className="align-items-center"
                          controlId="formProdFileIMG"
                        >
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
                              touched.images && errors.images
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="images"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Form.Group>
                        {values.images?.map((image, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center pt-2"
                          >
                            <Image
                              src={URL.createObjectURL(image)}
                              alt={`Imagen ${index + 1}`}
                              width={100}
                              height={100}
                              style={{
                                marginRight: "10px",
                                borderRadius: "50px",
                                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                              }}
                            />
                            <div>Asi se vera tu imagen de perfil</div>
                          </div>
                        ))}
                        <div className="d-flex justify-content-center">
                          <ButtonStyledUpdate
                            variant="primary"
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {!isSubmitting ? (
                              "Guardar"
                            ) : (
                              <Spinner
                                as="span"
                                animation="grow"
                                role="status"
                                aria-hidden="true"
                              />
                            )}
                          </ButtonStyledUpdate>
                        </div>
                      </Form>
                    </>
                  )}
                </Formik>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="Seguridad"
            title={<span style={{ color: "gray" }}>Seguridad</span>}
          >
            <h5>Editar contraseña</h5>
            <div className="pt-4 d-flex justify-content-center">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={toFormikValidationSchema(newPasswordSchema)}
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
                      style={{
                        width: "75%",
                        margin: "auto",
                        marginTop: "10px",
                      }}
                    >
                      <Form.Group className="" controlId="formBasicPassword">
                        <Form.Label>Contraseña actual</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Ingrese su contraseña actual"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className={
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicPassword">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Ingrese su nueva contraseña"
                          name="newPassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPassword}
                          className={
                            touched.newPassword && errors.newPassword
                              ? "is-invalid"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>
                      <Form.Group className="" controlId="formBasicPassword">
                        <Form.Label>Confirme la nueva contraseña</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirme su nueva contraseña"
                          name="newPasswordConfirmation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.newPasswordConfirmation}
                          className={
                            touched.newPasswordConfirmation &&
                            errors.newPasswordConfirmation
                              ? "is-invalid"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name="newPasswordConfirmation"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-center">
                        <ButtonStyled
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {!isSubmitting ? (
                            "Actualizar Contraseña"
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
          </Tab>
        </StyledTabs>
      </div>
    </div>
  );
};
