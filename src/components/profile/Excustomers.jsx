import { useNavigate } from "react-router-dom";

import { ButtonProfile } from "./StyledComponentsProfile";
import { Alert, Form, Spinner } from "react-bootstrap";
import { InstalationsTableVisor } from "./InstalationsTableVisor";
import { useState } from "react";
import { useRetiros } from "../../domain/useRetiros";
import { ExcustomerTableVisor } from "./ExcustomerTableVisor";

export const Excustomers = () => {
  const { data, loading, error, cargarRetiros } = useRetiros();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/retiros/add");
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filtroSelected, setFiltroSelected] = useState("1");

  const [notificacion, setNotificacion] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      console.log("entre aqui");
      e.preventDefault();

      const filter = data.filter((instalacion) => {
        return instalacion.nameClient
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
        return soporte.status === false;
      });
      setFilteredData(filter);
      setFiltroSelected("1");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "2") {
      const filter = data.filter((soporte) => {
        return soporte.status === true;
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
        <i className="bi bi-book-half"></i> Retiros programados
      </h4>
      <div className="d-flex justify-content-end">
        <ButtonProfile onClick={handleClick}>Agendar retiro</ButtonProfile>
      </div>
      <div className="d-flex justify-content-between pt-5 pb-3">
        <div style={{ width: "30%" }}>
          <Form.Control
            type="search"
            size="sm"
            placeholder="Buscar por nombre"
            aria-label="Search"
            onChange={handleInputChange}
            onKeyDown={onSearch}
            value={searchValue}
          />
        </div>
        <div className="d-flex gap-2">
          <select
            className="form-select text-sm"
            aria-label="Default select example"
            value={filtroSelected}
            onChange={handleFiltro}
          >
            {/* <option selected>Todo</option> */}
            <option value="1">Pendientes</option>
            <option value="2">Completados</option>
          </select>
        </div>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {notificacion ? (
        <div className="pt-3">
          <p>No se encontraron resultados</p>
          <ButtonProfile onClick={() => setNotificacion(false)}>
            Eliminar busqueda
          </ButtonProfile>
        </div>
      ) : filteredData.length > 0 ? (
        <>
          <p className="pt-2">
            Se encontraron: ({filteredData.length}) coincidencias
          </p>
          <ButtonProfile
            onClick={() => {
              setFilteredData([]), setFiltroSelected("1");
            }}
          >
            Quitar filtro
          </ButtonProfile>
          <ExcustomerTableVisor
            instalaciones={filteredData}
            cargarRetiros={cargarRetiros}
          />
        </>
      ) : (
        data?.length > 0 && (
          <ExcustomerTableVisor
            instalaciones={data.filter((excustomer) => {
              return excustomer.status === false;
            })}
            cargarRetiros={cargarRetiros}
          />
        )
      )}
    </div>
  );
};
