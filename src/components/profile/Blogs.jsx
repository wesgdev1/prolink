import { Alert, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMyBlogs } from "../../domain/useMyBlogs";
import { BlogTable } from "./BlogTable";

export const Blogs = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useMyBlogs();
  const handleClick = () => {
    navigate("/profile/blogs/add");
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button onClick={handleClick}>Crear Blog</Button>
      </div>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {/* {data.map((blog) => {
        return <BlogTable key={blog.id} blog={blog} />;
      })} */}

      {data.length > 0 && <BlogTable blogs={data} />}
    </div>
  );
};
