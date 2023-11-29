import { Alert, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMyBlogs } from "../../domain/useMyBlogs";
import { BlogTable } from "./BlogTable";
import { ButtonPBlog, ButtonProfile } from "./StyledComponentsProfile";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";

export const Blogs = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, loading, error } = useMyBlogs({ user });
  const handleClick = () => {
    navigate("/profile/blogs/add");
  };

  return (
    <div className="pt-5">
      {user.tipoUsuario === "Tecnico" && (
        <div className="d-flex justify-content-start">
          <ButtonProfile onClick={handleClick}>Crear Blog</ButtonProfile>
        </div>
      )}

      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {data?.length > 0 ? (
        <BlogTable blogs={data} />
      ) : (
        <p>No has publicado ningun Blog</p>
      )}
    </div>
  );
};
