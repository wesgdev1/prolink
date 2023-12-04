import React from "react";
import { Button, Card } from "react-bootstrap";
import {
  AutorStyled,
  ButtonLeerStyled,
  CardCategory,
  CardDescroptionStyle,
  CardImgStyled,
  CardStyled,
} from "./StyledComponentsBlog";
import { format, formatDistanceToNow } from "date-fns";

export const BlogCard = ({ blog, viewDetail }) => {
  return (
    <CardStyled className="mb-3">
      <CardImgStyled variant="top" src={blog.fotos[0]?.url_foto} />
      <Card.Body>
        <CardCategory>Networking</CardCategory>
        <Card.Title>{blog.title}</Card.Title>
        <CardDescroptionStyle>
          {/* Dividir el contenido en párrafos y envolver cada párrafo en un elemento <p> */}
          {blog.content.split("\n").map((paragraph, index) => (
            <Card.Text key={index}>{paragraph}</Card.Text>
          ))}
        </CardDescroptionStyle>
        {/* <ButtonLeerStyled onClick={() => viewDetail(blog.id)}>
          Leer mas...
        </ButtonLeerStyled> */}

        <div className="d-flex pt-2 justify-content-start gap-2 ">
          <img
            src={blog.tecnico?.usuario?.urlFoto}
            style={{
              width: "21%",

              borderRadius: "50%",
              border: "1px solid black",
            }}
          ></img>
          <AutorStyled className="d-flex flex-column justify-content-end">
            <p>{blog.tecnico?.nombreCompleto}</p>
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
