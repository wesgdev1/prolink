import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Coordenadas por defecto para Cúcuta
const DEFAULT_COORDS = { lat: 7.8891, lng: -72.4969 };

// Obtener la API Key de Google Maps desde las variables de entorno
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY2 || "";

// Coordenadas alternativas para distribuir clientes sin ubicación en un área de Cúcuta
const CUCUTA_POINTS = [
  { lat: 7.8891, lng: -72.4969 }, // Centro
  { lat: 7.9051, lng: -72.5077 }, // Noreste
  { lat: 7.8989, lng: -72.4771 }, // Este
  { lat: 7.8763, lng: -72.4869 }, // Sureste
  { lat: 7.8732, lng: -72.5069 }, // Sur
  { lat: 7.8823, lng: -72.5169 }, // Suroeste
  { lat: 7.8921, lng: -72.5169 }, // Oeste
  { lat: 7.9001, lng: -72.5169 }, // Noroeste
];

// Función para convertir coordenadas de formato DMS a decimal
const convertDMSToDecimal = (dms) => {
  try {
    // Patrón para capturar grados, minutos, segundos y dirección (N/S/E/W)
    // Por ejemplo: 7°56'20.6"N 72°31'17.2"W
    const patternLat = /(\d+)°(\d+)'([\d.]+)"([NS])/;
    const patternLng = /(\d+)°(\d+)'([\d.]+)"([EW])/;

    const matchLat = dms.match(patternLat);
    const matchLng = dms.match(patternLng);

    if (!matchLat || !matchLng) return null;

    // Convertir a decimal
    const lat =
      parseFloat(matchLat[1]) +
      parseFloat(matchLat[2]) / 60 +
      parseFloat(matchLat[3]) / 3600;
    const lng =
      parseFloat(matchLng[1]) +
      parseFloat(matchLng[2]) / 60 +
      parseFloat(matchLng[3]) / 3600;

    // Ajustar signos según dirección
    const latSign = matchLat[4] === "S" ? -1 : 1;
    const lngSign = matchLng[4] === "W" ? -1 : 1;

    return {
      lat: lat * latSign,
      lng: lng * lngSign,
    };
  } catch (error) {
    console.error("Error en conversión DMS:", error);
    return null;
  }
};

