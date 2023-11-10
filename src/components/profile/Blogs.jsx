import { Alert, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useBlogs } from "../../domain/useBlogs";

export const Blogs = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useBlogs();
  const handleClick = () => {
    navigate("/profile/blogs/add");
  };

  return (
    <div>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {data.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        );
      })}
      <Button onClick={handleClick}>Crear Blog</Button>
    </div>
  );
};
