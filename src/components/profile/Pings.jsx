import { Card } from "react-bootstrap";

import { useEffect } from "react";

import "ldrs/ping";
import { hacerPing } from "../../api/pings";
import { useDispatch, useSelector } from "react-redux";
import { removeIp, setPingResult } from "../../store/pingReducers";
import { ButtonPing } from "./StyledComponentsProfile";

export const Pings = ({ ip }) => {
  const dispatch = useDispatch();
  const pingResult = useSelector(
    (state) => state.pings.ips.find((item) => item.ip === ip)?.result
  );

  const getPingResult = async () => {
    const resultado = await hacerPing({ ip });

    dispatch(setPingResult({ ip, result: resultado.data.time }));
  };

  const deleteIp = () => {
    dispatch(removeIp({ ip }));
  };

  useEffect(() => {
    getPingResult();

    const intervalId = setInterval(getPingResult, 1000);
    console.log("Intervalo ejecutado");

    return () => {
      clearInterval(intervalId);
      console.log("Intervalo limpiado");
    };
  }, [ip, dispatch]);

  return (
    <div>
      <Card
        style={{
          width: "17rem",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Card.Body>
          <div className="d-flex gap-3">
            <Card.Title style={{ fontSize: "1.5rem" }}>
              <i className="bi bi-hdd-rack-fill"></i>
            </Card.Title>
            <div>
              <Card.Title>Host</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{ip}</Card.Subtitle>
              <Card.Text style={{ fontSize: "0.7rem" }}>
                {pingResult > 0 ? "Online" : "Disconnected"}
              </Card.Text>
              <Card.Text style={{ fontSize: "0.8rem" }}>
                <strong>{pingResult > 0 ? pingResult + " ms" : "--"}</strong>
              </Card.Text>
            </div>
            {pingResult > 0 ? (
              pingResult < 99 ? (
                <l-ping size="50" speed="1" color="green"></l-ping>
              ) : (
                <l-ping size="50" speed="1" color="orange"></l-ping>
              )
            ) : (
              <l-ping size="50" speed="1" color="red"></l-ping>
            )}
            <div>
              <ButtonPing onClick={deleteIp}>
                <i className="bi bi-trash3-fill"></i>
              </ButtonPing>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
