import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { hacerPing } from "../../api/blogs";
import { useEffect } from "react";
import { useState } from "react";
import "ldrs/ping";

export const RealTime = () => {
  const [ping, setPing] = useState("");

  useEffect(() => {
    const hacerPingAsincrono = async () => {
      const resultado = await hacerPing();
      console.log(resultado.data);
      setPing(resultado.data.time);
    };

    const intervalId = setInterval(hacerPingAsincrono, 5000); // 5000 ms = 5 s

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <h1>hola</h1>
      <span>192,168,1,1</span>

      <h1>{ping}result</h1>

      <l-ping size="50" speed="1" color="red"></l-ping>
    </div>
  );
};
