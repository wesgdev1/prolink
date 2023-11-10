import { useState } from "react";

export const FacturasForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const parseTextContent = (text) => {
    const lines = text.split("\n");
    const records = [];
    let currentRecord = {};

    for (const line of lines) {
      const [key, value] = line.split(":").map((item) => item.trim());

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
    console.log(text);
    const json = parseTextContent(text);
    const datajson = { ...json };
    console.log(datajson);
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
    <div>
      <h2>Modulo de carga de facturas</h2>

      <form>
        <input type="file" onChange={handleFileChange} accept=".txt" />
        <button onClick={handleSubmit} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
