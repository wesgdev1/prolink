import { Link, useParams } from "react-router-dom";
import { ContainerBlogDetail } from "../components/blog/StyledComponentsBlog";
import { useBlog } from "../domain/useBlog";
import { ImgStyled } from "../components/StyledComponents";
import { Col, Image, Row, Spinner } from "react-bootstrap";
import { formatDistanceToNow } from "date-fns";

export const BlogDeatil = () => {
  const { id } = useParams();
  const { data, loading, error } = useBlog({ id });
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
        {error && <h1>Error...</h1>}
        {data && (
          <div className="d-flex flex-column gap-5 align-items-center">
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
                {/* <h4>Datos del Blog</h4>
                <div>7 estrellas</div>
                <div>50 comentaios</div> */}
              </Col>
            </Row>
            <hr />
            <h5>Compartir en: </h5>
            <div className="d-flex gap-5 pb-5 fs-2">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>
        )}
      </div>
    </ContainerBlogDetail>
  );
};
