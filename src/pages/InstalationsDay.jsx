import { Fade, Flip } from "react-awesome-reveal";
import { ContainerBlog } from "../components/blog/StyledComponentsBlog";
import { InstalationCard } from "../components/instalation/InstalationCard";
import { useInstalations } from "../domain/useInstalations";
import { Spinner } from "react-bootstrap";

export const InstalationsDay = () => {
  const { data, loading, error } = useInstalations();
  return (
    <ContainerBlog>
      <div className="d-flex flex-column align-items-center gap-3 pt-4 m-4">
        <Fade>
          <h2>Instalaciones del dia</h2>
        </Fade>

        {loading && <Spinner animation="border" variant="info" />}
        {error && <h1>Error...</h1>}
        {data && (
          <Flip>
            <div className="d-flex  gap-4 flex-wrap justify-content-center ">
              {data?.length > 0 &&
                data.map((blog) => {
                  return <InstalationCard />;
                })}
            </div>
          </Flip>
        )}
      </div>
    </ContainerBlog>
  );
};
