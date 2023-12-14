import { useLocation } from "react-router-dom";

import { SoportesTableHistory } from "./SoportesTableHistory";
import { useState } from "react";

export const SoportesHistory = () => {
  const location = useLocation();
  const cliente = location.state?.cliente;
  const tecnico = location.state?.tecnico;

  return (
    <div className="pt-5">
      <h1>Historial</h1>
      {cliente?.soportesTecnicos?.length > 0 ||
      tecnico?.soportesTecnicos?.length > 0 ? (
        <SoportesTableHistory cliente={cliente ? cliente : tecnico} />
      ) : (
        <p>No hay historial de soportes </p>
      )}
    </div>
  );
};
