import { useNavigate } from "react-router-dom";
import { Alert, Form, Spinner } from "react-bootstrap";
import { TecnicosTable } from "./TecnicosTable";
import { useTecnicos } from "../../domain/tecnicos/useTecnicos";
import { ButtonProfile } from "./StyledComponentsProfile";
import { useState } from "react";

export const Tecnicos = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useTecnicos();
  const handleClick = () => {
    navigate("/profile/tecnicos/add");
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
        return cliente.nombreCompleto
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };
  return (
    <div className="pt-5">
      <div className="d-flex justify-content-end">
        <ButtonProfile onClick={handleClick}>Agregar tecnico</ButtonProfile>
      </div>
      <div>
        <Form.Control
          type="search"
          placeholder="Buscar por Nombre del tecnico"
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
          <TecnicosTable tecnicos={filteredData} />
        </>
      ) : (
        <TecnicosTable tecnicos={data} />
      )}
    </div>
  );
};
