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
import { formatError } from "./utils";
import { Col, Row } from "react-bootstrap";

const titleRqd = z.string({
  required_error: "El Titulo es requerido",
});

const contentRqd = z.string({
  required_error: "Debes colocar el contenido del Blog",
});
const imageRqd = z.any().optional();

const singUpSchema = z.object({
  title: titleRqd.min(6, "El titulo debe tener mínimo 6 caracteres"),
  content: contentRqd.min(6, "El contenido debe tener mínimo 6 caracteres"),
  images: imageRqd,
});

export const BlogsForm = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const actionEdit = location.state?.blog;

  const onCreateBlog = async (formData) => {
    const response = await createBlog(formData);
    const { data } = response;
    navigate("/profile/blogs", { replace: true });
  };
  const initialValues = {
    title: "" || actionEdit?.title,
    content: "" || actionEdit?.content,
    images: "",
  };

  const onUpdateBlog = async (formData) => {
    await updateBlog(actionEdit.id, formData);
    navigate("/profile/blogs", { replace: true });
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.images && values.images.length > 0) {
        values.images.forEach((image) => {
          formData.append("images", image);
        });
      }
      if (actionEdit) {
        await onUpdateBlog(formData);
      } else {
        await onCreateBlog(formData);
      }
    } catch (error) {
      const message = formatError(error);
      setError(message);
    }
    // setSubmitting(true);
    // setError(false);
    // setErrorMessage("");

    // await onCreateBlog(values);
    // setSubmitting(false);
  };

  return (
    <div className="d-flex border flex-row justify-content-center pb-5 ">
      {error && (
        <Alert
          variant="danger"
          style={{ width: "75%", margin: "auto", marginTop: "10px" }}
        >
          No se pudo Crear el Blog, intenta nuevamente
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
              className="d-flex flex-column gap-4 "
              onSubmit={handleSubmit}
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
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
                  className={touched.title && errors.title ? "is-invalid" : ""}
                />
                <ErrorMessage
                  name="title"
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
                  placeholder="Escribe aqui el contenido de tu Blog"
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
                as={Row}
                className="align-items-center"
                controlId="formProdFileIMG"
              >
                <Form.Label column sm="3">
                  Imagen del Blog
                </Form.Label>
                <Col>
                  <Form.Control
                    type="file"
                    multiple
                    size="sm"
                    name="images"
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
                </Col>
              </Form.Group>
              <Form.Group
                className="mb-3 d-flex justify-content-between"
                controlId="formBasicCheckbox"
              ></Form.Group>

              {actionEdit?.id && (
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
              )}

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
                      "Crear Blog"
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

    // </MainConteinerBlogForm>
  );
};
