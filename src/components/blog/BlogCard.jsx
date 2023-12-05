import { Card, Image } from "react-bootstrap";
import {
  AutorStyled,
  CardCategory,
  CardDescroptionStyle,
  CardImgStyled,
  CardStyled,
} from "./StyledComponentsBlog";
import { formatDistanceToNow } from "date-fns";

export const BlogCard = ({ blog, viewDetail }) => {
  return (
    <CardStyled className="mb-3" onClick={() => viewDetail(blog.id)}>
      <CardImgStyled
        variant="top"
        src={
          blog.fotos[0]?.url_foto ||
          "https://res.cloudinary.com/dppqkypts/image/upload/v1701397265/c4e577e4-e3c2-4676-a337-8ffb09c5f762_soq3lj.jpg"
        }
      />
      <Card.Body>
        <CardCategory>Networking</CardCategory>
        <Card.Title>{blog.title}</Card.Title>
        <CardDescroptionStyle>
          {blog.content.split("\n").map((paragraph, index) => (
            <Card.Text key={index}>{paragraph}</Card.Text>
          ))}
        </CardDescroptionStyle>

        <hr />

        <div className="d-flex pt-2 justify-content-start gap-2 ">
          <Image
            width={50}
            height={50}
            src={blog.tecnico?.usuario?.urlFoto}
            roundedCircle
          ></Image>

          <AutorStyled className="d-flex flex-column justify-content-end">
            <strong>{blog.tecnico?.nombreCompleto}</strong>
            <p>
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </p>
          </AutorStyled>
        </div>
      </Card.Body>
    </CardStyled>
  );
};
