import { useState } from "react";
import { useFacturas } from "../../domain/useFacturas";
import { Alert, Spinner } from "react-bootstrap";
import { createFactura } from "../../api/facturas";
import { set } from "date-fns";

export const FacturasForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { data, loading, error, recargarFacturas } = useFacturas();
  const [resultadoCarga, setResultadoCarga] = useState(null);
  const [show, setShow] = useState(true);

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
      console.log("No se seleccionó ningún archivo.");
      return;
    }

    const text = await readFileAsText(selectedFile);
    console.log("Contenido del archivo de texto:");

    const json = parseTextContent(text);

    const datajson = { ...json };
    // const nuevoObjeto = { factura: datajson };
    // console.log(nuevoObjeto);

    const response = await createFactura({ facturas: datajson });
    const { count } = response.data;
    setResultadoCarga(`${count} facturas cargadas`);
    recargarFacturas();
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

  return (
    <>
      <div className="d-flex flex-column  ">
        <h2>Modulo de carga de facturas</h2>

        <div>
          <form>
            <input type="file" onChange={handleFileChange} accept=".txt" />
            <button onClick={handleSubmit} type="submit">
              Enviar
            </button>
          </form>
        </div>
        {resultadoCarga && (
          <Alert variant="success" onClose={() => setShow(false)} dismissible>
            {resultadoCarga}
          </Alert>
        )}
      </div>

      <div className="pt-5">
        <h4>Facturas cargadas</h4>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}

        {data &&
          data.map((factura) => {
            return (
              <div key={factura.id}>
                {" "}
                {factura.cliente.nombreCompleto} -valor - {factura.total}
              </div>
            );
          })}
      </div>
    </>
  );
};
