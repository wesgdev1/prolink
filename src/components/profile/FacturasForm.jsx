import { useState } from "react";
import { useFacturas } from "../../domain/useFacturas";
import { Alert, Form, Spinner } from "react-bootstrap";
import { createFactura } from "../../api/facturas";
import Swal from "sweetalert2";
import { FacturasTable } from "./FacturasTable";
import { ButtonStyled } from "../StyledComponents";
import "ldrs/ring";
import "ldrs/lineSpinner";
import "ldrs/ripples";
import "ldrs/superballs";
import { ButtonProfile } from "./StyledComponentsProfile";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const FacturasForm = () => {
  const { user } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const { data, loading, error, recargarFacturas } = useFacturas({ user });
  const [resultadoCarga, setResultadoCarga] = useState(null);
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filtroSelected, setFiltroSelected] = useState("Todo");

  const [notificacion, setNotificacion] = useState(false);

  const parseTextContent = (text) => {
    const lines = text.split("\n");
    const records = [];
    let currentRecord = {};

    for (const line of lines) {
      const [key, value] = line.split(",").map((item) => item.trim());

      if (key && value) {
        currentRecord[key] = value;
      } else {
        // Encuentra una línea en blanco, lo que indica el final del registro actual.
        if (Object.keys(currentRecord).length > 0) {
          records.push(currentRecord);
          currentRecord = {};
        }
      }
    }

    // Añadir el último registro si existe.
    if (Object.keys(currentRecord).length > 0) {
      records.push(currentRecord);
    }

    return records;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes seleccionar un archivo",
      });
      return;
    }

    const text = await readFileAsText(selectedFile);

    const json = parseTextContent(text);

    const datajson = { ...json };

    setIsLoading(true);
    const response = await createFactura({ facturas: datajson });
    const { count } = response.data;

    if (count > 0) {
      Swal.fire({
        icon: "success",
        title: "Facturas cargadas",
        text: `${count} facturas cargadas`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se cargaron facturas",
      });
    }
    setSelectedFile(null);
    recargarFacturas();
    setIsLoading(false);
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearch = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.preventDefault();

      const filter = data.filter((factura) => {
        return (
          factura.cliente.nombreCompleto
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          factura.referencia
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          factura.cliente.nombreCompleto
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
    <>
      <div className="d-flex flex-column">
        <h2 className="pb-5">Modulo de carga de facturas</h2>

        <script
          type="module"
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/newtonsCradle.js"
        ></script>

        <div>
          <Form.Group controlId="formFile" className="d-flex flex-column gap-3">
            <Form.Label>Cargue sus facturas en formato .txt</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept=".txt"
            />
            {isLoading ? (
              // Default values shown
              <l-superballs size="60" speed="1.4" color="green"></l-superballs>
            ) : (
              <ButtonStyled onClick={handleSubmit}>
                Cargar Facturas
              </ButtonStyled>
            )}
          </Form.Group>
          {/* <form>
            <input type="file" onChange={handleFileChange} accept=".txt" />
            <button onClick={handleSubmit} type="submit">
              Enviar
            </button>
          </form> */}
        </div>
        {/* {resultadoCarga &&
          Swal.fire({
            icon: "success",
            title: "Facturas cargadas",
            text: resultadoCarga,
          })} */}

        <div className="pt-5">
          <h4>Facturas cargadas</h4>

          {loading && <Spinner animation="border" variant="primary" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <div>
            <Form.Control
              type="search"
              placeholder="Buscar por Nombre | Contrato | Numero de factura"
              className="me-2 w-50"
              aria-label="Search"
              onChange={handleInputChange}
              onKeyDown={onSearch}
              value={searchValue}
            />
          </div>
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
              <FacturasTable facturas={filteredData} />
            </>
          ) : (
            data && <FacturasTable facturas={data} />
          )}
        </div>
      </div>
    </>
  );
};
