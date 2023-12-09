import Alert from "react-bootstrap/Alert";
import { useState } from "react";

import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useLocation, useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { ButtonStyled } from "../StyledComponents";

import { formatError } from "./utils";

import { useTecnicos } from "../../domain/tecnicos/useTecnicos";
import { Dropdown } from "react-bootstrap";
import { createSoporte } from "../../api/soportes";
import Swal from "sweetalert2";

const tituloRqd = z.string({
  required_error: "El titulo es requerido",
});
const descripcionRqd = z.string({
  required_error: "La descripcion es requerida",
});

const tecnicoRqd = z.string({
  required_error: "El tecnico es requerido",
});

const fechaGeneracionRqd = z.string({
  required_error: "La fecha es requerida",
});

const horaGeneracionRqd = z.string({
  required_error: "La hora es requerida",
});

const soporteSchema = z.object({
  titulo: tituloRqd,
  descripcion: descripcionRqd,
  tecnicoId: tecnicoRqd,
  fechaGeneracion: fechaGeneracionRqd,
  // horaGeneracion: horaGeneracionRqd,
});

const tiposSoporte = [
  "Configuracion de router/onu/antena",
  "Obra civil",
  "Cambio de equipo",
  "Mantenimiento preventivo",
];

export const SoporteForm = () => {
  const { data, loading, error: errorTecnicos } = useTecnicos();
  const tecnicos = data?.map((tec) => ({
    nombre: tec.nombreCompleto,
    id: tec.id,
    soportes: tec.soportesTecnicos,
  }));
  const [horasDisponibles, setHorasDisponibles] = useState([
    "08:00AM - 10:00AM",
    "10:00AM - 12:00AM",
    "02:00PM - 04:00PM",
    "04:00PM - 06:00PM",
  ]);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const cliente = location.state?.cliente;
  console.log("cliente", cliente);

  const onCreateCliente = async (formData) => {
    const newData = {
      ...formData,
      horaGeneracion: selectedTime,
      clienteId: cliente.id,
    };

    const response = await createSoporte(newData);
    const { data } = response;
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Soporte creado",
        text: "El soporte se ha creado correctamente",
      });
    }

    // navigate("/profile/", { replace: true });
  };
  const initialValues = {
    titulo: "",
    descripcion: "",
    tecnicoId: "",
    fechaGeneracion: "",
    horaGeneracion: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      setError(false);
      setErrorMessage("");

      await onCreateCliente(values);

      setSubmitting(false);
      navigate("/profile/", { replace: true });
    } catch (error) {
      const message = formatError(error);
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal!",
      });
    }
  };

  const updateHorasDisponibles = (fecha, tecnico) => {
    if (!fecha || !tecnico) return;
    console.log("fecha", fecha);
    console.log("tecnico", tecnico);
    console.log("tecnicos", tecnicos);
    // aqui voy a buscar los soportes del tecnico en la fecha correspondiente para ver que horas estan ocupadas y cuales disponibles
    const soportes = tecnicos.find((tec) => tec.id === tecnico).soportes;
    console.log("soportes", soportes);
    //aqui tengo todos los soportes del tecnico que tenga agendados, ahora debo filtrarlos por fecha
    const soportesxFecha = soportes.filter(
      (soporte) => soporte.fechaGeneracion === fecha
    );
    //aqui tengo todos los soportes del tecnico que tenga agendados en la fecha seleccionada, ahora debo filtrarlos por hora
    const horasOcupadas = soportesxFecha.map((soporte) => {
      return soporte.horaGeneracion;
    });
    //aqui tengo todas las horas ocupadas por el tecnico en la fecha seleccionada, ahora debo filtrarlas por las horas disponibles

    const horasConstante = [
      "08:00AM - 10:00AM",
      "10:00AM - 12:00AM",
      "02:00PM - 04:00PM",
      "04:00PM - 06:00PM",
    ];

    // ahora creo un nuevo arreglo de solo horas disponibles, la hora ocupada la elimino la comparto con horas constante y creo el nuevo arreglo
    const horasDisponiblesNew = horasConstante.filter(
      (hora) => !horasOcupadas.includes(hora)
    );

    setHorasDisponibles(horasDisponiblesNew);
  };

  return (
    <div className="d-flex border flex-row justify-content-center pb-5 ">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={toFormikValidationSchema(soporteSchema)}
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
          <>
            <Form
              className="d-flex flex-column gap-4 "
              onSubmit={handleSubmit}
              style={{ width: "75%", margin: "auto", marginTop: "10px" }}
            >
              {error && (
                <Alert
                  variant="danger"
                  style={{ width: "75%", margin: "auto", marginTop: "10px" }}
                >
                  Hubo un error, intentalo nuevamente
                </Alert>
              )}
              <Form.Group className="" controlId="formBasicNombreCompleto">
                <h3 className="pt-5 pb-3">
                  Creacion de Ticket de soporte tecnico
                </h3>
                <Form.Label>Nombre Completo: </Form.Label>
                <span className="px-5">
                  <strong>{cliente?.nombreCompleto}</strong>
                </span>
              </Form.Group>
              <Form.Group className=" " controlId="formBasicProdRef">
                <Form.Label>Tipo de Soporte</Form.Label>

                <Form.Select
                  name="titulo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.titulo}
                >
                  <option value="0">Selecciona el tipo</option>
                  {tiposSoporte.map((doc) => {
                    return (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    );
                  })}
                </Form.Select>
                <ErrorMessage
                  name="titulo"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>
              <Form.Group className=" " controlId="formBasicProdRef">
                <Form.Label>Tenico Encargado</Form.Label>

                <Form.Select
                  name="tecnicoId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.tecnicoId}
                >
                  <option value="0">Selecciona el tecnico</option>
                  {tecnicos.map((doc) => {
                    return (
                      <option key={doc.id} value={doc.id}>
                        {doc.nombre}
                      </option>
                    );
                  })}
                </Form.Select>
                <ErrorMessage
                  name="tecnicoId"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicEmail">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  as={"textarea"}
                  rows={4}
                  placeholder="Escibe detalladamente el problema"
                  name="descripcion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.descripcion}
                  className={
                    touched.descripcion && errors.descripcion
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="descripcion"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              <Form.Group className="" controlId="formBasicDocumento">
                <Form.Label>Fecha de agendamiento</Form.Label>
                <Form.Control
                  type="date"
                  name="fechaGeneracion"
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    updateHorasDisponibles(e.target.value, values.tecnicoId);
                  }}
                  // onBlur={handleBlur}
                  // value={values.fechaGeneracion}
                  min={new Date().toISOString().split("T")[0]}
                  className={
                    touched.fechaGeneracion && errors.fechaGeneracion
                      ? "is-invalid"
                      : ""
                  }
                />
                <ErrorMessage
                  name="fechaGeneracion"
                  component="div"
                  className="invalid-feedback"
                />
              </Form.Group>

              {values.fechaGeneracion && (
                <Form.Group controlId="formBasicTime">
                  <Form.Label>Hora de agendamiento</Form.Label>
                  <Dropdown onSelect={handleTimeSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selectedTime ? selectedTime : "Selecciona una hora"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {horasDisponibles.length === 0 && (
                        <Dropdown.Item key="0" eventKey="0">
                          No hay horario disponibles, cambia el tecnico
                        </Dropdown.Item>
                      )}
                      {horasDisponibles?.map((hora) => (
                        <Dropdown.Item key={hora} eventKey={hora}>
                          {hora}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              )}

              <div className="d-flex justify-content-center">
                <ButtonStyled
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? (
                    "Crear Ticket"
                  ) : (
                    <Spinner
                      as="span"
                      animation="grow"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </ButtonStyled>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};
