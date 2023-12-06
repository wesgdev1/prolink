import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { ContainerCalendar } from "./StyledComponentsProfile";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { useSoportes } from "../../domain/soportes/useSoportes";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

export const Calendar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, loading, error } = useSoportes({ user });

  const handleDateClick = (arg) => {
    navigate(`/profile/soportes/${arg.event.id}`);
  };

  const sortedEvents = data?.map((soporte) => ({
    id: soporte.id,
    title: `Soporte #${soporte.numeroSoporte} `,
    date: soporte.fechaGeneracion,
    name: `Cliente: ${soporte.cliente.nombreCompleto}`,
    hora: `Hora: ${soporte.horaGeneracion}`,
    nameDirection: soporte.cliente.direccion,
    color: soporte.estado ? "#2F9C41" : "#F96161",
  }));

  const eventContent = (eventInfo) => {
    return (
      <div style={{ height: "100%" }}>
        <b>{eventInfo.timeText}</b>
        <i>
          <strong>{eventInfo.event.title}</strong>
        </i>
        <p>{eventInfo.event.extendedProps.name}</p>
        <p>{eventInfo.event.extendedProps.hora}</p>
        <i>{eventInfo.event.extendedProps.nameDirection}</i>
      </div>
    );
  };

  return (
    <div className="pt-5">
      <h4>
        <i className="bi bi-calendar2-week"></i> Agenda de soportes en sitio
      </h4>
      <ContainerCalendar>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {data && (
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventContent={eventContent}
            eventClick={handleDateClick}
            events={sortedEvents}
            locale="es"
          />
        )}
      </ContainerCalendar>
    </div>
  );
};
