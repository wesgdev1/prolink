import { useNavigate } from "react-router-dom";
import { Alert, Form, Spinner } from "react-bootstrap";

import { ButtonProfile } from "./StyledComponentsProfile";
import { useClientes } from "../../domain/clientes/useClientes";
import { ClientesTable } from "./ClientesTable";
import { useEffect, useState } from "react";
import { set } from "date-fns";

export const Clientes = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useClientes();
  const handleClick = () => {
    navigate("/profile/clientes/add");
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [notificacion, setNotificacion] = useState(false);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data.filter((cliente) => {
        return (
          cliente.nombreCompleto
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          cliente.numeroContrato
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          cliente.numeroDocumento
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  return (
    <div className="pt-5">
      <div className="d-flex justify-content-end">
        <ButtonProfile onClick={handleClick}>Agregar Cliente</ButtonProfile>
      </div>
      <div>
        <Form.Control
          type="search"
          placeholder="Buscar por Nombre / contrato / identificacion"
          className="me-2 w-50"
          aria-label="Search"
          onChange={handleInputChange}
          onKeyDown={onSearch}
          value={searchValue}
        />
      </div>
      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

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
            Mostrar todo
          </ButtonProfile>
          <ClientesTable clientes={filteredData} />
        </>
      ) : (
        <ClientesTable clientes={data} />
      )}
    </div>
  );
};
