import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { hacerPing } from "../../api/blogs";
import { useEffect } from "react";
import { useState } from "react";
import "ldrs/ping";

export const Pings = ({ ip }) => {
  const [ping, setPing] = useState("");

  useEffect(() => {
    const hacerPingAsincrono = async () => {
      const resultado = await hacerPing();
      console.log(resultado.data);
      setPing(resultado.data.time);
    };

    const intervalId = setInterval(hacerPingAsincrono, 1000); // 5000 ms = 5 s

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      {/* <h1>hola</h1>
      <span>192,168,1,1</span>

      <h1>Respuestas desde 8.8.8.8 tiempo={ping}ms TTL=117</h1>

      <l-ping size="50" speed="1" color="green"></l-ping> */}
      <Card
        style={{
          width: "20rem",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Card.Body>
          <div className="d-flex gap-4">
            <Card.Title style={{ fontSize: "3rem" }}>
              <i className="bi bi-hdd-rack-fill"></i>
            </Card.Title>

            <div>
              <Card.Title>Servidor</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{ip}</Card.Subtitle>
              <Card.Text style={{ fontSize: "25px" }}>{ping} ms</Card.Text>
            </div>
            <l-ping size="50" speed="1" color="green"></l-ping>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
