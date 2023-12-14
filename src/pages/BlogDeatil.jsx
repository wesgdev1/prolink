import { Link, useNavigate, useParams } from "react-router-dom";
import { ContainerBlogDetail } from "../components/blog/StyledComponentsBlog";
import { useBlog } from "../domain/useBlog";
import { ButtonStyled, ImgStyled } from "../components/StyledComponents";
import { Col, Form, Image, Row, Spinner } from "react-bootstrap";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ErrorMessage, Formik } from "formik";
import Swal from "sweetalert2";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { createComentario } from "../api/blogs";

const comentarioSchema = z.object({
  content: z
    .string({
      required_error: "El mensaje es requerido",
    })
    .min(6, "El comentario debe tener mínimo 6 caracteres"),
});

export const BlogDeatil = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const initialValues = {
    content: "",
  };

  const { id } = useParams();
  const { data, loading, error: errorBlog, cargarBlogs } = useBlog({ id });

  const crearComentario = async (blogId, values) => {
    try {
      const response = await createComentario(blogId, values);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Comentario creado",
          text: "Se ha creado el comentario correctamente",
        });
        cargarBlogs(id);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal!",
      });
    }
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (user) {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      await crearComentario(id, values);
      resetForm();
    } else {
      navigate("/login");
    }
  };
  return (
    <ContainerBlogDetail>
      <div className="d-flex justify-content-start pb-5">
        <Link to="/blogs">
          <i className="bi bi-arrow-left"> </i>
          Volver a la lista de blogs
        </Link>
      </div>
      <div>
        {loading && <Spinner animation="border" variant="info" />}
        {errorBlog && <h1>Error...</h1>}
        {data && (
          <>
            <div className="d-flex flex-column gap-4 align-items-center">
              <ImgStyled
                src={
                  data.fotos[0]?.url_foto ||
                  "https://res.cloudinary.com/dppqkypts/image/upload/v1701397265/c4e577e4-e3c2-4676-a337-8ffb09c5f762_soq3lj.jpg"
                }
                alt=""
              />

              <h1>{data.title}</h1>
              <Row>
                <Col md={9} className="px-5 border-end">
                  {data.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </Col>
                <Col className="d-flex flex-column gap-2 " md={3}>
                  <Image
                    width={100}
                    height={100}
                    src={data.tecnico.usuario.urlFoto}
                    roundedCircle
                  ></Image>
                  <h4>Autor</h4>
                  <div>{data.tecnico?.nombreCompleto}</div>
                  <div>
                    Publicacion:
                    {formatDistanceToNow(new Date(data.createdAt), {
                      addSuffix: true,
                    })}
                  </div>
                </Col>
              </Row>

              <div className="d-flex justify-content-start w-100">
                <h4>{data.comentarios.length} Comentario(s)</h4>
              </div>
              <div className="w-100 d-flex gap-2">
                <Image
                  width={100}
                  height={100}
                  src={
                    user?.urlFoto ||
                    "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                  }
                  roundedCircle
                />
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={toFormikValidationSchema(comentarioSchema)}
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
                        className="d-flex flex-column  "
                        onSubmit={handleSubmit}
                        style={{
                          width: "100%",
                          margin: "auto",
                          marginTop: "10px",
                        }}
                      >
                        <Form.Group className="" controlId="formBasicEmail">
                          <Form.Control
                            as={"textarea"}
                            rows={3}
                            placeholder="Escibe aqui tu comentario"
                            name="content"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.content}
                            className={
                              touched.content && errors.content
                                ? "is-invalid"
                                : ""
                            }
                          />
                          <ErrorMessage
                            name="content"
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
                            className="mt-3"
                          >
                            {!isSubmitting ? (
                              "Enviar"
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
                <hr />
              </div>
            </div>
            <hr />
            <div>
              {data.comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="d-flex justify-content-start  gap-4 pt-3"
                >
                  <Image
                    width={40}
                    height={40}
                    src={
                      comentario.usuario.urlFoto ||
                      "https://res.cloudinary.com/dppqkypts/image/upload/v1701901417/Dise%C3%B1o_sin_t%C3%ADtulo_11_r8jfvs.png"
                    }
                    roundedCircle
                  />
                  <div className="d-flex flex-column w-100 ">
                    <strong>{comentario.usuario.email}</strong>
                    <p className="text-muted">
                      {format(parseISO(comentario.createdAt), "dd/MM/yyyy")}
                    </p>
                    <p>{comentario.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 d-flex flex-column justify-content-center align-items-center gap-2">
              <h5>Compartir en: </h5>
              <div className="d-flex gap-5 pb-5 fs-2">
                <i className="bi bi-facebook"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-linkedin"></i>
              </div>
            </div>
          </>
        )}
      </div>
    </ContainerBlogDetail>
  );
};
