import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";
import { TecnicosTable } from "./TecnicosTable";
import { useTecnicos } from "../../domain/tecnicos/useTecnicos";
import { ButtonProfile } from "./StyledComponentsProfile";

export const Tecnicos = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useTecnicos();
  const handleClick = () => {
    navigate("/profile/tecnicos/add");
  };
  return (
    <div className="pt-5">
      <div className="d-flex justify-content-end">
        <ButtonProfile onClick={handleClick}>Agregar tecnico</ButtonProfile>
      </div>
      {loading && <Spinner animation="border" variant="info" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {data.length > 0 && <TecnicosTable tecnicos={data} />}
    </div>
  );
};
