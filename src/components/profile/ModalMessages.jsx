import { Form, Modal } from "react-bootstrap";

import { Navigate, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useConversaciones } from "../../domain/conversaciones/useConversaciones";
import { createMessage } from "../../api/mensajes";
import { ButtonProfile } from "./StyledComponentsProfile";
import Swal from "sweetalert2";

export function ModalMessages(props) {
  const [mensajeContenido, setMensajeContenido] = useState("");
  const [error, setError] = useState(null);
  const {
    actions: { create },
  } = useConversaciones();

  const handleInputChange = (event) => {
    setMensajeContenido(event.target.value);
  };

  const navigate = useNavigate();

  const sentMessages = async (event) => {
    event.preventDefault();

    try {
      const conversacion = await create({
        recipientId: props.recipientId,
      });
      if (conversacion) {
        await createMessage({
          content: mensajeContenido,
          conversacionId: conversacion.id,
        });
      }

      if (conversacion) {
        Swal.fire({
          icon: "success",
          title: "Caso abierto con exito",
          text: "Te redireccionaremos a tus mensajes",
        });
        navigate(`/profile/realtime/chats/${conversacion.id}`, {
          replace: true,
        });
        console.log(conversacion);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal, intenta de nuevo",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya tienes un caso abiero en estado pendiente, dirigete a tus mensajes",
      });
    }
  };

  return (
    <Modal {...props} centered>
      <Modal.Header className="bg-secondary-subtle" closeButton>
        <Modal.Title className="fw-bold">Abrir un caso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && (
            <span>{"Tienes un chat activo, dirigete a tus mensajes"}</span>
          )}

          {!error && (
            <Form.Group className="d-flex mb-3 align-items-center">
              <Form.Control
                className="ms-3"
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje aqui de la forma mas detallada posible"
                value={mensajeContenido}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="bg-secondary-subtle">
        {!error && <ButtonProfile onClick={sentMessages}>Enviar</ButtonProfile>}
      </Modal.Footer>
    </Modal>
  );
}
