import { useState } from "react";
import { ContainerBlog } from "../components/blog/StyledComponentsBlog";
import { getFactura, getFacturaSearch } from "../api/facturas";
import {
  ButtonStyledFactura,
  ContainerFacturas,
} from "../components/facturas/StyledComponentsFacturas";
import { FacturaDetail } from "../components/facturas/FacturaDetail";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Formik, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { ButtonStyled } from "../components/StyledComponents";

const cedulaRqd = z.number({
  required_error: "El numero de  cedula es requerida",
});
const searchCC = z.object({
  cedula: cedulaRqd.min(
    6,
    "El numero de cedula debe tener mínimo 5 caracteres"
  ),
});

export const Facturas = () => {
  const [value, setValue] = useState(0);
  const [facturas, setFacturas] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    cedula: "",
  };

  const onSearch = async (value) => {
    const response = await getFacturaSearch({ id: value });
    const { data } = response;
    setFacturas(response.data);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setError(false);
    setErrorMessage("");
    const cedula = values.cedula;
    await onSearch(cedula);
    setSubmitting(false);
  };

  return (
    <ContainerBlog className="pb-5">
      <div className="d-flex flex-column align-items-center pb-4 pt-5">
        <h2>Modulo de pagos</h2>

        {error && (
          <Alert
            variant="danger"
            style={{ width: "75%", margin: "auto", marginTop: "10px" }}
          >
            Ocurrio un Error, contacta al administrador
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={toFormikValidationSchema(searchCC)}
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
                className="d-flex flex-column gap-2 "
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Cedula cliente</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su Numero de cedula"
                    name="cedula"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cedula}
                    className={
                      touched.cedula && errors.cedula ? "is-invalid" : ""
                    }
                  />
                  <ErrorMessage
                    name="cedula"
                    component="div"
                    className="invalid-feedback"
                  />
                  <Form.Text className="text-muted">
                    Debes ingresar el Numero de cedula que corresponsa con el
                    contrato del servicio.
                  </Form.Text>
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex justify-content-between"
                  controlId="formBasicCheckbox"
                ></Form.Group>
                <div className="d-flex justify-content-center">
                  <ButtonStyledFactura
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      "BUSCAR FACTURAS"
                    ) : (
                      <Spinner
                        as="span"
                        animation="grow"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                  </ButtonStyledFactura>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>

      <ContainerFacturas>
        {facturas?.length === 0 && (
          <div className="d-flex pt-5">
            <h2>No se encontraron facturas con ese numero de cedula</h2>
          </div>
        )}
        {facturas?.map((factura) => (
          <FacturaDetail key={factura.id} factura={factura} />
        ))}
      </ContainerFacturas>
    </ContainerBlog>
  );
};
