import { useLocation, useNavigate } from "react-router-dom";
import { SoportesTable } from "./SoportesTable";
import { SoportesTableHistory } from "./SoportesTableHistory";

export const SoportesHistory = () => {
  const location = useLocation();
  const cliente = location.state?.cliente;
  return (
    <div className="pt-5">
      <h1>Historial</h1>
      {cliente.soportesTecnicos.length > 0 ? (
        <SoportesTableHistory cliente={cliente} />
      ) : (
        <p>Este cliente no tiene historial de soportes </p>
      )}
    </div>
  );
};
