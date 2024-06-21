import { useNavigate } from "react-router-dom";
import { useInstalations } from "../../domain/useInstalations";
import { ButtonProfile } from "./StyledComponentsProfile";
import { Alert, Form, Spinner } from "react-bootstrap";
import { InstalationsTableVisor } from "./InstalationsTableVisor";
import { useState } from "react";

export const Instalations = () => {
  const { data, loading, error } = useInstalations();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/instalations/add");
  };

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
        <i className="bi bi-book-half"></i> Instalaciones programadas
      </h4>
      <div className="d-flex justify-content-end">
        <ButtonProfile onClick={handleClick}>Agendar instalación</ButtonProfile>
      </div>
      <div className="d-flex justify-content-between pt-5 pb-3">
        <div style={{ width: "30%" }}>
          <Form.Control
            type="search"
            placeholder="Buscar por nombre"
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
            <option value="2">Instalados</option>
          </select>
        </div>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {data?.length > 0 ? (
        <InstalationsTableVisor instalaciones={data} />
      ) : (
        <p>No hay instalaciones</p>
      )}
    </div>
  );
};
