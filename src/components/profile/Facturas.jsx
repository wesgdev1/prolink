import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useFacturas } from "../../domain/useFacturas";
import { SoportesTable } from "./SoportesTable";
import { FacturasTable } from "./FacturasTable";

export const Facturas = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useFacturas({ user });

  return (
    <div className="pt-5">
      <h4>
        <i className="bi bi-receipt-cutoff"></i>Mis facturas
      </h4>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data?.length > 0 ? (
        <FacturasTable facturas={data} />
      ) : (
        <p>No Tienes facturas generadas</p>
      )}
    </div>
  );
};