export const MapsClients = ({ clientesPendientes = [] }) => {
  const theme = useTheme();
  const [usarUbicacionAlternativa, setUsarUbicacionAlternativa] =
    useState(false);

  // Verificar si la API Key está disponible
  const [apiKeyError, setApiKeyError] = useState(false);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error(
        "API Key de Google Maps no encontrada en variables de entorno"
      );
      setApiKeyError(true);
    }
  }, []);

  // Log para depuración
  useEffect(() => {
    console.log("Clientes pendientes recibidos:", clientesPendientes);
  }, [clientesPendientes]);

  const getCoordinatesFromUrl = (url) => {
    if (!url) return null;

    try {
      console.log("Procesando URL:", url);

      // Intentar primero detectar si es un formato DMS directo
      if (
        url.includes("°") &&
        (url.includes("N") || url.includes("S")) &&
        (url.includes("E") || url.includes("W"))
      ) {
        console.log(
          "Detectado posible formato DMS, intentando convertir:",
          url
        );
        const coordsDMS = convertDMSToDecimal(url);
        if (coordsDMS) {
          console.log("Conversión DMS exitosa:", coordsDMS);
          return coordsDMS;
        }
      }

      // También intentar detectar si son coordenadas decimales directas
      // Formato: "7.123456, -72.123456" o "7.123456 -72.123456"
      const directDecimalPattern = /^([-+]?\d+\.\d+)[,\s]+([-+]?\d+\.\d+)$/;
      const directMatch = url.match(directDecimalPattern);
      if (directMatch) {
        console.log("Detectadas coordenadas decimales directas:", directMatch);
        return {
          lat: parseFloat(directMatch[1]),
          lng: parseFloat(directMatch[2]),
        };
      }

      // Patrón para capturar coordenadas en diferentes formatos de URLs de Google Maps
      const patterns = [
        /@?(-?\d+\.\d+),\s*(-?\d+\.\d+)/, // Formato @lat,lng
        /q=(-?\d+\.\d+),(-?\d+\.\d+)/, // Formato q=lat,lng
        /ll=(-?\d+\.\d+),(-?\d+\.\d+)/, // Formato ll=lat,lng
        /[&?]q=([+-]?\d+\.\d+)%2C([+-]?\d+\.\d+)/, // Formato URL-encoded q=lat%2Clng
        /[&?]ll=([+-]?\d+\.\d+)%2C([+-]?\d+\.\d+)/, // Formato URL-encoded ll=lat%2Clng
        /[&?]sll=([+-]?\d+\.\d+)%2C([+-]?\d+\.\d+)/, // Formato URL-encoded sll=lat%2Clng
      ];

      for (const regex of patterns) {
        const match = url.match(regex);
        if (match) {
          console.log("Coincidencia encontrada:", match);
          return {
            lat: parseFloat(match[1]),
            lng: parseFloat(match[2]),
          };
        }
      }

      // Si llegamos aquí, no se encontró ninguna coincidencia
      console.log("No se encontraron coordenadas en la URL");
      return null;
    } catch (error) {
      console.error("Error al procesar URL de ubicación:", error);
      return null;
    }
  };

  // Extraer coordenadas manualmente si está en un formato conocido
  const extractCoordinatesManually = (url) => {
    if (!url) return null;

    try {
      // Intentar soluciones alternativas para formatos específicos

      // Para URLs con format "https://www.google.com/maps/place/..."
      if (url.includes("google.com/maps/place/")) {
        // Intentar encontrar coordenadas en la URL completa
        const latLngMatch = url.match(/\/([+-]?\d+\.\d+),([+-]?\d+\.\d+)/);
        if (latLngMatch && latLngMatch.length >= 3) {
          console.log("Extracción manual exitosa (place):", latLngMatch);
          return {
            lat: parseFloat(latLngMatch[1]),
            lng: parseFloat(latLngMatch[2]),
          };
        }
      }

      // Para URLs con formato "https://goo.gl/maps/..."
      if (url.includes("goo.gl/maps/")) {
        console.log(
          "URL de Google Maps acortada detectada - requiere resolución"
        );
        // No podemos resolver URLs acortadas directamente
        return null;
      }

      return null;
    } catch (error) {
      console.error("Error en extracción manual:", error);
      return null;
    }
  };

  // Asignar una ubicación alternativa basada en el nombre/dirección del cliente
  const getAlternativeLocation = (cliente, index) => {
    if (!usarUbicacionAlternativa) return null;

    // Usar una ubicación del arreglo de puntos, rotando según el índice
    const point = CUCUTA_POINTS[index % CUCUTA_POINTS.length];

    // Agregar pequeña variación para que no estén todos en el mismo lugar exacto
    const jitter = 0.002; // ~200 metros de variación
    const randomLat = point.lat + (Math.random() - 0.5) * jitter;
    const randomLng = point.lng + (Math.random() - 0.5) * jitter;

    return {
      lat: randomLat,
      lng: randomLng,
    };
  };

  // Extraer coordenadas de todos los clientes pendientes
  const coordenadas = clientesPendientes
    .map((cliente, index) => {
      console.log("Procesando cliente:", cliente.nameClient);

      // Intentar extracción con el método principal
      let coords = getCoordinatesFromUrl(cliente.ubication);

      // Si falla, intentar método alternativo
      if (!coords) {
        console.log("Intentando extracción manual para:", cliente.nameClient);
        coords = extractCoordinatesManually(cliente.ubication);
      }

      // Si todavía falla, usar ubicación alternativa si está habilitado
      if (!coords) {
        coords = getAlternativeLocation(cliente, index);
        console.log(
          "Usando ubicación alternativa para:",
          cliente.nameClient,
          coords
        );
      }

      if (!coords) {
        console.log(
          "No se pudieron extraer coordenadas para:",
          cliente.nameClient
        );
      } else {
        console.log("Coordenadas obtenidas:", coords);
      }

      return {
        ...cliente,
        coords,
        nombre: cliente.nameClient || "Cliente sin nombre",
        usandoUbicacionAlternativa:
          !getCoordinatesFromUrl(cliente.ubication) &&
          !extractCoordinatesManually(cliente.ubication) &&
          usarUbicacionAlternativa,
      };
    })
    .filter((cliente) => cliente.coords); // Filtra si alguna no tiene coordenadas válidas

  console.log("Total de coordenadas encontradas:", coordenadas.length);

  // Si hay un error con la API Key
  if (apiKeyError) {
    return (
      <div
        style={{
          width: "100%",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
          marginBottom: "20px",
          padding: "20px",
          color: "#721c24",
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
        }}
      >
        <p style={{ textAlign: "center" }}>
          <strong>Error:</strong> No se pudo cargar el mapa. La API Key de
          Google Maps no está configurada correctamente.
          <br />
          <small>
            Por favor, verifica la variable de entorno VITE_GOOGLE_MAPS_API_KEY
            en el archivo .env
          </small>
        </p>
      </div>
    );
  }

  // Si no hay coordenadas válidas, mostramos un mensaje
  if (coordenadas.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            color: "#6c757d",
            fontStyle: "italic",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          No hay clientes pendientes con ubicación disponible
          <br />
          <small>
            (Total recibidos: {clientesPendientes.length}, pero ninguno tiene
            coordenadas válidas)
          </small>
        </p>

        <div
          style={{
            marginTop: "10px",
            fontSize: "0.9rem",
            textAlign: "center",
            maxWidth: "600px",
          }}
        >
          <p>
            <strong>Sugerencia:</strong> Las ubicaciones pueden estar en varios
            formatos:
          </p>
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>
              <strong>URLs de Google Maps:</strong>
              <ul>
                <li>https://www.google.com/maps?q=7.123456,-72.123456</li>
                <li>
                  https://www.google.com/maps/place/Sitio/@7.234567,-72.234567,15z
                </li>
              </ul>
            </li>
            <li>
              <strong>Coordenadas decimales directas:</strong>
              <ul>
                <li>7.123456, -72.123456</li>
              </ul>
            </li>
            <li>
              <strong>Formato DMS (grados, minutos, segundos):</strong>
              <ul>
                <li>7°56&apos;20.6&quot;N 72°31&apos;17.2&quot;W</li>
              </ul>
            </li>
          </ul>

          <p style={{ marginTop: "10px" }}>
            <strong>Importante:</strong> El formato DMS debe seguir exactamente
            el patrón mostrado arriba.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            onClick={() =>
              alert(
                "Ejemplos de formatos aceptados:\n" +
                  "- URL: https://www.google.com/maps?q=7.123456,-72.123456\n" +
                  "- Decimal directo: 7.123456, -72.123456\n" +
                  "- DMS: 7°56&apos;20.6&quot;N 72°31&apos;17.2&quot;W"
              )
            }
            style={{
              padding: "8px 12px",
              background: theme?.colors?.mainColor || "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Ver ejemplos de formatos
          </button>

          <button
            onClick={() => setUsarUbicacionAlternativa(true)}
            style={{
              padding: "8px 12px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Usar ubicaciones alternativas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ marginBottom: "20px", borderRadius: "8px", overflow: "hidden" }}
    >
      {usarUbicacionAlternativa && (
        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          ⚠️ Algunas ubicaciones son aproximadas (no basadas en GPS real)
        </div>
      )}

      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={12}
          mapId="117b7446662f16c3"
          defaultCenter={coordenadas[0]?.coords || DEFAULT_COORDS}
          style={{ width: "100%", height: "500px" }}
          gestureHandling="greedy"
          disableDefaultUI={false}
          draggable={true}
        >
          {coordenadas.map((cliente, index) => (
            <AdvancedMarker key={index} position={cliente.coords}>
              <div
                style={{
                  background: cliente.usandoUbicacionAlternativa
                    ? "#f9a825" // Color naranja para ubicaciones alternativas
                    : theme.colors?.mainColor || "#0d6efd",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  border: "2px solid white",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={`${cliente.nombre}\n${cliente.address || ""}\n${
                  cliente.usandoUbicacionAlternativa
                    ? "(Ubicación aproximada)"
                    : ""
                }`}
              >
                {cliente.nombre}
                {cliente.usandoUbicacionAlternativa && " *"}
              </div>
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

// Definir PropTypes para el componente
MapsClients.propTypes = {
  clientesPendientes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nameClient: PropTypes.string,
      ubication: PropTypes.string,
      address: PropTypes.string,
      status: PropTypes.bool,
    })
  ),
};

// Definir valores por defecto
MapsClients.defaultProps = {
  clientesPendientes: [],
};
