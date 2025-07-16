import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyled } from "../StyledComponents";
import Swal from "sweetalert2";
import {
  createServices,
  updateService,
  getServiceById,
} from "../../api/services";
import { useNavigate, useParams } from "react-router-dom";

// Esquemas de validación con Zod
const typeServiceRqd = z.string({
  required_error: "El tipo de servicio es requerido",
});

const nameRqd = z.string({
  required_error: "El nombre del servicio es requerido",
});

const bandwidthDownloadOpt = z
  .number({
    invalid_type_error: "Debe ser un número válido",
  })
  .optional();

const bandwidthUploadOpt = z
  .number({
    invalid_type_error: "Debe ser un número válido",
  })
  .optional();

const descriptionOpt = z.string().optional();

const priceOpt = z
  .number({
    invalid_type_error: "Debe ser un número válido",
  })
  .optional();

// Opciones para el tipo de servicio
const tiposServicio = [
  "Inalámbrico",
  "Fibra Óptica",
  "Dedicado",
  "Empresarial",
  "Residencial",
];

// Esquema principal
const serviceSchema = z.object({
  typeService: typeServiceRqd,
  name: nameRqd,
  bandwidthDownload: bandwidthDownloadOpt,
  bandwidthUpload: bandwidthUploadOpt,
  description: descriptionOpt,
  price: priceOpt,
});

const ServicesForm = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  // Valores iniciales del formulario
  const initialValues = {
    typeService: serviceData?.typeService || "",
    name: serviceData?.name || "",
    bandwidthDownload: serviceData?.bandwidthDownload || "",
    bandwidthUpload: serviceData?.bandwidthUpload || "",
    description: serviceData?.description || "",
    price: serviceData?.price || "",
  };

  // Cargar datos del servicio si está editando
  useEffect(() => {
    const loadServiceData = async () => {
      if (isEditing) {
        try {
          setLoading(true);
          const service = await getServiceById(id);
          setServiceData(service);
        } catch (error) {
          console.error("Error cargando servicio:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo cargar la información del servicio",
          });
          navigate("/profile/servicios");
        } finally {
          setLoading(false);
        }
      }
    };

    loadServiceData();
  }, [id, isEditing, navigate]);

  // Función para crear o actualizar servicio
  const onSaveService = async (formData) => {
    try {
      let result;

      if (isEditing) {
        console.log("Actualizando servicio:", formData);
        console.log(formData);
        result = await updateService(id, formData);

        if (result) {
          Swal.fire({
            icon: "success",
            title: "Servicio actualizado exitosamente",
            text: "El servicio ha sido actualizado correctamente.",
          });
        }
      } else {
        console.log("Creando nuevo servicio:", formData);
        result = await createServices(formData);

        if (result) {
          Swal.fire({
            icon: "success",
            title: "Servicio creado exitosamente",
            text: "El servicio ha sido creado correctamente.",
          });
        }
      }

      navigate("/profile/servicios", { replace: true });
    } catch (error) {
      console.error("Error al guardar servicio:", error);
      Swal.fire({
        icon: "error",
        title: isEditing
          ? "Error al actualizar el servicio"
          : "Error al crear el servicio",
        text: "Hubo un problema al guardar el servicio, por favor intenta nuevamente.",
      });
    }
  };

  // Función de envío del formulario
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      // Convertir valores numéricos vacíos a null
      const formData = {
        ...values,
        bandwidthDownload: values.bandwidthDownload
          ? parseInt(values.bandwidthDownload)
          : null,
        bandwidthUpload: values.bandwidthUpload
          ? parseInt(values.bandwidthUpload)
          : null,
        price: values.price ? parseInt(values.price) : null,
      };

      await onSaveService(formData);
      setSubmitting(false);
    } catch (error) {
      setError(true);
      setErrorMessage(
        isEditing
          ? "Hubo un error al actualizar el servicio"
          : "Hubo un error al crear el servicio"
      );
      setSubmitting(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: isEditing
          ? "Hubo un error al actualizar el servicio, intenta nuevamente"
          : "Hubo un error al crear el servicio, intenta nuevamente",
      });
    }
  };

  // Mostrar loading mientras carga los datos del servicio
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Cargando servicio...</span>
          </Spinner>
          <p className="mt-3">Cargando información del servicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex border flex-row justify-content-center pb-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(serviceSchema)}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className="d-flex flex-column gap-4"
            onSubmit={handleSubmit}
            style={{ width: "75%", margin: "auto", marginTop: "10px" }}
          >
            {error && (
              <Alert
                variant="danger"
                style={{ width: "100%", margin: "auto", marginTop: "10px" }}
              >
                {errorMessage}
              </Alert>
            )}

            <h3 className="pt-5 pb-3">
              {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
            </h3>

            {/* Tipo de Servicio */}
            <Form.Group controlId="formBasicTypeService">
              <Form.Label>Tipo de Servicio *</Form.Label>
              <Form.Select
                name="typeService"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.typeService}
                className={
                  touched.typeService && errors.typeService ? "is-invalid" : ""
                }
              >
                <option value="">Selecciona un tipo de servicio</option>
                {tiposServicio.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </Form.Select>
              <ErrorMessage
                name="typeService"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Nombre del Servicio */}
            <Form.Group controlId="formBasicName">
              <Form.Label>Nombre del Servicio *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Internet 100MB - Residencial"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className={touched.name && errors.name ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Velocidad de Descarga */}
            <Form.Group controlId="formBasicBandwidthDownload">
              <Form.Label>Velocidad de Descarga (MB)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 100"
                name="bandwidthDownload"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bandwidthDownload}
                className={
                  touched.bandwidthDownload && errors.bandwidthDownload
                    ? "is-invalid"
                    : ""
                }
              />
              <ErrorMessage
                name="bandwidthDownload"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Velocidad de Subida */}
            <Form.Group controlId="formBasicBandwidthUpload">
              <Form.Label>Velocidad de Subida (MB)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 50"
                name="bandwidthUpload"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bandwidthUpload}
                className={
                  touched.bandwidthUpload && errors.bandwidthUpload
                    ? "is-invalid"
                    : ""
                }
              />
              <ErrorMessage
                name="bandwidthUpload"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Descripción */}
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe las características del servicio..."
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={
                  touched.description && errors.description ? "is-invalid" : ""
                }
              />
              <ErrorMessage
                name="description"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Precio */}
            <Form.Group controlId="formBasicPrice">
              <Form.Label>Precio (COP)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ej: 45000"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className={touched.price && errors.price ? "is-invalid" : ""}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="invalid-feedback"
              />
            </Form.Group>

            {/* Botones de Acción */}
            <div className="d-flex justify-content-center gap-3 pt-4">
              <ButtonStyled
                type="button"
                variant="outline-secondary"
                onClick={() => navigate("/profile/servicios")}
                disabled={isSubmitting}
                style={{ width: "150px" }}
              >
                Cancelar
              </ButtonStyled>
              <ButtonStyled
                type="submit"
                disabled={isSubmitting}
                className="d-flex align-items-center justify-content-center gap-2"
                style={{ width: "200px" }}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    {isEditing ? "Actualizando..." : "Creando..."}
                  </>
                ) : isEditing ? (
                  "Actualizar Servicio"
                ) : (
                  "Crear Servicio"
                )}
              </ButtonStyled>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ServicesForm;
