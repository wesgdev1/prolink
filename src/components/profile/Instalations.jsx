import { useNavigate } from "react-router-dom";
import { useInstalations } from "../../domain/useInstalations";
import { ButtonProfile } from "./StyledComponentsProfile";
import { Alert, Form, Spinner } from "react-bootstrap";
import { InstalationsTableVisor } from "./InstalationsTableVisor";
import { useState } from "react";
import "./Instalations.css";

export const Instalations = () => {
  const { data, loading, error, cargarInstalations } = useInstalations();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/instalations/add");
  };

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filtroSelected, setFiltroSelected] = useState("1");
  const [searchType, setSearchType] = useState("nombre");
  const [notificacion, setNotificacion] = useState(false);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data.filter((instalacion) => {
        switch (searchType) {
          case "nombre":
            return instalacion.nameClient
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          case "direccion":
            return instalacion.address
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          case "telefono":
            return instalacion.phone
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          case "email":
            return instalacion.email
              ?.toLowerCase()
              .includes(searchValue.toLowerCase());
          default:
            return instalacion.nameClient
              .toLowerCase()
              .includes(searchValue.toLowerCase());
        }
      });

      setFilteredData(filter);
      setNotificacion(filter.length === 0);
      setSearchValue("");
    }
  };

  const handleFiltro = (e) => {
    if (e.target.value === "1") {
      const filter = data.filter((soporte) => {
        return soporte.viability === true;
      });
      setFilteredData(filter);
      setFiltroSelected("1");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "2") {
      const filter = data.filter((soporte) => {
        return soporte.viability === false;
      });
      setFilteredData(filter);
      setFiltroSelected("2");
      setNotificacion(filter.length === 0);
    }
    if (e.target.value === "Todo") {
      setFilteredData([]);
      setFiltroSelected("Todo");
      setNotificacion(false);
    }
  };

  const clearSearch = () => {
    setFilteredData([]);
    setFiltroSelected("1");
    setNotificacion(false);
    setSearchValue("");
  };

  return (
    <div className="instalations-page">
      {/* Header Section */}
      <div className="instalations-header">
        <div className="header-content">
          <div className="header-left">
            <ButtonProfile onClick={handleClick} className="btn-primary-custom">
              Agendar
            </ButtonProfile>
          </div>
          <div className="header-right">
            <h2 className="page-title">
              <i className="bi bi-tools title-icon"></i>
              Instalaciones
            </h2>
            <p className="page-subtitle">
              Gestiona las instalaciones programadas
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="search-filters-section">
        <div className="search-container">
          <div className="search-input-group">
            <div className="search-type-selector">
              <select
                className="form-select search-type-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="nombre">Nombre</option>
                <option value="direccion">Dirección</option>
                <option value="telefono">Teléfono</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div className="search-input-wrapper">
              <i className="bi bi-search search-icon"></i>
              <Form.Control
                type="search"
                className="search-input"
                placeholder={`Buscar por ${searchType}...`}
                aria-label="Search"
                onChange={handleInputChange}
                onKeyDown={onSearch}
                value={searchValue}
              />
            </div>
          </div>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Estado:</label>
            <select
              className="form-select status-filter"
              value={filtroSelected}
              onChange={handleFiltro}
            >
              <option value="1">Pendientes</option>
              <option value="2">Completadas</option>
              <option value="Todo">Todas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {data?.length > 0 && (
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon pending">
                <i className="bi bi-clock"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {data.filter((i) => i.viability === true).length}
                </span>
                <span className="stat-label">Pendientes</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon completed">
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {data.filter((i) => i.viability === false).length}
                </span>
                <span className="stat-label">Completadas</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon total">
                <i className="bi bi-list-ul"></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{data.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading and Error States */}
      {loading && (
        <div className="loading-container">
          <Spinner animation="border" variant="primary" />
          <span className="loading-text">Cargando instalaciones...</span>
        </div>
      )}

      {error && (
        <div className="error-container">
          <Alert variant="danger" className="error-alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        </div>
      )}

      {/* Results Section */}
      <div className="results-section">
        {notificacion ? (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="bi bi-search"></i>
            </div>
            <h4>No se encontraron resultados</h4>
            <p>Intenta con otros términos de búsqueda o ajusta los filtros</p>
            <button className="btn-clear-search" onClick={clearSearch}>
              <i className="bi bi-arrow-clockwise me-1"></i>
              Limpiar
            </button>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="filtered-results">
            <div className="results-header">
              <div className="results-info">
                <i className="bi bi-funnel results-icon"></i>
                <span className="results-count">
                  {filteredData.length} resultado
                  {filteredData.length !== 1 ? "s" : ""} encontrado
                  {filteredData.length !== 1 ? "s" : ""}
                </span>
              </div>
              <button className="btn-clear-filter" onClick={clearSearch}>
                <i className="bi bi-x me-1"></i>
                Quitar
              </button>
            </div>
            <InstalationsTableVisor
              instalaciones={filteredData}
              cargarInstalations={cargarInstalations}
            />
          </div>
        ) : (
          data?.length > 0 && (
            <div className="default-results">
              <InstalationsTableVisor
                instalaciones={data.filter((instalacion) => {
                  return instalacion.viability === true;
                })}
                cargarInstalations={cargarInstalations}
              />
            </div>
          )
        )}

        {!loading && !error && (!data || data.length === 0) && (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="bi bi-calendar-x"></i>
            </div>
            <h4>No hay instalaciones programadas</h4>
            <p>Comienza agendando tu primera instalación</p>
            <ButtonProfile onClick={handleClick} className="btn-primary-custom">
              Agendar
            </ButtonProfile>
          </div>
        )}
      </div>
    </div>
  );
};
