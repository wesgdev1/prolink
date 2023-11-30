import { useNavigate } from "react-router-dom";
import { Alert, Form, Spinner } from "react-bootstrap";

import { useSoportes } from "../../domain/soportes/useSoportes";
import { SoportesTable } from "./SoportesTable";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useState } from "react";
import { ButtonProfile } from "./StyledComponentsProfile";

export const Soportes = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useSoportes({ user });
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filtroSelected, setFiltroSelected] = useState("Todo");

  const [notificacion, setNotificacion] = useState(false);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data.filter((soporte) => {
        return soporte.numeroSoporte
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  const handleFiltro = (e) => {
    if (e.target.value === "1") {
      const filter = data.filter((soporte) => {
        return soporte.estado === false;
      });
      setFilteredData(filter);
      setFiltroSelected("1");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "2") {
      const filter = data.filter((soporte) => {
        return soporte.estado === true;
      });
      setFilteredData(filter);
      setFiltroSelected("2");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "Todo") {
      setFilteredData([]);
      setFiltroSelected("Todo");
    }
  };

  return (
    <div className="pt-5">
      <h4 className="pb-3">
        <i className="bi bi-wrench-adjustable"></i> Soportes tecnicos en sitio
      </h4>
      <div className="d-flex justify-content-between">
        <div style={{ width: "30%" }}>
          <Form.Control
            type="search"
            placeholder="Buscar por Numero de soporte"
            aria-label="Search"
            onChange={handleInputChange}
            onKeyDown={onSearch}
            value={searchValue}
          />
        </div>
        <div className="d-flex gap-2">
          <span>Ordenar:</span>
          <select
            className="form-select"
            aria-label="Default select example"
            value={filtroSelected}
            onChange={handleFiltro}
          >
            <option selected>Todo</option>
            <option value="1">Pendientes</option>
            <option value="2">Resueltas</option>
          </select>
        </div>
      </div>
      {loading && <Spinner animation="border" variant="info" />}
      {error && (
        <Alert variant="danger">Ocurrio un problema en el servidor</Alert>
      )}

      {notificacion ? (
        <div className="pt-3">
          <p>No se encontraron resultados</p>
          <ButtonProfile onClick={() => setNotificacion(false)}>
            Ver todo
          </ButtonProfile>
        </div>
      ) : filteredData.length > 0 ? (
        <>
          <p className="pt-2">
            Se encontraron: ({filteredData.length}) coincidencias
          </p>

          <ButtonProfile onClick={() => setFilteredData([])}>
            Mostra todo
          </ButtonProfile>
          <SoportesTable soportes={filteredData} />
        </>
      ) : (
        <SoportesTable soportes={data} />
      )}
    </div>
  );
};
