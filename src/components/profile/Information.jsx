import React from "react";
import { Card } from "react-bootstrap";

export const Information = () => {
  return (
    <div className="d-flex flex-column align-items-center pt-3 ">
      <h2>Informacion diaria</h2>
      <p>fecha: Lunes 3 Agosto 2023</p>
      <div className="d-flex gap-5 pt-5">
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Header>Soportes Resueltos</Card.Header>
          <Card.Body>
            {/* <Card.Title>Warning Card Title</Card.Title> */}
            <Card.Text>10</Card.Text>
          </Card.Body>
        </Card>
        <Card border="danger" style={{ width: "18rem" }}>
          <Card.Header>Soportes pendientes</Card.Header>
          <Card.Body>
            {/* <Card.Title>Warning Card Title</Card.Title> */}
            <Card.Text>1</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex gap-5 pt-5">
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Header>Total Cliente</Card.Header>
          <Card.Body>
            {/* <Card.Title>Warning Card Title</Card.Title> */}
            <Card.Text>10</Card.Text>
          </Card.Body>
        </Card>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Header>Total Tecnicos</Card.Header>
          <Card.Body>
            {/* <Card.Title>Warning Card Title</Card.Title> */}
            <Card.Text>1</Card.Text>
          </Card.Body>
        </Card>
        <Card border="success" style={{ width: "18rem" }}>
          <Card.Header>Blogs publicados</Card.Header>
          <Card.Body>
            {/* <Card.Title>Warning Card Title</Card.Title> */}
            <Card.Text>1</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
