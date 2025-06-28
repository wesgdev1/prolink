import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// --- Configuración Esencial para pdfjs-dist ---
// pdf.js necesita un "worker" para funcionar correctamente.
// Usamos un CDN para la forma más sencilla de configurarlo.
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

// Función para limpiar caracteres inválidos en nombres de archivo
const sanitizeFilename = (name) => {
  return name.replace(/[\\/:*?"<>|]/g, "_").trim();
};

const ProcesarFacturas = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [generatedPages, setGeneratedPages] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setGeneratedPages([]); // Limpiar resultados anteriores
      setProgressMessage("");
    } else {
      alert("Por favor, selecciona un archivo PDF válido.");
      setSelectedFile(null);
    }
  };

  /**
   * Renderiza una página de un PDF a una imagen en formato Data URL.
   */
  const renderPagePreview = async (pdfBytes) => {
    try {
      const loadingTask = getDocument({ data: pdfBytes.slice(0) });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 }); // Escala pequeña para la preview
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      return canvas.toDataURL("image/jpeg");
    } catch (error) {
      console.error("Error generando previsualización:", error);
      return null; // Devuelve null si falla
    }
  };

  /**
   * Procesa el PDF, extrae páginas y nombres, y prepara la UI para la descarga.
   */
  const processPDF = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setGeneratedPages([]);
    const results = [];

    try {
      const originalPdfBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
      const pageCount = pdfDoc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const pageNum = i + 1;
        setProgressMessage(`Procesando página ${pageNum} de ${pageCount}...`);

        // Crear PDF de una página
        const newPdfDoc = await PDFDocument.create();
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);
        const newPdfBytes = await newPdfDoc.save();

        // Extraer texto y buscar nombre
        const text = await extractTextFromPage(newPdfBytes);
        const nameMatch = text.match(
          /Señores\s+([A-ZÁÉÍÓÚÑ\s]+?)(?=\s*(NIT|Teléfono|Dirección|Cédula|Ciudad|Local|$))/i
        );
        const editableName =
          nameMatch && nameMatch[1]
            ? nameMatch[1].trim()
            : `Factura-Pagina-${pageNum}`;

        // Generar previsualización
        const previewUrl = await renderPagePreview(newPdfBytes);

        results.push({
          pageNumber: pageNum,
          pdfBytes: newPdfBytes,
          editableName: editableName,
          previewUrl: previewUrl,
        });
      }

      setProgressMessage("Proceso completado. Revisa los nombres y descarga.");
    } catch (error) {
      console.error("Ocurrió un error:", error);
      setProgressMessage("Error: Hubo un problema al procesar el PDF.");
    } finally {
      setGeneratedPages(results);
      setIsProcessing(false);
    }
  };

  const extractTextFromPage = async (pdfBytes) => {
    // Usamos .slice(0) para pasar una copia y evitar que el buffer sea "detached"
    const loadingTask = getDocument({ data: pdfBytes.slice(0) });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    return textContent.items.map((item) => item.str).join(" ");
  };

  // --- Funciones para la nueva UI ---

  const handleNameChange = (index, newName) => {
    const updatedPages = [...generatedPages];
    updatedPages[index].editableName = newName;
    setGeneratedPages(updatedPages);
  };

  const downloadIndividual = (page) => {
    const pdfBlob = new Blob([page.pdfBytes], { type: "application/pdf" });
    const safeFilename = sanitizeFilename(page.editableName);
    saveAs(pdfBlob, `${safeFilename}.pdf`);
  };

  const downloadAllAsZip = async () => {
    setProgressMessage("Generando archivo ZIP...");
    const zip = new JSZip();

    generatedPages.forEach((page) => {
      const safeFilename = sanitizeFilename(page.editableName);
      zip.file(`${safeFilename}.pdf`, page.pdfBytes);
    });

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      saveAs(zipBlob, `Facturas Prolink - ${timestamp}.zip`);
      setProgressMessage("¡ZIP generado y descargado con éxito!");
    } catch (error) {
      console.error("Error generando el ZIP:", error);
      setProgressMessage("Error: No se pudo generar el archivo ZIP.");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">
            <i className="bi bi-file-earmark-zip-fill me-2"></i>
            Procesador de Facturas Prolink
          </h3>
        </div>
        <div className="card-body">
          <p className="lead">
            Modulo de procesamiento de facturas de Prolink.
          </p>
          <hr />

          <div className="mb-3">
            <label htmlFor="pdfInput" className="form-label fw-bold">
              Paso 1: Selecciona tu archivo de facturas
            </label>
            <input
              type="file"
              id="pdfInput"
              className="form-control"
              accept=".pdf"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </div>

          <div className="d-grid mb-3">
            <button
              onClick={processPDF}
              className="btn btn-primary btn-lg"
              disabled={isProcessing || !selectedFile}
            >
              {isProcessing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Procesando...
                </>
              ) : (
                <>
                  <i className="bi bi-gear-fill me-2"></i>
                  Paso 2: Procesar Archivo
                </>
              )}
            </button>
          </div>

          {(isProcessing || progressMessage) && (
            <div className="alert alert-info">{progressMessage}</div>
          )}

          {generatedPages.length > 0 && !isProcessing && (
            <div id="results-section">
              <h4 className="mt-4">Paso 3: Revisa y Descarga</h4>
              <p>
                Verifica los nombres de archivo. Puedes editarlos si es
                necesario.
              </p>
              <div className="d-grid mb-4">
                <button
                  onClick={downloadAllAsZip}
                  className="btn btn-success btn-lg"
                >
                  <i className="bi bi-file-earmark-zip-fill me-2"></i>
                  Descargar Todo como ZIP
                </button>
              </div>

              <ul className="list-group">
                {generatedPages.map((page, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      {page.previewUrl ? (
                        <img
                          src={page.previewUrl}
                          alt={`Preview pág. ${page.pageNumber}`}
                          className="me-3"
                          style={{ width: "70px", border: "1px solid #ddd" }}
                        />
                      ) : (
                        <div
                          className="me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "70px",
                            height: "100px",
                            backgroundColor: "#f0f0f0",
                          }}
                        >
                          <small>No Prev</small>
                        </div>
                      )}
                      <div style={{ flexGrow: 1 }}>
                        <label className="form-label-sm d-block text-muted">
                          Nombre del archivo (Pág. {page.pageNumber})
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={page.editableName}
                          onChange={(e) =>
                            handleNameChange(index, e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => downloadIndividual(page)}
                      className="btn btn-outline-secondary ms-3"
                      title="Descargar PDF individual"
                    >
                      <i className="bi bi-download"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcesarFacturas;
