import { Link, useParams } from "react-router-dom";
import { ContainerBlogDetail } from "../components/blog/StyledComponentsBlog";
import { useBlog } from "../domain/useBlog";
import { ImgStyled } from "../components/StyledComponents";
import { Col, Row } from "react-bootstrap";
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
        {loading && <h1>Cargando...</h1>}
        {error && <h1>Error...</h1>}
        {data && (
          <div className="d-flex flex-column gap-5 align-items-center">
            <ImgStyled src={data.fotos[0]?.url_foto} alt="" />

            <h1>{data.title}</h1>
            <Row>
              <Col md={9} className="px-5">
                {data.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </Col>
              <Col className="d-flex flex-column gap-2 " md={3}>
                <img
                  style={{ width: "50%" }}
                  src={data.tecnico.usuario.urlFoto}
                  alt="Autor"
                />
                <h4>Autor</h4>
                <div>{data.tecnico?.nombreCompleto}</div>
                <div>
                  {formatDistanceToNow(new Date(data.createdAt), {
                    addSuffix: true,
                  })}
                </div>
                <h4>Datos del Blog</h4>
                <div>7 estrellas</div>
                <div>50 comentaios</div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </ContainerBlogDetail>
  );
};
